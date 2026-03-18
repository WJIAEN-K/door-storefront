import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Package,
  Truck,
} from "lucide-react";

import { Container, DoorPhoto, ProductCard, SectionHeading } from "@/components/site";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { doorImageSrc } from "@/lib/door-assets";
import { localizeCategory } from "@/lib/localize";
import {
  getAllProductsFromDb,
  getProductBySlugFromDb,
  getProductsByCategoryFromDb,
  prismaProductToLocalized,
} from "@/lib/product-db";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { brand, brandDisplayName, getCategoryBySlug } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProductsFromDb();
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const row = await getProductBySlugFromDb(slug);
  if (!row) return { title: "Not found" };
  const lp = prismaProductToLocalized(row, locale);
  const desc =
    lp.description.length > 155 ? `${lp.description.slice(0, 152)}…` : lp.description;
  return buildPageMetadata({
    locale,
    path: `/products/${slug}`,
    title: lp.name,
    description: `${desc} SKU ${row.sku} — ${brandDisplayName(locale)}`,
    keywords: [lp.name, row.sku, lp.categoryName, brandDisplayName(locale)],
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const row = await getProductBySlugFromDb(slug);
  if (!row) notFound();

  const lp = prismaProductToLocalized(row, locale);
  const d = dict(locale);
  const pp = d.productPage;
  const c = d.common;
  const category = getCategoryBySlug(row.categorySlug);
  const lc = category ? localizeCategory(category, locale) : null;
  const relatedRows = (await getProductsByCategoryFromDb(row.categorySlug)).filter(
    (item) => item.slug !== row.slug,
  );

  const shipCards = pp.shipCards.map((card, i) => ({
    ...card,
    icon: [Clock3, Package, Truck][i]!,
  }));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: lp.name,
    sku: row.sku,
    description: lp.description,
    brand: { "@type": "Brand", name: brand.nameEn, alternateName: brand.nameZh },
    category: lp.categoryName,
    url: absoluteUrl(`/products/${slug}`, locale),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="pt-10 lg:pt-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="space-y-4">
              <div className="group">
                <DoorPhoto
                  folder={row.imageFolder}
                  file={row.imageFile}
                  alt={`${lp.name} — ${row.sku}`}
                  priority
                  aspectClassName="aspect-[4/5] min-h-[22rem]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {lp.galleryFiles.length > 1 ? (
                <div className="grid grid-cols-3 gap-3">
                  {lp.galleryFiles.slice(0, 3).map((file) => (
                    <div
                      key={file}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-stone-100"
                    >
                      <Image
                        src={doorImageSrc(row.imageFolder, file)}
                        alt={`${row.sku} ${c.detailPhoto}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              <p className="text-xs text-stone-500">
                {c.photoFolder}: <span className="font-mono">{row.imageFolder}</span>
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                  <BadgeCheck className="h-4 w-4 text-[#9a6a43]" />
                  {row.sku}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                  {lp.categoryName}
                </span>
                <span className="inline-flex items-center rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white">
                  {row.priceRange}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-stone-950 sm:text-6xl">
                  {lp.name}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600">{lp.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {lp.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-black/10 bg-white/75 p-4 text-sm leading-6 text-stone-600 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a6a43]"
                >
                  {c.requestQuote}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-[#9a6a43]/30 hover:text-stone-950"
                >
                  {c.allSKUs}
                </Link>
                {category && lc ? (
                  <Link
                    href={`/categories/${category.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-[#9a6a43]/30 hover:text-stone-950"
                  >
                    {c.category}
                  </Link>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {shipCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
                    >
                      <div className="inline-flex rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 font-semibold text-stone-950">{card.title}</p>
                      <p className="mt-2 text-sm leading-6 text-stone-600">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-white/75 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div className="space-y-5">
              <SectionHeading
                eyebrow={pp.detailEyebrow}
                title={pp.detailTitle}
                description={pp.detailDesc}
              />
              <div className="space-y-3 text-sm leading-6 text-stone-600">
                <p>
                  <span className="font-semibold text-stone-950">{c.finish}:</span> {lp.finish}
                </p>
                <p>
                  <span className="font-semibold text-stone-950">{c.size}:</span> {lp.size}
                </p>
                <p>
                  <span className="font-semibold text-stone-950">{c.material}:</span> {lp.material}
                </p>
                <p>
                  <span className="font-semibold text-stone-950">{c.install}:</span>{" "}
                  {lp.installation}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {lp.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-[1.75rem] border border-black/10 bg-stone-50 p-5"
                >
                  <p className="text-sm text-stone-500">{spec.label}</p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-stone-950">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={pp.shippingEyebrow}
            title={pp.shippingTitle}
            description={pp.shippingDesc}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {shipCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
                >
                  <div className="inline-flex rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{card.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={pp.faqEyebrow}
            title={pp.faqTitle}
            description={pp.faqDesc}
            align="center"
          />

          <div className="mt-10 grid gap-4">
            {pp.faqExtra.map((faq) => (
              <details
                key={faq.q}
                className="rounded-[2rem] border border-black/10 bg-white/80 p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-stone-950">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-6 text-stone-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={pp.relatedEyebrow}
            title={pp.relatedTitle}
            description={pp.relatedDesc}
          />
          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {relatedRows.slice(0, 3).map((related) => (
              <ProductCard
                key={related.slug}
                product={prismaProductToLocalized(related, locale)}
                locale={locale}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
