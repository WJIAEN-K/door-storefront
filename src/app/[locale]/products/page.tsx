import type { Metadata } from "next";
import { ArrowRight, Package } from "lucide-react";

import { Container, ProductCard, SectionHeading } from "@/components/site";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localizeCategory } from "@/lib/localize";
import { buildPageMetadata } from "@/lib/seo";
import { getAllProductsFromDb, prismaProductToLocalized } from "@/lib/product-db";
import { brandDisplayName, categories } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const d = dict(locale);
  const p = d.productsPage;
  return buildPageMetadata({
    locale,
    path: "/products",
    title: p.title,
    description: `${p.desc} — ${brandDisplayName(locale)}.`,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProductsIndexPage({ params }: Props) {
  const { locale } = await params;
  const d = dict(locale);
  const p = d.productsPage;
  const productRows = await getAllProductsFromDb();

  return (
    <>
      <section className="pt-10 lg:pt-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                <Package className="h-4 w-4 text-[#9a6a43]" />
                {p.badge}
              </p>
              <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.06em] text-stone-950 sm:text-6xl">
                {p.title}
              </h1>
              <p className="text-lg leading-8 text-stone-600">{p.desc}</p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-5 py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-[#9a6a43]/30"
            >
              {p.byCategory}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => {
              const lc = localizeCategory(c, locale);
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-[#9a6a43]/40 hover:text-stone-950"
                >
                  {lc.displayName}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-24 pt-8">
        <Container>
          <SectionHeading eyebrow={p.secEyebrow} title={p.secTitle} description={p.secDesc} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {productRows.map((row) => (
              <ProductCard
                key={row.slug}
                product={prismaProductToLocalized(row, locale)}
                locale={locale}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
