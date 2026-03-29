import { prisma } from '@/lib/prisma'

const defaultSeoConfig: Record<string, Record<string, {
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImageUrl: string
  canonical: string | null
}>> = {
  home: {
    en: {
      metaTitle: 'Dar Chang | Your Trusted China Sourcing & Manufacturing Partner',
      metaDescription: 'We bridge international buyers with top-tier Chinese factories. Specializing in heavy machinery, production lines, VHS motors, and FF&E — with boots on the ground in Shanghai.',
      ogTitle: 'Dar Chang | China Sourcing & Manufacturing',
      ogDescription: 'Your trusted partner for sourcing from China. Heavy machinery, production lines, and more.',
      ogImageUrl: '/hero-poster.png',
      canonical: null,
    },
    ar: {
      metaTitle: 'دار تشانغ | شريكك الموثوق للتوريد والتصنيع من الصين',
      metaDescription: 'نربط المشترين الدوليين بأفضل المصانع الصينية. نختص في المعدات الثقيلة، خطوط الإنتاج، المحركات الصناعية، وتوريد الأثاث الفندقي — بحضور ميداني في شنغهاي.',
      ogTitle: 'دار تشانغ | التوريد والتصنيع من الصين',
      ogDescription: 'شريكك الموثوق للتوريد من الصين.',
      ogImageUrl: '/hero-poster.png',
      canonical: null,
    },
  },
  portfolio: {
    en: {
      metaTitle: 'Portfolio | Dar Chang',
      metaDescription: 'Explore our portfolio of sourcing projects across heavy machinery, production lines, and hospitality FF&E.',
      ogTitle: 'Portfolio | Dar Chang',
      ogDescription: 'Our sourcing portfolio across multiple sectors.',
      ogImageUrl: '/hero-poster.png',
      canonical: null,
    },
    ar: {
      metaTitle: 'خبراتنا | دار تشانغ',
      metaDescription: 'استكشف محفظة مشاريعنا في مجال المعدات الثقيلة وخطوط الإنتاج والأثاث الفندقي.',
      ogTitle: 'خبراتنا | دار تشانغ',
      ogDescription: 'محفظة مشاريعنا في مختلف القطاعات.',
      ogImageUrl: '/hero-poster.png',
      canonical: null,
    },
  },
  insights: {
    en: {
      metaTitle: 'Insights | Dar Chang',
      metaDescription: 'Read our latest insights on China sourcing, supply chain management, and international trade.',
      ogTitle: 'Insights | Dar Chang',
      ogDescription: 'Latest insights on China sourcing and supply chain.',
      ogImageUrl: '/hero-poster.png',
      canonical: null,
    },
    ar: {
      metaTitle: 'رؤى | دار تشانغ',
      metaDescription: 'اقرأ أحدث رؤانا حول التوريد من الصين وإدارة سلاسل التوريد والتجارة الدولية.',
      ogTitle: 'رؤى | دار تشانغ',
      ogDescription: 'أحدث الرؤى حول التوريد من الصين.',
      ogImageUrl: '/hero-poster.png',
      canonical: null,
    },
  },
}

export async function getSeoConfig(pageKey: string, locale: string) {
  const config = await prisma.seoConfig.findUnique({
    where: { pageKey_locale: { pageKey, locale } },
  })

  if (config) return config

  // Fallback to defaults
  const fallback = defaultSeoConfig[pageKey]?.[locale]
  if (fallback) return { ...fallback, pageKey, locale, id: '', ogImageUrl: fallback.ogImageUrl || '' }

  // Global default
  return {
    id: '',
    pageKey,
    locale,
    metaTitle: 'Dar Chang Global',
    metaDescription: 'Your trusted China sourcing partner.',
    ogTitle: 'Dar Chang Global',
    ogDescription: 'Your trusted China sourcing partner.',
    ogImageUrl: '/hero-poster.png',
    canonical: null,
  }
}
