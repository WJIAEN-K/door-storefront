import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminLocale } from "@/lib/admin-locale";
import { prisma } from "@/lib/prisma";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import { AdminShell } from "../../admin-shell";
import { adminBackLink } from "../../admin-form-classes";
import { ArticleForm } from "../article-form";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const locale = await getAdminLocale();
  const e = (locale === "zh" ? adminZh : adminEn).Admin.articlesEdit;

  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <AdminShell>
      <Link href="/admin/articles" className={adminBackLink}>
        <ChevronLeft className="h-4 w-4" aria-hidden />
        {e.back}
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-stone-950">{e.title}</h1>
      <p className="mt-2 font-mono text-sm text-stone-500">{article.slug}</p>
      <div className="mt-10">
        <ArticleForm article={article} />
      </div>
    </AdminShell>
  );
}
