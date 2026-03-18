/**
 * Vercel / CI often has no .env → prisma generate fails.
 * Build-time generateStaticParams needs a DB with schema → empty SQLite + db push when URL 未配置.
 *
 * Usage:
 *   node scripts/ensure-prisma-for-ci.mjs generate-only   # postinstall
 *   node scripts/ensure-prisma-for-ci.mjs prepare-build # before next build
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fallbackDbPath = path.join(root, "prisma", ".vercel-build.sqlite");
const FALLBACK_URL = `file:${fallbackDbPath}`;

/** 与 Prisma/Next 一致：先读 .env，避免本地有 DATABASE_URL 却被当成 CI */
function loadEnvFiles() {
  for (const name of [".env", ".env.local", ".env.development.local"]) {
    const p = path.join(root, name);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnvFiles();

function run(cmd) {
  execSync(cmd, {
    cwd: root,
    env: process.env,
    stdio: "inherit",
    shell: true,
  });
}

function prisma(args) {
  run(`npx prisma ${args}`);
}

const mode = process.argv[2] || "prepare-build";
const hadUrl = Boolean(process.env.DATABASE_URL?.trim());

if (!hadUrl) {
  process.env.DATABASE_URL = FALLBACK_URL;
}

prisma("generate");

if (mode === "prepare-build" && !hadUrl) {
  fs.mkdirSync(path.dirname(fallbackDbPath), { recursive: true });
  prisma("db push --accept-data-loss --skip-generate");
}
