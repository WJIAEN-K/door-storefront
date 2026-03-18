# Honch 恒诚 — Door storefront

英文品牌 **Honch**，中文品牌 **恒诚**。Next.js + next-intl（中/英）。

## SEO 与生产环境

1. 复制 `.env.example` 为 `.env.local`，设置 **`NEXT_PUBLIC_SITE_URL`** 为实际上线域名（勿带末尾 `/`），例如 `https://www.honch.com`。
2. 自动生成 **`/sitemap.xml`**、**`/robots.txt`**。
3. 全站 **`metadataBase`**、**canonical**、**hreflang**（`en` / `zh-CN` / `x-default`）、**Open Graph**、**Twitter Card**、**关键词**。
4. 结构化数据：**Organization + WebSite**（全站）；**Product**（各 SKU 详情页）。

## Database & admin

1. Copy `.env.example` → `.env.local` (or `.env`), set **`DATABASE_URL`**, **`ADMIN_PASSWORD`**, **`ADMIN_SESSION_SECRET`**.
2. `npx prisma migrate dev` then `npm run db:seed` (or first migrate runs seed automatically).
3. **Admin** (no public link): open **`/admin/login`**, manage **articles** (Markdown, home carousel) and **SKUs**. Production: point `DATABASE_URL` to Postgres (Neon, etc.) and run migrations.

## Door photography (`public/doors`)

门图与视频素材已放在本项目内：`door-storefront/public/doors`（门1–门12 及 `视频素材*.mp4`）。SKU 与路径对应关系见 `src/lib/site-data.ts`。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

开发服务器监听 **`0.0.0.0:3000`**：`pnpm dev` 后，本机 [http://localhost:3000](http://localhost:3000)，局域网 **`http://<本机IP>:3000`**（如 `http://192.168.1.5:3000`）可访问整站含 **`/admin`**。

- **`next.config.ts`** 已配置 **`allowedDevOrigins`**（常见私网 `192.168.*.*`、`10.*.*.*`、`172.16–31.*.*`、`*.local`），避免 Next 开发模式拦截来自手机/其他电脑的 `/_next/*` 请求导致白屏。
- 仍无法打开时：① 本机防火墙放行 **3000**；② 手机与电脑同一 Wi‑Fi；③ 非常用网段在 `.env.local` 设 **`ALLOWED_DEV_ORIGINS`**（逗号分隔主机名）后**重启** `pnpm dev`。

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

- **构建**：未配置 `DATABASE_URL` 时，脚本会用临时空 SQLite 完成 `prisma generate` + schema 同步，以便通过构建；**线上数据**仍需在 Vercel 环境变量里配置真实的 **`DATABASE_URL`**（当前 schema 为 SQLite 连接串；生产建议改为 [Neon](https://neon.tech) 等 Postgres 并调整 `schema.prisma` 的 `provider` 与迁移）。
- 其余变量：`NEXT_PUBLIC_SITE_URL`、`ADMIN_SESSION_SECRET`、`ADMIN_PASSWORD` 等按需在 Vercel → Settings → Environment Variables 中设置。

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
