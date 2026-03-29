export const revalidate = 60;

import { prisma } from '@/lib/prisma'
import { Link } from "@/i18n/routing";
import { Zap, Tractor, Factory, Armchair, Puzzle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  const BASE = 'https://www.darchangglobal.com'
  if (locale === 'ar') {
    return {
      title: "محفظتنا | دار تشانغ — معدات ثقيلة، خطوط إنتاج، وأكثر",
      description: "استكشف محفظتنا: معدات ثقيلة، محركات VHS، خطوط إنتاج، وتوريد أثاث فندقي — مدعوم بحضور ميداني في شنغهاي.",
      keywords: ["محفظة دار تشانغ", "معدات ثقيلة", "خطوط الإنتاج", "محركات VHS", "توريد أثاث فندقي"],
      openGraph: { title: "محفظتنا | دار تشانغ", description: "معدات ثقيلة، محركات VHS، خطوط إنتاج، وأثاث فندقي.", url: `${BASE}/ar/portfolio`, locale: "ar_SA", type: "website", images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: "دار تشانغ — محفظة المنتجات الصناعية" }] },
      twitter: { card: "summary_large_image", title: "محفظتنا | دار تشانغ", images: [`${BASE}/hero-poster.png`] },
    };
  }
  return {
    title: "Our Portfolio | Dar Chang — Heavy Machinery, Production Lines & More",
    description: "Explore Dar Chang's portfolio: heavy machinery, VHS NEMA motors, industrial production lines, and hospitality FF&E sourcing — backed by on-the-ground expertise in Shanghai.",
    keywords: ["Dar Chang portfolio", "heavy machinery sourcing", "production lines", "VHS motors", "FF&E sourcing"],
    openGraph: { title: "Our Portfolio | Dar Chang", description: "Heavy machinery, VHS motors, production lines & FF&E from Shanghai.", url: `${BASE}/en/portfolio`, locale: "en_US", type: "website", images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: "Dar Chang — Industrial Portfolio" }] },
    twitter: { card: "summary_large_image", title: "Our Portfolio | Dar Chang", images: [`${BASE}/hero-poster.png`] },
  };
}

// Hardcoded fallback pillars — used when no featured PortfolioItems exist in the DB
const FALLBACK_PILLARS = [
  {
    id: 'f1',
    titleEn: "Heavy Machinery",
    titleAr: "المعدات الثقيلة",
    descEn: "Excavators, Wheel Loaders, Bulldozers, and Graders from top global brands.",
    descAr: "الحفارات، الشيولات، البلدوزرات، ومعدات الرفع الثقيلة.",
    iconName: 'Tractor',
    href: "/portfolio/machinery",
    bgImage: "/portfolio/machinery_bg.jpg",
  },
  {
    id: 'f2',
    titleEn: "Vertical Hollow Shaft (VHS) Motors",
    titleAr: "محركات المجوفة العمودية (VHS)",
    descEn: "VHS Motors NEMA Standard, VFD Control Panels, and industrial integrations.",
    descAr: "محركات VHS القياسية المعتمدة ولوحات التحكم المتقدمة.",
    iconName: 'Zap',
    href: "/portfolio/vhs-nema-industrial-motors",
    bgImage: "/portfolio/vhs-motor-industrial.jpg",
  },
  {
    id: 'f3',
    titleEn: "Production Lines",
    titleAr: "خطوط الإنتاج",
    descEn: "Comprehensive automated manufacturing systems tailored for efficiency.",
    descAr: "أنظمة تصنيع آلية شاملة مصممة لرفع الكفاءة والإنتاجية.",
    iconName: 'Factory',
    href: "/portfolio/production-line",
    bgImage: "/portfolio/production_bg.png",
  },
  {
    id: 'f4',
    titleEn: "Turnkey Hospitality FF&E Sourcing",
    titleAr: "توريد الأثاث والمعدات الفندقية",
    descEn: "Full-scale sourcing of Furniture, Fixtures & Equipment for hospitality projects.",
    descAr: "توريد شامل للأثاث والتجهيزات والمعدات لمشاريع الضيافة.",
    iconName: 'Armchair',
    href: "/portfolio/hotel-furniture-procurement",
    bgImage: "/portfolio/hospitality_bg.jpg",
  },
  {
    id: 'f5',
    titleEn: "Custom Procurement & Special Requests",
    titleAr: "طلبات التوريد الخاصة والمخصصة",
    descEn: "Niche industrial sourcing, bespoke commercial goods, and verified alternative suppliers.",
    descAr: "القطع الصناعية النادرة، المنتجات التجارية المخصصة، والبحث عن بدائل معتمدة.",
    iconName: 'Puzzle',
    href: "/portfolio/custom",
    bgImage: "/portfolio/custom_bg.png",
  },
]

const ICON_MAP: Record<string, React.ReactNode> = {
  Tractor:  <Tractor  className="w-12 h-12 text-accent-gold" />,
  Zap:      <Zap      className="w-12 h-12 text-accent-gold" />,
  Factory:  <Factory  className="w-12 h-12 text-accent-gold" />,
  Armchair: <Armchair className="w-12 h-12 text-accent-gold" />,
  Puzzle:   <Puzzle   className="w-12 h-12 text-accent-gold" />,
}

function deriveIcon(category: string): string {
  const cat = category.toLowerCase()
  if (cat.includes('machine') || cat.includes('heavy') || cat.includes('excavat')) return 'Tractor'
  if (cat.includes('motor') || cat.includes('vhs') || cat.includes('electric')) return 'Zap'
  if (cat.includes('production') || cat.includes('factory') || cat.includes('line')) return 'Factory'
  if (cat.includes('furniture') || cat.includes('hospitality') || cat.includes('hotel')) return 'Armchair'
  return 'Puzzle'
}

export default async function PortfolioHubPage(props: { params: Promise<{ locale: string }> }) {
  const locale = (await props.params).locale
  const isAr = locale === 'ar'

  // Try reading featured portfolio items from DB; fall back to hardcoded if none exist
  let pillars = FALLBACK_PILLARS
  try {
    const dbItems = await prisma.portfolioItem.findMany({
      where: { featured: true, status: 'published' },
      orderBy: { order: 'asc' },
    })
    if (dbItems.length > 0) {
      pillars = dbItems.map(item => ({
        id: item.id,
        titleEn: item.titleEn,
        titleAr: item.titleAr,
        descEn: item.descriptionEn,
        descAr: item.descriptionAr,
        iconName: deriveIcon(item.category),
        href: `/portfolio/${item.slug}`,
        bgImage: item.imageUrl || FALLBACK_PILLARS[0].bgImage,
      }))
    }
  } catch {}

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dar Chang Product Categories",
    "description": "Our core sourcing domains: Heavy Machinery, VHS Motors, Production Lines, and FF&E.",
    "itemListElement": pillars.map((pillar, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": isAr ? pillar.titleAr : pillar.titleEn,
        "description": isAr ? pillar.descAr : pillar.descEn,
        "url": `https://www.darchangglobal.com/${locale}${pillar.href}`
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto highlight-border">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-navy mb-6">
              {isAr ? 'محفظتنا' : 'Our Portfolio'}
            </h1>
            <p className="text-text-main text-lg">
              {isAr
                ? 'استكشف مجالات خبرتنا. يمثل كل قسم مئات عمليات التدقيق الناجحة، وعمليات مراقبة الجودة الصارمة، وعمليات التسليم اللوجستية السلسة في جميع أنحاء العالم.'
                : 'Explore our domains of expertise. Each pillar represents hundreds of successful audits, rigorous quality control processes, and seamless logistics deliveries worldwide.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {pillars.map((pillar, idx) => (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group relative bg-transparent lg:bg-white rounded-2xl p-8 border border-white/20 lg:border-border-subtle hover:border-accent-gold transition-all duration-500 overflow-hidden shadow-md lg:shadow-sm flex flex-col items-center text-center"
              >
                {/* Background Image Reveal */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                  <Image
                    src={pillar.bgImage}
                    alt={isAr ? pillar.titleAr : pillar.titleEn}
                    fill
                    priority={idx < 2}
                    loading={idx < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover scale-100 lg:scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/60 lg:bg-white/20 group-hover:bg-black/60 transition-colors duration-700" />
                </div>

                <div className="content-reveal-overlay absolute inset-0 bg-transparent lg:bg-white z-10 hidden lg:block group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-20 flex flex-col items-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500 bg-white/10 lg:bg-transparent p-3 lg:p-0 rounded-2xl backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-transparent inline-flex items-center justify-center shadow-lg lg:shadow-none">
                    {ICON_MAP[pillar.iconName] ?? ICON_MAP['Puzzle']}
                  </div>
                  <h2 className="text-xl font-bold text-white lg:text-primary-navy mb-3 group-hover:text-white transition-colors duration-500 leading-snug drop-shadow-md lg:drop-shadow-none">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h2>
                  <p className="text-gray-200 lg:text-text-main text-sm leading-relaxed max-w-xs group-hover:text-gray-100 transition-colors duration-500 drop-shadow-md lg:drop-shadow-none">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
