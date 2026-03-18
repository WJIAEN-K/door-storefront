import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { getAdminLocale } from "@/lib/admin-locale";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import { AdminShell } from "../../admin-shell";
import { adminBackLink } from "../../admin-form-classes";
import { ArticleForm } from "../article-form";

export default async function NewArticlePage() {
  const locale = await getAdminLocale();
  const n = (locale === "zh" ? adminZh : adminEn).Admin.articlesNew;

  return (
    <AdminShell>
      <Link href="/admin/articles" className={adminBackLink}>
        <ChevronLeft className="h-4 w-4" aria-hidden />
        {n.back}
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-stone-950">{n.title}</h1>
      <p className="mt-2 text-sm text-stone-600">{n.hint}</p>
      <div className="mt-10">
        <ArticleForm article={null} />
      </div>
    </AdminShell>
  );
}
