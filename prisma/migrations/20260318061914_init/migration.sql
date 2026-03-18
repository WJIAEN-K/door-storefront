-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "msgKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameZh" TEXT,
    "categorySlug" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryNameZh" TEXT,
    "priceRange" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviews" INTEGER NOT NULL,
    "leadTime" TEXT NOT NULL,
    "leadTimeZh" TEXT,
    "finish" TEXT NOT NULL,
    "finishZh" TEXT,
    "size" TEXT NOT NULL,
    "sizeZh" TEXT,
    "material" TEXT NOT NULL,
    "materialZh" TEXT,
    "installation" TEXT NOT NULL,
    "installationZh" TEXT,
    "description" TEXT NOT NULL,
    "descriptionZh" TEXT,
    "highlights" TEXT NOT NULL,
    "highlightsZh" TEXT,
    "specs" TEXT NOT NULL,
    "specsZh" TEXT,
    "visual" TEXT NOT NULL,
    "imageFolder" TEXT NOT NULL,
    "imageFile" TEXT NOT NULL,
    "galleryFiles" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleZh" TEXT NOT NULL,
    "bodyMarkdown" TEXT NOT NULL DEFAULT '',
    "coverImageUrl" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "showInCarousel" BOOLEAN NOT NULL DEFAULT false,
    "carouselSort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
