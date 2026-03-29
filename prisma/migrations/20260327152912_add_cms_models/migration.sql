-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainImage" TEXT,
    "body" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "mainImage" TEXT,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "description" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PortfolioItem" (
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
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "ImpactStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labelEn" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "suffix" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL,
    "summaryAr" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodyAr" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'General',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SeoConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageKey" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "ogTitle" TEXT NOT NULL,
    "ogDescription" TEXT NOT NULL,
    "ogImageUrl" TEXT NOT NULL DEFAULT '',
    "canonical" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioItem_slug_key" ON "PortfolioItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Insight_slug_key" ON "Insight"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SeoConfig_pageKey_locale_key" ON "SeoConfig"("pageKey", "locale");
