import { ArrowRight, FileText, Images, Package } from "lucide-react";
import Link from "next/link";

import { getAdminLocale } from "@/lib/admin-locale";
import { prisma } from "@/lib/prisma";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import { AdminShell } from "./admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const locale = await getAdminLocale();
  const d = (locale === "zh" ? adminZh : adminEn).Admin.dashboard;

  const [articleCount, productCount, carouselCount] = await Promise.all([
    prisma.article.count(),
    prisma.product.count(),
    prisma.article.count({ where: { published: true, showInCarousel: true } }),
  ]);

  return (
    <AdminShell>
      <header className="border-b border-black/5 pb-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9a6a43]" aria-hidden />
          {d.badge}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
          {d.title}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600">{d.desc}</p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/articles"
          className="group rounded-[1.75rem] border border-black/10 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#9a6a43]/20 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
              <FileText className="h-5 w-5" aria-hidden />
            </div>
            <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-stone-950">
              {articleCount}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">{d.articles}</p>
          <p className="mt-2 text-sm text-stone-600">{d.articlesDesc}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#9a6a43] transition group-hover:gap-2">
            {d.manage}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>

        <Link
          href="/admin/skus"
          className="group rounded-[1.75rem] border border-black/10 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#9a6a43]/20 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
              <Package className="h-5 w-5" aria-hidden />
            </div>
            <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-stone-950">
              {productCount}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">{d.skus}</p>
          <p className="mt-2 text-sm text-stone-600">{d.skusDesc}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#9a6a43] transition group-hover:gap-2">
            {d.manage}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>

        <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between gap-4">
            <div className="rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
              <Images className="h-5 w-5" aria-hidden />
            </div>
            <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-stone-950">
              {carouselCount}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">{d.homeCarousel}</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {d.carouselHint} <strong className="font-medium text-stone-800">{d.carouselStrong}</strong>{" "}
            {d.carouselHint2}
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
