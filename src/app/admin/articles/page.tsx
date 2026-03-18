import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { getAdminLocale } from "@/lib/admin-locale";
import { prisma } from "@/lib/prisma";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import { AdminShell } from "../admin-shell";

export const dynamic = "force-dynamic";

function Badge({ children, variant }: { children: ReactNode; variant: "yes" | "no" | "accent" }) {
  const styles =
    variant === "yes"
      ? "border-emerald-200/80 bg-emerald-50 text-emerald-800"
      : variant === "accent"
        ? "border-[#9a6a43]/25 bg-[#f5e8dc] text-[#6f4b31]"
        : "border-stone-200 bg-stone-50 text-stone-600";
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles}`}
    >
      {children}
    </span>
  );
}

export default async function AdminArticlesPage() {
  const locale = await getAdminLocale();
  const a = (locale === "zh" ? adminZh : adminEn).Admin.articles;

  const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <AdminShell>
      <div className="flex flex-col gap-6 border-b border-black/5 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">{a.section}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-stone-950">{a.title}</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-600">
            {a.desc} <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs">/news/slug</code>
            {a.descMid}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 self-start rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:bg-[#9a6a43] sm:self-auto"
        >
          <Plus className="h-4 w-4" aria-hidden />
          {a.newArticle}
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-stone-50/90">
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {a.slug}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {a.titleEn}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {a.status}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {a.carousel}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  <span className="sr-only">{a.actions}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-stone-500">
                    {a.empty}
                  </td>
                </tr>
              ) : (
                articles.map((art) => (
                  <tr key={art.id} className="transition hover:bg-stone-50/80">
                    <td className="px-5 py-4 font-mono text-xs text-stone-600">{art.slug}</td>
                    <td className="max-w-[200px] truncate px-5 py-4 font-medium text-stone-900 sm:max-w-xs">
                      {art.titleEn}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={art.published ? "yes" : "no"}>
                        {art.published ? a.published : a.draft}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      {art.showInCarousel ? (
                        <Badge variant="accent">#{art.carouselSort}</Badge>
                      ) : (
                        <Badge variant="no">{a.off}</Badge>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/articles/${art.id}`}
                        className="inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-full text-sm font-semibold text-[#9a6a43] outline-offset-2 transition hover:bg-[#f5e8dc] focus-visible:ring-2 focus-visible:ring-[#9a6a43]/40"
                      >
                        {a.edit}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
