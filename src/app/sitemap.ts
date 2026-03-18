import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { categories } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(["/"]);
  paths.add("/categories");
  paths.add("/products");
  paths.add("/contact");
  for (const c of categories) paths.add(`/categories/${c.slug}`);

  const products = await prisma.product.findMany({ select: { slug: true } });
  for (const p of products) paths.add(`/products/${p.slug}`);

  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });
  for (const a of articles) paths.add(`/news/${a.slug}`);

  const entries: MetadataRoute.Sitemap = [];
  const pathList = [...paths];

  for (const locale of routing.locales) {
    for (const path of pathList) {
      const url = absoluteUrl(path, locale);
      const isHome = path === "/";
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: isHome ? "weekly" : "weekly",
        priority: isHome
          ? 1
          : path.startsWith("/products/")
            ? 0.75
            : path.startsWith("/news/")
              ? 0.7
              : 0.85,
      });
    }
  }

  return entries;
}
