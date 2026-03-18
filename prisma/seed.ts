import { PrismaClient } from "@prisma/client";

import { products } from "../src/lib/site-data";

const prisma = new PrismaClient();

const FEATURED_SKUS = new Set(["DTD-INT-M01", "DTD-INT-M05", "DTD-EXT-M04"]);

async function main() {
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        sku: p.sku,
        msgKey: p.msgKey,
        name: p.name,
        categorySlug: p.categorySlug,
        categoryName: p.categoryName,
        priceRange: p.priceRange,
        rating: p.rating,
        reviews: p.reviews,
        leadTime: p.leadTime,
        finish: p.finish,
        size: p.size,
        material: p.material,
        installation: p.installation,
        description: p.description,
        highlights: JSON.stringify(p.highlights),
        specs: JSON.stringify(p.specs),
        visual: p.visual,
        imageFolder: p.imageFolder,
        imageFile: p.imageFile,
        galleryFiles: JSON.stringify(p.galleryFiles),
        featured: FEATURED_SKUS.has(p.sku),
      },
    });
  }

  await prisma.article.createMany({
    data: [
      {
        slug: "rapidhang-freight-update",
        titleEn: "RapidHang™ — smaller boxes, fewer dents",
        titleZh: "RapidHang™ 紧凑包装与物流更新",
        bodyMarkdown:
          "## What changed\n\nWe tuned crate sizes for prehung interior SKUs. **Contractors** report faster staging on tight job sites.\n\n- Compact jamb kits ship separate when noted on quote\n- Plastic stays on glass through paint cure\n\n[Browse interior SKUs](/products)",
        coverImageUrl: "/doors/门1/微信图片_2026-03-04_113552_921.jpg",
        published: true,
        publishedAt: new Date(),
        showInCarousel: true,
        carouselSort: 0,
      },
      {
        slug: "international-shipping-checklist",
        titleEn: "International orders — checklist",
        titleZh: "国际订单准备清单",
        bodyMarkdown:
          "## Before you request a quote\n\n1. SKU list with quantities\n2. Delivery country & postal code\n3. Rough opening if non-standard\n\nEmail **sales** with subject line *International quote*.",
        coverImageUrl: "/doors/门4/微信图片_2026-03-04_113855_075.jpg",
        published: true,
        publishedAt: new Date(),
        showInCarousel: true,
        carouselSort: 1,
      },
    ],
  });

  console.log(`Seeded ${products.length} products and sample articles.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
