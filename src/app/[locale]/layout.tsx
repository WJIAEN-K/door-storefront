import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";
import { getFeaturedProductsFromDb, prismaProductToLocalized } from "@/lib/product-db";
import { getSiteUrl, siteKeywords } from "@/lib/seo";
import { brand, brandDisplayName } from "@/lib/site-data";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const name = brandDisplayName(locale);
  const description = isZh
    ? `${brand.nameZh}（Honch）— 高品质室内门、入户门、折叠门与百叶门。亚特兰大发货，美国本土与国际物流单询。`
    : `${brand.nameEn} (恒诚) — ${brand.tagline} ${brand.location}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description,
    keywords: siteKeywords(locale),
    applicationName: name,
    authors: [{ name: brand.nameEn, url: getSiteUrl() }],
    creator: brand.nameEn,
    publisher: brand.nameEn,
    formatDetection: { email: false, address: false, telephone: false },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: isZh ? "zh_CN" : "en_US",
      alternateLocale: isZh ? ["en_US"] : ["zh_CN"],
      siteName: name,
      title: name,
      description,
      url: isZh ? `${getSiteUrl()}/zh` : `${getSiteUrl()}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
    },
    alternates: {
      canonical: isZh ? `${getSiteUrl()}/zh` : `${getSiteUrl()}/`,
      languages: {
        en: `${getSiteUrl()}/`,
        "zh-CN": `${getSiteUrl()}/zh`,
        "x-default": `${getSiteUrl()}/`,
      },
    },
    category: "business",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "zh")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const featuredRows = await getFeaturedProductsFromDb();
  const featuredProductLinks = featuredRows.map((r) => ({
    slug: r.slug,
    name: prismaProductToLocalized(r, locale).name,
  }));

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body
        className={`${inter.variable} ${cormorant.variable} bg-[#f7f3ee] text-stone-950 antialiased`}
      >
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(154,106,67,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.85),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.6),transparent_24%)]" />
            <SiteHeader locale={locale} />
            <main id="main-content">{children}</main>
            <SiteFooter featuredProductLinks={featuredProductLinks} locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
