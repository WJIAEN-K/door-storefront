import { prisma } from "@/lib/prisma";

export async function getCarouselArticles() {
  return prisma.article.findMany({
    where: { published: true, showInCarousel: true },
    orderBy: { carouselSort: "asc" },
    select: {
      slug: true,
      titleEn: true,
      titleZh: true,
      coverImageUrl: true,
    },
  });
}
