import type { Metadata } from 'next'

interface InsightSeoData {
  titleEn: string
  titleAr: string
  summaryEn: string
  summaryAr: string
  slug: string
  coverImage: string
}

/**
 * Maps Insight CMS data to a Next.js 16 Metadata object.
 *
 * Usage in generateMetadata():
 *   const insight = await prisma.insight.findUnique({ where: { slug } })
 *   return insightToMetadata(insight, locale, 'https://darchangglobal.com')
 */
export function insightToMetadata(
  insight: InsightSeoData,
  locale: 'en' | 'ar',
  baseUrl: string
): Metadata {
  const isAr = locale === 'ar'
  const title = isAr ? insight.titleAr : insight.titleEn
  const description = isAr ? insight.summaryAr : insight.summaryEn
  const canonical = `${baseUrl}/${locale}/insights/${insight.slug}`
  const images = insight.coverImage
    ? [{ url: insight.coverImage, width: 1200, height: 630, alt: title }]
    : []

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/insights/${insight.slug}`,
        ar: `${baseUrl}/ar/insights/${insight.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      images,
      locale: isAr ? 'ar_SA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: insight.coverImage ? [insight.coverImage] : [],
    },
  }
}
