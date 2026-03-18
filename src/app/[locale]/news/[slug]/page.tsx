import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article-body";
import { Container } from "@/components/site";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { buildPageMetadata } from "@/lib/seo";
import { brandDisplayName } from "@/lib/site-data";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

function coverSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return routing.locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article?.published) return { title: "Not found" };
  const title = locale === "zh" ? article.titleZh : article.titleEn;
  const plain = article.bodyMarkdown.replace(/[#*`_[\]]/g, "").slice(0, 160);
  return buildPageMetadata({
    locale,
    path: `/news/${slug}`,
    title,
    description: plain || title,
    keywords: [title, brandDisplayName(locale)],
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article?.published) notFound();

  const title = locale === "zh" ? article.titleZh : article.titleEn;
  const cover = article.coverImageUrl ? coverSrc(article.coverImageUrl) : null;
  const isExternal = cover?.startsWith("http");

  return (
    <article className="pb-24">
      <section className="border-b border-black/5 bg-white/40 pt-10 lg:pt-16">
        <Container>
          <Link
            href="/"
            className="mb-8 inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full text-sm font-medium text-stone-600 outline-offset-4 transition hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-[#9a6a43]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {locale === "zh" ? "返回首页" : "Back to home"}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            {locale === "zh" ? "动态" : "News"}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-[-0.04em] text-stone-950 sm:text-5xl">
            {title}
          </h1>
          {article.publishedAt ? (
            <time
              dateTime={article.publishedAt.toISOString()}
              className="mt-4 block text-sm text-stone-500"
            >
              {article.publishedAt.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          ) : null}
        </Container>
      </section>

      {cover ? (
        <Container className="mt-10">
          <div className="relative aspect-[21/9] max-h-[22rem] overflow-hidden rounded-[2rem] border border-black/10 bg-stone-200 shadow-lg">
            {isExternal ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" className="h-full w-full object-cover" />
            ) : (
              <Image src={cover} alt="" fill className="object-cover" sizes="(max-width:1280px) 100vw, 80rem" priority />
            )}
          </div>
        </Container>
      ) : null}

      <Container className="mt-12 max-w-3xl">
        <ArticleBody markdown={article.bodyMarkdown} />
      </Container>
    </article>
  );
}
