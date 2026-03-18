import type { Metadata } from "next";
import { ArrowRight, LayoutGrid } from "lucide-react";

import { CategoryCard, Container, SectionHeading } from "@/components/site";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { getAllProductsFromDb } from "@/lib/product-db";
import { brandDisplayName, categories } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const d = dict(locale);
  const p = d.categoriesPage;
  return buildPageMetadata({
    locale,
    path: "/categories",
    title: p.title,
    description: `${p.desc} — ${brandDisplayName(locale)}.`,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CategoriesIndexPage({ params }: Props) {
  const { locale } = await params;
  const d = dict(locale);
  const p = d.categoriesPage;
  const productCount = (await getAllProductsFromDb()).length;
  const badgeText =
    locale === "zh"
      ? `${productCount}${p.badge} ${categories.length} ${p.families}`
      : `${productCount} ${p.badge} ${categories.length} ${p.families}`;

  return (
    <>
      <section className="pt-10 lg:pt-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                <LayoutGrid className="h-4 w-4 text-[#9a6a43]" />
                {badgeText}
              </p>
              <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.06em] text-stone-950 sm:text-6xl">
                {p.title}
              </h1>
              <p className="text-lg leading-8 text-stone-600">{p.desc}</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a6a43]"
            >
              {p.allProducts}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-24 pt-12 lg:pt-16">
        <Container>
          <SectionHeading eyebrow={p.secEyebrow} title={p.secTitle} description={p.secDesc} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} locale={locale} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
