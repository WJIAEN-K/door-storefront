import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { brandDisplayName } from "@/lib/site-data";

/** Canonical site origin — set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://www.honch.com) */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return "https://www.honch.com";
}

/**
 * Absolute URL for a logical path (always `/foo`, use `/` for home).
 * Respects default locale without prefix (`en`) vs `zh` prefix.
 */
export function absoluteUrl(path: string, locale: string): string {
  const base = getSiteUrl();
  const p = path === "/" || path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return p === "/" ? `${base}/` : `${base}${p}`;
  }
  return p === "/" ? `${base}/zh` : `${base}/zh${p}`;
}

const keywordsEn = [
  "Honch",
  "interior doors",
  "exterior doors",
  "prehung doors",
  "RapidHang",
  "Atlanta doors",
  "bifold doors",
  "louvered doors",
  "door supplier",
];

const keywordsZh = [
  "恒诚",
  "Honch",
  "室内门",
  "入户门",
  "预挂门",
  "折叠门",
  "百叶门",
  "亚特兰大",
  "门供应商",
];

export function siteKeywords(locale: string): string[] {
  return locale === "zh" ? keywordsZh : keywordsEn;
}

export function buildPageMetadata(input: {
  locale: string;
  /** Path without locale, e.g. `/` or `/categories` */
  path: string;
  title: string;
  description: string;
  /** Optional narrower keywords for PDP/category */
  keywords?: string[];
}): Metadata {
  const { locale, path, title, description, keywords } = input;
  const canonical = absoluteUrl(path, locale);
  const enUrl = absoluteUrl(path, "en");
  const zhUrl = absoluteUrl(path, "zh");
  const siteName = brandDisplayName(locale);
  const kw = keywords?.length ? keywords : siteKeywords(locale);

  return {
    title,
    description,
    keywords: kw,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        "zh-CN": zhUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      siteName,
      title: `${title} | ${siteName}`,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}
