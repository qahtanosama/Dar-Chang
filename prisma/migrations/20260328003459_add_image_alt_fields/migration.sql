-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PortfolioItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageAltEn" TEXT NOT NULL DEFAULT '',
    "imageCaptionEn" TEXT NOT NULL DEFAULT '',
    "imageAltAr" TEXT NOT NULL DEFAULT '',
    "imageCaptionAr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PortfolioItem" ("category", "createdAt", "descriptionAr", "descriptionEn", "featured", "id", "imageUrl", "order", "slug", "tags", "titleAr", "titleEn", "updatedAt") SELECT "category", "createdAt", "descriptionAr", "descriptionEn", "featured", "id", "imageUrl", "order", "slug", "tags", "titleAr", "titleEn", "updatedAt" FROM "PortfolioItem";
DROP TABLE "PortfolioItem";
ALTER TABLE "new_PortfolioItem" RENAME TO "PortfolioItem";
CREATE UNIQUE INDEX "PortfolioItem_slug_key" ON "PortfolioItem"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
