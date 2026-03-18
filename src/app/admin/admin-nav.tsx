"use client";

import { LayoutDashboard, LogOut, Newspaper, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const accent = "#9a6a43";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Admin.nav");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") return null;

  const items = [
    { href: "/admin", labelKey: "dashboard" as const, icon: LayoutDashboard, match: (p: string) => p === "/admin" },
    {
      href: "/admin/articles",
      labelKey: "articles" as const,
      icon: Newspaper,
      match: (p: string) => p.startsWith("/admin/articles"),
    },
    {
      href: "/admin/skus",
      labelKey: "skus" as const,
      icon: Package,
      match: (p: string) => p.startsWith("/admin/skus"),
    },
  ] as const;

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-black/5 bg-[#f7f3ee]/90 px-4 py-6 backdrop-blur-xl sm:w-64">
      <Link href="/admin" className="flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:opacity-90">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white shadow-lg"
          style={{ backgroundColor: accent, boxShadow: `0 10px 30px ${accent}33` }}
        >
          <Sparkles className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold tracking-[-0.02em] text-stone-950">Honch</p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">{t("subtitle")}</p>
        </div>
      </Link>

      <nav className="mt-10 flex flex-col gap-1" aria-label="Admin navigation">
        {items.map(({ href, labelKey, icon: Icon, match }) => {
          const active = match(pathname ?? "");
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-11 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium outline-offset-2 transition focus-visible:ring-2 focus-visible:ring-[#9a6a43]/40 ${
                active
                  ? "bg-stone-950 text-white shadow-md shadow-stone-950/10"
                  : "text-stone-700 hover:bg-white/70 hover:text-stone-950"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-[#9a6a43]"}`} aria-hidden />
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-black/5 pt-6">
        <button
          type="button"
          onClick={() => void logout()}
          className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-3 py-2.5 text-left text-sm font-medium text-stone-700 outline-offset-2 transition hover:border-[#9a6a43]/25 hover:bg-white hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-[#9a6a43]/40"
        >
          <LogOut className="h-4 w-4 shrink-0 text-stone-500" aria-hidden />
          {t("logout")}
        </button>
        <p className="mt-4 px-1 text-[11px] leading-relaxed text-stone-500">{t("bookmark")}</p>
      </div>
    </aside>
  );
}
