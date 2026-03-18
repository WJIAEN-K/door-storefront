"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function emptyToNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s === "" ? null : s;
}

function parseJsonArray(s: string, fallback: unknown[]): string {
  try {
    const v = JSON.parse(s);
    return JSON.stringify(Array.isArray(v) ? v : fallback);
  } catch {
    return JSON.stringify(fallback);
  }
}

function parseSpecsJson(s: string): string {
  try {
    const v = JSON.parse(s);
    if (!Array.isArray(v)) return "[]";
    return JSON.stringify(v);
  } catch {
    return "[]";
  }
}

export async function saveArticle(formData: FormData) {
  await requireAdmin();
  const id = emptyToNull(formData.get("id"));
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("Slug required");

  const data = {
    slug,
    titleEn: String(formData.get("titleEn") ?? ""),
    titleZh: String(formData.get("titleZh") ?? ""),
    bodyMarkdown: String(formData.get("bodyMarkdown") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    published: formData.get("published") === "on",
    showInCarousel: formData.get("showInCarousel") === "on",
    carouselSort: Number(formData.get("carouselSort") ?? 0) || 0,
    publishedAt: (() => {
      const raw = String(formData.get("publishedAt") ?? "").trim();
      if (!raw) return null;
      const d = new Date(raw);
      return Number.isNaN(d.getTime()) ? null : d;
    })(),
  };

  if (id) {
    await prisma.article.update({ where: { id }, data });
  } else {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) throw new Error("Slug already exists");
    await prisma.article.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/[locale]", "page");
  revalidatePath("/en/news/[slug]", "page");
  revalidatePath("/zh/news/[slug]", "page");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/articles");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product id");

  const highlights = parseJsonArray(String(formData.get("highlights") ?? "[]"), []);
  const specs = parseSpecsJson(String(formData.get("specs") ?? "[]"));
  const galleryFiles = parseJsonArray(String(formData.get("galleryFiles") ?? "[]"), []);

  await prisma.product.update({
    where: { id },
    data: {
      slug: String(formData.get("slug") ?? "").trim(),
      sku: String(formData.get("sku") ?? "").trim(),
      msgKey: String(formData.get("msgKey") ?? "").trim(),
      name: String(formData.get("name") ?? ""),
      nameZh: emptyToNull(formData.get("nameZh")),
      categorySlug: String(formData.get("categorySlug") ?? "").trim(),
      categoryName: String(formData.get("categoryName") ?? ""),
      categoryNameZh: emptyToNull(formData.get("categoryNameZh")),
      priceRange: String(formData.get("priceRange") ?? ""),
      rating: Math.min(5, Math.max(0, Number(formData.get("rating")) || 0)),
      reviews: Math.max(0, Number(formData.get("reviews")) || 0),
      leadTime: String(formData.get("leadTime") ?? ""),
      leadTimeZh: emptyToNull(formData.get("leadTimeZh")),
      finish: String(formData.get("finish") ?? ""),
      finishZh: emptyToNull(formData.get("finishZh")),
      size: String(formData.get("size") ?? ""),
      sizeZh: emptyToNull(formData.get("sizeZh")),
      material: String(formData.get("material") ?? ""),
      materialZh: emptyToNull(formData.get("materialZh")),
      installation: String(formData.get("installation") ?? ""),
      installationZh: emptyToNull(formData.get("installationZh")),
      description: String(formData.get("description") ?? ""),
      descriptionZh: emptyToNull(formData.get("descriptionZh")),
      highlights,
      highlightsZh: (() => {
        const raw = String(formData.get("highlightsZh") ?? "").trim();
        return raw === "" ? null : parseJsonArray(raw, []);
      })(),
      specs,
      specsZh: (() => {
        const raw = String(formData.get("specsZh") ?? "").trim();
        return raw === "" ? null : parseSpecsJson(raw);
      })(),
      visual: String(formData.get("visual") ?? "shaker"),
      imageFolder: String(formData.get("imageFolder") ?? ""),
      imageFile: String(formData.get("imageFile") ?? ""),
      galleryFiles,
      featured: formData.get("featured") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/[locale]", "layout");
  revalidatePath("/en/products/[slug]", "page");
  revalidatePath("/zh/products/[slug]", "page");
  revalidatePath("/en/products", "page");
  revalidatePath("/zh/products", "page");
}
