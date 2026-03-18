import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
} from "lucide-react";

import { NewsCarousel } from "@/components/news-carousel";
import {
  BenefitsStrip,
  CategoryCard,
  Container,
  DoorPhoto,
  DoorVisual,
  ProductCard,
  SectionHeading,
  TestimonialCard,
} from "@/components/site";
import { getCarouselArticles } from "@/lib/articles";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import {
  getFeaturedProductsFromDb,
  getHeroProductFromDb,
  prismaProductToLocalized,
} from "@/lib/product-db";
import { brand, brandDisplayName, categories, stats } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  return buildPageMetadata({
    locale,
    path: "/",
    title: isZh ? "高品质室内门、入户门与折叠门" : "Premium interior, exterior & bifold doors",
    description: isZh
      ? `${brand.nameZh}（Honch）官方站 — 室内门、入户门、折叠门、百叶门；单板与 RapidHang™ 预挂；亚特兰大发货，全美及国际物流单询。`
      : `${brand.nameEn} (恒诚) — Interior, exterior, bifold & louvered doors; slab or RapidHang™ prehung. Atlanta fulfillment; US & international freight on quote.`,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = dict(locale);
  const h = d.home;
  const c = d.common;
  const heroRow = await getHeroProductFromDb();
  if (!heroRow) throw new Error("No products in database");
  const heroLp = prismaProductToLocalized(heroRow, locale);
  const featuredRows = await getFeaturedProductsFromDb();
  const carouselArticles = await getCarouselArticles();
  const bn = brandDisplayName(locale);
  const heroLead =
    locale === "zh"
      ? `${bn}（成立于 ${brand.established}）${h.heroSubtitlePrefix}`
      : `${bn} (est. ${brand.established}): ${h.heroSubtitlePrefix}`;

  const valueProps = [
    { title: h.value1t, description: h.value1d, icon: Truck },
    { title: h.value2t, description: h.value2d, icon: Package },
    { title: h.value3t, description: h.value3d, icon: ShieldCheck },
    { title: h.value4t, description: h.value4d, icon: Wrench },
  ];

  return (
    <>
      <section className="pt-8 lg:pt-14">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur">
                <BadgeCheck className="h-4 w-4 text-[#9a6a43]" />
                {h.badge}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-balance text-stone-950 sm:text-6xl lg:text-7xl">
                  {h.heroTitle}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
                  {heroLead}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:bg-[#9a6a43]"
                >
                  {c.shopAllSKUs}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-5 py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-[#9a6a43]/30 hover:text-stone-950"
                >
                  {c.browseCategories}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {h.heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-3xl border border-black/10 bg-white/75 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  >
                    <div className="mt-0.5 rounded-2xl bg-[#f5e8dc] p-2 text-[#9a6a43]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="group">
                <DoorPhoto
                  folder={heroRow.imageFolder}
                  file={heroRow.imageFile}
                  alt={`${heroLp.name} — ${heroRow.sku}`}
                  priority
                  aspectClassName="aspect-[4/5] min-h-[28rem]"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              <div className="absolute left-4 top-4 rounded-3xl border border-black/10 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  4.7 / 5
                </p>
                <div className="mt-2 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-stone-600">{c.customersFrom}</p>
              </div>
              <div className="absolute bottom-4 right-4 rounded-3xl border border-black/10 bg-stone-950 px-4 py-3 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-300">{c.processing}</p>
                <p className="mt-1 text-lg font-semibold">{c.days68}</p>
              </div>
            </div>
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

      {carouselArticles.length > 0 ? (
        <section className="pt-10 lg:pt-14">
          <Container>
            <NewsCarousel
              items={carouselArticles}
              locale={locale}
              sectionTitle={h.newsCarouselTitle}
            />
          </Container>
        </section>
      ) : null}

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={h.catEyebrow}
            title={h.catTitle}
            description={h.catDesc}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow={h.featEyebrow}
              title={h.featTitle}
              description={h.featDesc}
            />
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-semibold text-[#9a6a43] transition hover:gap-3 lg:inline-flex"
            >
              {c.viewAllProducts}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {featuredRows.map((row) => (
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
            eyebrow={h.qualityEyebrow}
            title={h.qualityTitle}
            description={h.qualityDesc}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {valueProps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
                >
                  <div className="inline-flex rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-white/75 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={h.rhEyebrow}
                title={h.rhTitle}
                description={h.rhDesc}
              />
              <div className="space-y-4">
                {h.rhPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-3xl bg-stone-50 p-4">
                    <div className="mt-0.5 rounded-full bg-[#f5e8dc] p-2 text-[#9a6a43]">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-stone-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <DoorVisual variant="entry" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-black/10 bg-stone-950 p-5 text-white">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Clock3 className="h-4 w-4" />
                    {h.rhPlan}
                  </div>
                  <p className="mt-3 text-lg font-semibold">{h.rhPlanSub}</p>
                </div>
                <div className="rounded-[2rem] border border-black/10 bg-[#f5e8dc] p-5 text-stone-950">
                  <div className="flex items-center gap-2 text-[#9a6a43]">
                    <Sparkles className="h-4 w-4" />
                    {h.rhGuess}
                  </div>
                  <p className="mt-3 text-lg font-semibold">{h.rhGuessSub}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={h.proEyebrow}
            title={h.proTitle}
            description={h.proDesc}
            align="center"
          />
          <div className="mt-10">
            <BenefitsStrip items={d.proBenefits} />
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={h.shipEyebrow}
            title={h.shipTitle}
            description={h.shipDesc}
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {d.processSteps.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a6a43]">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={h.testEyebrow}
            title={h.testTitle}
            description={h.testDesc}
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {d.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={h.blogEyebrow}
            title={h.blogTitle}
            description={h.blogDesc}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {d.blogPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a6a43]">
                  {c.insights}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{post.description}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9a6a43] transition hover:gap-3"
                >
                  {c.readMore}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-stone-950 p-8 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                {h.ctaBadge}
              </p>
              <h2 className="max-w-2xl font-display text-4xl leading-tight tracking-[-0.05em] sm:text-5xl">
                {h.ctaTitle}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-white/70">{h.ctaDesc}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/categories/interior"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#f5e8dc]"
                >
                  {c.shopNow}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {c.requestQuote}
                </Link>
              </div>
            </div>
            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="grid gap-3">
                {d.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <summary className="cursor-pointer list-none text-base font-semibold text-white">
                      {faq.q}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-white/70">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
