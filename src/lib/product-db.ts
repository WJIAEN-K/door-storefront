import { productsZh } from "@/content/products-zh";
import type { LocalizedProduct } from "@/lib/localize";
import { prisma } from "@/lib/prisma";
import type { Product as PrismaProduct } from "@prisma/client";

function parseStringArray(s: string): string[] {
  try {
    const v = JSON.parse(s) as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function parseSpecs(s: string): Array<{ label: string; value: string }> {
  try {
    const v = JSON.parse(s) as unknown;
    if (!Array.isArray(v)) return [];
    return v
      .filter(
        (x): x is { label: string; value: string } =>
          x != null &&
          typeof x === "object" &&
          "label" in x &&
          "value" in x &&
          typeof (x as { label: unknown }).label === "string" &&
          typeof (x as { value: unknown }).value === "string",
      )
      .map((x) => ({ label: x.label, value: x.value }));
  } catch {
    return [];
  }
}

export function prismaProductToLocalized(row: PrismaProduct, locale: string): LocalizedProduct {
  const highlights = parseStringArray(row.highlights);
  const specs = parseSpecs(row.specs);
  const galleryFiles = parseStringArray(row.galleryFiles);
  const highlightsZhOverride = row.highlightsZh ? parseStringArray(row.highlightsZh) : null;
  const specsZhOverride = row.specsZh ? parseSpecs(row.specsZh) : null;

  const base = {
    slug: row.slug,
    sku: row.sku,
    msgKey: row.msgKey,
    categorySlug: row.categorySlug,
    priceRange: row.priceRange,
    rating: row.rating,
    reviews: row.reviews,
    visual: row.visual as LocalizedProduct["visual"],
    imageFolder: row.imageFolder,
    imageFile: row.imageFile,
    galleryFiles,
  };

  if (locale !== "zh") {
    return {
      ...base,
      name: row.name,
      description: row.description,
      highlights,
      leadTime: row.leadTime,
      finish: row.finish,
      size: row.size,
      material: row.material,
      installation: row.installation,
      categoryName: row.categoryName,
      specs,
    };
  }

  const dict = productsZh[row.msgKey];
  return {
    ...base,
    name: row.nameZh ?? dict?.name ?? row.name,
    description: row.descriptionZh ?? dict?.description ?? row.description,
    highlights: highlightsZhOverride ?? dict?.highlights ?? highlights,
    leadTime: row.leadTimeZh ?? dict?.leadTime ?? row.leadTime,
    finish: row.finishZh ?? dict?.finish ?? row.finish,
    size: row.sizeZh ?? dict?.size ?? row.size,
    material: row.materialZh ?? dict?.material ?? row.material,
    installation: row.installationZh ?? dict?.installation ?? row.installation,
    categoryName: row.categoryNameZh ?? dict?.categoryName ?? row.categoryName,
    specs: specsZhOverride ?? dict?.specs ?? specs,
  };
}

export async function getAllProductsFromDb() {
  return prisma.product.findMany({ orderBy: { slug: "asc" } });
}

export async function getProductBySlugFromDb(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function getFeaturedProductsFromDb() {
  const rows = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { slug: "asc" },
  });
  return rows;
}

export async function getProductsByCategoryFromDb(categorySlug: string) {
  return prisma.product.findMany({
    where: { categorySlug },
    orderBy: { slug: "asc" },
  });
}

export async function getHeroProductFromDb() {
  const row =
    (await prisma.product.findFirst({ where: { sku: "DTD-INT-M01" } })) ??
    (await prisma.product.findFirst({ orderBy: { slug: "asc" } }));
  return row;
}
