import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";
import { brandDisplayName } from "@/lib/site-data";
import { ArrowRight, BadgeCheck, Clock3, Package, Truck } from "lucide-react";

import {
  BenefitsStrip,
  Container,
  DoorPhoto,
  ProductCard,
  SectionHeading,
} from "@/components/site";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localizeCategory } from "@/lib/localize";
import { getProductsByCategoryFromDb, prismaProductToLocalized } from "@/lib/product-db";
import { categories, getCategoryBySlug, stats } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, slug: category.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };
  const lc = localizeCategory(category, locale);
  return buildPageMetadata({
    locale,
    path: `/categories/${slug}`,
    title: lc.displayName,
    description: `${lc.displayTag} ${lc.displayDescription} — ${brandDisplayName(locale)}`,
    keywords: [
      lc.displayName,
      brandDisplayName(locale),
      locale === "zh" ? "门类" : "doors",
    ],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const d = dict(locale);
  const cp = d.categoryPage;
  const h = d.home;
  const c = d.common;
  const lc = localizeCategory(category, locale);
  const catProducts = await getProductsByCategoryFromDb(category.slug);

  const productsTitle =
    locale === "zh"
      ? cp.productsTitle
      : `${cp.productsTitleBefore}${lc.displayName.toLowerCase()}${cp.productsTitleAfter}`;

  const tiles = cp.tiles.map((t, i) => ({
    ...t,
    icon: [Clock3, Truck, Package][i]!,
  }));

  return (
    <>
      <section className="pt-10 lg:pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                <BadgeCheck className="h-4 w-4 text-[#9a6a43]" />
                {lc.displayCount} {cp.available}
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-stone-950 sm:text-6xl">
                  {lc.displayName}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600">
                  {lc.displayTag}. {lc.displayDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a6a43]"
                >
                  {cp.requestPricing}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-[#9a6a43]/30 hover:text-stone-950"
                >
                  {c.allCategories}
                </Link>
              </div>
            </div>

            <DoorPhoto
              folder={category.coverFolder}
              file={category.coverFile}
              alt={`${lc.displayName} — ${lc.displayTag}`}
              aspectClassName="aspect-[4/5] min-h-[20rem] lg:min-h-[28rem]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
              >
                <p className="text-sm text-stone-500">{h.statLabels[i]}</p>
                <p className="mt-2 font-display text-3xl tracking-[-0.04em] text-stone-950">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={cp.productsEyebrow}
            title={productsTitle}
            description={cp.productsDesc}
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {catProducts.map((row) => (
              <ProductCard
                key={row.slug}
                product={prismaProductToLocalized(row, locale)}
                locale={locale}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={cp.whyEyebrow}
            title={cp.whyTitle}
            description={cp.whyDesc}
            align="center"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {tiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <div
                  key={tile.title}
                  className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
                >
                  <div className="inline-flex rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                    {tile.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{tile.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-white/75 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.96fr_1.04fr] lg:p-10">
            <div className="space-y-5">
              <SectionHeading
                eyebrow={cp.proEyebrow}
                title={cp.proTitle}
                description={cp.proDesc}
              />
              <BenefitsStrip items={d.proBenefits} />
            </div>

            <div className="grid gap-4">
              {d.faqs.slice(0, 3).map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-[2rem] border border-black/10 bg-stone-50 p-5"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-stone-950">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
