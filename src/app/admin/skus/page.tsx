import Link from "next/link";

import { getAdminLocale } from "@/lib/admin-locale";
import { prisma } from "@/lib/prisma";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import { AdminShell } from "../admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminSkusPage() {
  const locale = await getAdminLocale();
  const s = (locale === "zh" ? adminZh : adminEn).Admin.skus;

  const products = await prisma.product.findMany({ orderBy: { sku: "asc" } });

  return (
    <AdminShell>
      <header className="border-b border-black/5 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">{s.section}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-stone-950">{s.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
          {s.descBefore}{" "}
          <code className="rounded-md border border-black/10 bg-white/80 px-2 py-0.5 font-mono text-xs">
            public/doors
          </code>
          {s.descAfter}
        </p>
      </header>

      <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-stone-50/90">
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {s.colSku}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {s.colName}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {s.colCategory}
                </th>
                <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {s.colFeatured}
                </th>
                <th scope="col" className="px-5 py-4">
                  <span className="sr-only">{s.edit}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.map((p) => (
                <tr key={p.id} className="transition hover:bg-stone-50/80">
                  <td className="px-5 py-4 font-mono text-xs font-medium text-stone-800">{p.sku}</td>
                  <td className="max-w-xs truncate px-5 py-4 text-stone-800">{p.name}</td>
                  <td className="px-5 py-4 text-stone-600">{p.categorySlug}</td>
                  <td className="px-5 py-4">
                    {p.featured ? (
                      <span className="inline-flex rounded-full border border-[#9a6a43]/25 bg-[#f5e8dc] px-2.5 py-0.5 text-xs font-semibold text-[#6f4b31]">
                        {s.home}
                      </span>
                    ) : (
                      <span className="text-stone-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/skus/${p.id}`}
                      className="inline-flex min-h-9 cursor-pointer items-center rounded-full px-3 text-sm font-semibold text-[#9a6a43] transition hover:bg-[#f5e8dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a6a43]/40"
                    >
                      {s.edit}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
