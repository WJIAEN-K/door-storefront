import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";

import { SiteHeaderClient } from "@/components/site-header";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { doorImageSrc } from "@/lib/door-assets";
import { localizeCategory } from "@/lib/localize";
import type { LocalizedProduct } from "@/lib/localize";
import {
  brand,
  brandDisplayName,
  categories,
  testimonials,
  type Category,
  type Product,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function DoorPhoto({
  folder,
  file,
  alt,
  className,
  priority,
  sizes,
  aspectClassName = "aspect-[4/3]",
}: {
  folder: string;
  file: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-black/10 bg-stone-200 shadow-[0_26px_80px_rgba(15,23,42,0.12)]",
        aspectClassName,
        className,
      )}
    >
      <Image
        src={doorImageSrc(folder, file)}
        alt={alt}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        priority={priority}
      />
    </div>
  );
}

type DoorVariant = "hero" | Product["visual"] | Category["visual"];

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl space-y-4", align === "center" && "mx-auto text-center")}>
      <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600 shadow-sm backdrop-blur">
        <Sparkles className="h-3.5 w-3.5 text-[#9a6a43]" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-stone-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-stone-600 sm:text-lg">{description}</p>
    </div>
  );
}

const visualMap: Record<DoorVariant, string> = {
  hero: "from-[#fff4e8] via-[#f6ede3] to-[#eef2f7]",
  interior: "from-[#fff4e8] via-[#f6ede3] to-[#eef2f7]",
  exterior: "from-[#f3efe9] via-[#ebe8e1] to-[#eef2f7]",
  bifold: "from-[#e9f7ee] via-[#eef8f1] to-[#f6faf5]",
  louvered: "from-[#e8f5fb] via-[#eef7fa] to-[#f7fbfd]",
  shaker: "from-[#fff4e8] via-[#f8efe6] to-[#f4f1ec]",
  glass: "from-[#eef4fb] via-[#f6f9ff] to-[#f8fafc]",
  entry: "from-[#f7efe6] via-[#f2ebdf] to-[#ece7de]",
  panel: "from-[#fff5e7] via-[#f8efe3] to-[#f2f0ea]",
};

export function DoorVisual({
  variant,
  className,
}: {
  variant: DoorVariant;
  className?: string;
}) {
  const isHero = variant === "hero";
  const slats = variant === "louvered" ? 7 : variant === "bifold" ? 3 : 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-black/10 bg-gradient-to-br shadow-[0_26px_80px_rgba(15,23,42,0.12)]",
        visualMap[variant],
        isHero ? "aspect-[4/5] min-h-[28rem]" : "aspect-[4/3]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.5),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(154,106,67,0.08),transparent_38%)]" />
      <svg
        viewBox="0 0 520 520"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="doorBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffaf5" />
            <stop offset="100%" stopColor="#e8dccd" />
          </linearGradient>
          <linearGradient id="doorTrim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9a6a43" />
            <stop offset="100%" stopColor="#6f4b31" />
          </linearGradient>
        </defs>
        <g transform="translate(76 36)">
          <rect x="12" y="34" width="344" height="404" rx="34" fill="rgba(255,255,255,0.45)" />
          <rect x="38" y="30" width="300" height="412" rx="28" fill="url(#doorBody)" />
          <rect x="54" y="46" width="268" height="380" rx="24" fill="none" stroke="url(#doorTrim)" strokeWidth="10" />
          <rect x="66" y="58" width="244" height="356" rx="18" fill="rgba(255,255,255,0.34)" stroke="rgba(255,255,255,0.75)" />

          {variant === "hero" ? (
            <>
              <rect x="92" y="94" width="92" height="108" rx="14" fill="rgba(154,106,67,0.1)" />
              <rect x="202" y="94" width="92" height="108" rx="14" fill="rgba(154,106,67,0.1)" />
              <rect x="92" y="220" width="202" height="152" rx="18" fill="rgba(255,255,255,0.55)" />
            </>
          ) : null}

          {variant === "shaker" || variant === "panel" || variant === "exterior" ? (
            <>
              <rect x="88" y="88" width="236" height="110" rx="14" fill="rgba(255,255,255,0.55)" stroke="rgba(154,106,67,0.12)" />
              <rect x="88" y="214" width="236" height="138" rx="14" fill="rgba(255,255,255,0.42)" stroke="rgba(154,106,67,0.12)" />
            </>
          ) : null}

          {variant === "glass" ? (
            <>
              <rect x="90" y="88" width="232" height="206" rx="18" fill="rgba(255,255,255,0.55)" stroke="rgba(154,106,67,0.14)" />
              <rect x="108" y="108" width="196" height="166" rx="12" fill="rgba(146,170,196,0.12)" />
              <path d="M114 186H306" stroke="rgba(255,255,255,0.75)" strokeWidth="6" strokeLinecap="round" />
            </>
          ) : null}

          {variant === "entry" ? (
            <>
              <rect x="82" y="82" width="256" height="280" rx="18" fill="rgba(255,255,255,0.45)" />
              <path d="M106 96h208" stroke="rgba(154,106,67,0.22)" strokeWidth="4" strokeLinecap="round" />
              <path d="M106 154h208" stroke="rgba(154,106,67,0.18)" strokeWidth="3" strokeLinecap="round" />
              <path d="M106 210h208" stroke="rgba(154,106,67,0.18)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="284" cy="214" r="7" fill="rgba(111,75,49,0.55)" />
            </>
          ) : null}

          {variant === "bifold" ? (
            <>
              <rect x="88" y="92" width="102" height="254" rx="14" fill="rgba(255,255,255,0.58)" />
              <rect x="192" y="92" width="102" height="254" rx="14" fill="rgba(255,255,255,0.46)" />
              <path d="M188 92v254" stroke="rgba(154,106,67,0.16)" strokeWidth="4" />
            </>
          ) : null}

          {variant === "louvered" ? (
            <>
              <rect x="92" y="92" width="224" height="252" rx="14" fill="rgba(255,255,255,0.5)" />
              {Array.from({ length: slats }).map((_, index) => (
                <path
                  key={index}
                  d={`M108 ${118 + index * 28}h192`}
                  stroke="rgba(154,106,67,0.18)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              ))}
            </>
          ) : null}

          <rect x="122" y="380" width="164" height="26" rx="13" fill="rgba(15,23,42,0.08)" />
        </g>
      </svg>
    </div>
  );
}

export function SiteHeader({ locale }: { locale: string }) {
  const d = dict(locale);
  const n = d.nav;
  const links = [
    { href: "/", label: n.home },
    { href: "/categories", label: n.categories },
    { href: "/products", label: n.allProducts },
    { href: "/categories/interior", label: n.interior },
    { href: "/categories/exterior", label: n.exterior },
    { href: "/contact", label: n.contact },
  ] as const;

  return (
    <SiteHeaderClient
      brandDisplayName={brandDisplayName(locale)}
      brandSubtitle={`${locale === "zh" ? "创立于" : "Since"} ${brand.established}`}
      links={links}
      navMenu={n.menu}
      navGetQuote={n.getQuote}
    />
  );
}

export function SiteFooter({
  locale,
  featuredProductLinks,
}: {
  locale: string;
  featuredProductLinks: { slug: string; name: string }[];
}) {
  const d = dict(locale);
  const f = d.footer;
  const n = d.nav;
  const c = d.common;
  return (
    <footer className="border-t border-black/5 bg-white/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-stone-500">
              {brandDisplayName(locale)}
            </p>
            <p className="max-w-md text-base leading-7 text-stone-600">
              {locale === "zh"
                ? "高品质室内外门 — 直达工地。亚特兰大发货，美国本土与国际物流询价。"
                : `${brand.tagline} ${brand.location}`}
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-[#9a6a43]/30 hover:text-stone-950"
                >
                  {localizeCategory(category, locale).displayName}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
              {f.explore}
            </h3>
            <div className="mt-4 grid gap-3 text-sm text-stone-600">
              <Link href="/" className="transition hover:text-stone-950">
                {n.home}
              </Link>
              <Link href="/categories" className="transition hover:text-stone-950">
                {f.allCategories}
              </Link>
              <Link href="/products" className="transition hover:text-stone-950">
                {f.allProducts}
              </Link>
              <Link href="/contact" className="transition hover:text-stone-950">
                {n.contact}
              </Link>
              <Link href="/categories/interior" className="transition hover:text-stone-950">
                {localizeCategory(categories[0], locale).displayName}
              </Link>
              <Link href="/categories/exterior" className="transition hover:text-stone-950">
                {localizeCategory(categories[1], locale).displayName}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
              {f.products}
            </h3>
            <div className="mt-4 grid gap-3 text-sm text-stone-600">
              {featuredProductLinks.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="transition hover:text-stone-950"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
              {f.contact}
            </h3>
            <div className="grid gap-3 text-sm text-stone-600">
              <a
                href={`mailto:${brand.salesEmail}`}
                className="inline-flex items-center gap-2 transition hover:text-stone-950"
              >
                <Mail className="h-4 w-4 text-[#9a6a43]" />
                {brand.salesEmail}
              </a>
              <a href={`tel:+1${brand.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 transition hover:text-stone-950">
                <Phone className="h-4 w-4 text-[#9a6a43]" />
                {brand.phone}
              </a>
              <span>{brand.hours}</span>
              <span>{brand.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/5 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brandDisplayName(locale)}. {c.rightsReserved}
          </p>
          <div className="flex items-center gap-4">
            {testimonials.slice(0, 1).map((testimonial) => (
              <span key={testimonial.name} className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[#9a6a43]" />
                {f.trusted} {testimonial.role}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export function CategoryCard({ category, locale }: { category: Category; locale: string }) {
  const lc = localizeCategory(category, locale);
  const c = dict(locale).common;
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
      <Link
        href={`/categories/${category.slug}`}
        className="absolute inset-0 z-10 rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a6a43]/40 focus-visible:ring-offset-2"
        aria-label={`${lc.displayName} — ${c.exploreCategory}`}
      />
      <div className="pointer-events-none relative z-0">
        <DoorPhoto
          folder={category.coverFolder}
          file={category.coverFile}
          alt={`${lc.displayName} — ${brandDisplayName(locale)}`}
          className="mb-5"
        />
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              {lc.displayCount}
            </p>
            <span className="inline-flex items-center rounded-full bg-stone-950 px-3 py-1 text-xs font-semibold text-white">
              {lc.displayLeadTime}
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
            {lc.displayName}
          </h3>
          <p className="text-sm leading-6 text-stone-600">{lc.displayDescription}</p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#9a6a43] transition group-hover:gap-3">
            {c.exploreCategory}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product: lp, locale }: { product: LocalizedProduct; locale: string }) {
  const c = dict(locale).common;
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/85 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
      <Link
        href={`/products/${lp.slug}`}
        className="absolute inset-0 z-10 rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a6a43]/40 focus-visible:ring-offset-2"
        aria-label={`${lp.name} — ${lp.sku} — ${c.viewDetails}`}
      />
      <div className="pointer-events-none relative z-0">
        <DoorPhoto
          folder={lp.imageFolder}
          file={lp.imageFile}
          alt={`${lp.name} — ${lp.sku}`}
          className="mb-5"
        />
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                {lp.sku} · {lp.categoryName}
              </p>
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-stone-950">
                {lp.name}
              </h3>
            </div>
            <div className="rounded-2xl bg-stone-950 px-3 py-2 text-right text-sm font-semibold text-white">
              {lp.priceRange}
            </div>
          </div>

          <p className="text-sm leading-6 text-stone-600">{lp.description}</p>

          <div className="grid gap-2 rounded-3xl bg-stone-50 p-4 text-sm text-stone-600">
            <div className="flex items-center justify-between gap-4">
              <span>{c.leadTime}</span>
              <span className="font-medium text-stone-900">{lp.leadTime}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>{c.finish}</span>
              <span className="font-medium text-stone-900">{lp.finish}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>{c.install}</span>
              <span className="font-medium text-stone-900">{lp.installation}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <StarRow />
              <span className="text-sm font-medium text-stone-600">
                {lp.rating}.0 · {lp.reviews} {c.reviews}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#9a6a43] transition group-hover:gap-3">
              {c.viewDetails}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <article className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <StarRow />
      <p className="mt-5 text-base leading-7 text-stone-700">“{quote}”</p>
      <div className="mt-6">
        <p className="font-semibold text-stone-950">{name}</p>
        <p className="text-sm text-stone-500">{role}</p>
      </div>
    </article>
  );
}

export function BenefitsStrip({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((benefit) => (
        <div
          key={benefit.title}
          className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
        >
          <p className="text-lg font-semibold tracking-[-0.03em] text-stone-950">
            {benefit.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}
