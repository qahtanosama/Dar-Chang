export const revalidate = 60;

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, CheckCircle2, Truck, Settings, Wrench, Zap, Package, Factory, Shield, Star, Globe, Search, Layers, Box, Cpu, Hammer, Cog, Gauge, FlaskConical, Forklift } from 'lucide-react';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

// ── Icon map (must match admin icon registry) ──────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  Truck: <Truck className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Factory: <Factory className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Box: <Box className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Cog: <Cog className="w-6 h-6" />,
  Gauge: <Gauge className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
  Forklift: <Forklift className="w-6 h-6" />,
}

// ── Hardcoded fallback (used when DB has no products for this category) ────
type CategoryData = {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  listings: { brand: string; models: string; image: string }[];
};

const machineryData: Record<string, CategoryData> = {
  excavators: {
    title: { en: "Excavators", ar: "الحفارات" },
    description: {
      en: "High-performance excavators sourced for reliability in extreme conditions.",
      ar: "حفارات عالية الأداء مصممة للاعتمادية في الظروف القاسية."
    },
    listings: [
      { brand: "Caterpillar", models: "320, 320GC", image: "/portfolio/machinery/excavators/cat.png" },
      { brand: "Komatsu", models: "PC210-10, PC200", image: "/portfolio/machinery/excavators/komatsu.png" },
      { brand: "SANY", models: "SY215C", image: "/portfolio/machinery/excavators/sany.png" },
      { brand: "Volvo", models: "EC210D", image: "/portfolio/machinery/excavators/volvo.png" },
      { brand: "SDLG", models: "LG6210E", image: "/portfolio/machinery/excavators/sdlg.png" }
    ]
  },
  'wheel-loaders': {
    title: { en: "Wheel Loaders", ar: "الرافعات الشوكية" },
    description: {
      en: "Robust loaders for large-scale logistics and site preparation.",
      ar: "رافعات قوية للعمليات اللوجستية وتجهيز المواقع على نطاق واسع."
    },
    listings: [
      { brand: "Caterpillar", models: "950L, 966L, 980L", image: "/portfolio/machinery/wheel-loaders/cat.png" },
      { brand: "Volvo", models: "L120H, L150H", image: "/portfolio/machinery/wheel-loaders/volvo.png" },
      { brand: "SDLG", models: "LG958L", image: "/portfolio/machinery/wheel-loaders/sdlg.png" },
      { brand: "Komatsu", models: "WA470, WA600", image: "/portfolio/machinery/wheel-loaders/komatsu.png" },
      { brand: "SANY", models: "SW955K", image: "/portfolio/machinery/wheel-loaders/sany.png" }
    ]
  },
  bulldozers: {
    title: { en: "Bulldozers", ar: "الجرافات" },
    description: {
      en: "Heavy-duty pushing power for land clearing and bulk earthmoving.",
      ar: "قوة دفع للخدمة الشاقة لتطهير الأراضي ونقل التربة السائبة."
    },
    listings: [
      { brand: "Caterpillar", models: "D8R, D8T, D9", image: "/portfolio/machinery/bulldozers/cat.png" },
      { brand: "Komatsu", models: "D155A, D275A", image: "/portfolio/machinery/bulldozers/komatsu.png" },
      { brand: "Shantui", models: "SD32", image: "/portfolio/machinery/bulldozers/shantui.png" },
      { brand: "SANY", models: "SYT160C", image: "/portfolio/machinery/bulldozers/sany.png" },
      { brand: "SDLG", models: "B877F", image: "/portfolio/machinery/bulldozers/sdlg.png" }
    ]
  },
  'motor-graders': {
    title: { en: "Motor Graders", ar: "ممهدات الطرق" },
    description: {
      en: "Precision equipment for leveling and road construction.",
      ar: "معدات دقيقة لتسوية وتمهيد وإنشاء الطرق."
    },
    listings: [
      { brand: "Caterpillar", models: "140K, 140GC", image: "/portfolio/machinery/motor-graders/caterpillar-140k-motor-grader.png" },
      { brand: "Komatsu", models: "GD655", image: "/portfolio/machinery/motor-graders/komatsu-gd655-motor-grader.png" },
      { brand: "SANY", models: "STG170C", image: "/portfolio/machinery/motor-graders/sany-stg170c-motor-grader.png" },
      { brand: "SDLG", models: "G9190", image: "/portfolio/machinery/motor-graders/sdlg-g9190-motor-grader.png" },
      { brand: "Volvo", models: "G940", image: "/portfolio/machinery/motor-graders/volvo-g940-motor-grader.png" }
    ]
  },
  'backhoe-loaders': {
    title: { en: "Backhoe Loaders", ar: "اللوادر الحفارة" },
    description: {
      en: "Multi-functional units for urban and utility projects.",
      ar: "وحدات متعددة الوظائف للمشاريع الحضرية ومشاريع المرافق."
    },
    listings: [
      { brand: "JCB", models: "3CX", image: "/portfolio/machinery/backhoe-loaders/jcb-3cx-backhoe-loader.png" },
      { brand: "Caterpillar", models: "428, 432", image: "/portfolio/machinery/backhoe-loaders/caterpillar-428-backhoe-loader.png" },
      { brand: "CASE", models: "580T", image: "/portfolio/machinery/backhoe-loaders/case-580t-backhoe-loader.png" },
      { brand: "SDLG", models: "B877", image: "/portfolio/machinery/backhoe-loaders/sdlg-b877-backhoe-loader.png" },
      { brand: "Komatsu", models: "WB97R", image: "/portfolio/machinery/backhoe-loaders/komatsu-wb97r-backhoe-loader.png" }
    ]
  }
};

type Params = Promise<{ locale: string; category: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, category } = await params;

  // Try DB first for title/description
  let titleEn = '', titleAr = '', descEn = '', descAr = ''
  try {
    const item = await prisma.portfolioItem.findUnique({
      where: { slug: `machinery-${category}` },
    })
    if (item) {
      titleEn = item.titleEn; titleAr = item.titleAr
      descEn = item.descriptionEn; descAr = item.descriptionAr
    }
  } catch {}

  // Fall back to hardcoded if DB miss
  if (!titleEn) {
    const data = machineryData[category]
    if (!data) return { title: 'Not Found' }
    titleEn = data.title.en; titleAr = data.title.ar
    descEn = data.description.en; descAr = data.description.ar
  }

  const title = locale === 'ar' ? titleAr : titleEn
  const description = locale === 'ar' ? descAr : descEn

  return {
    title: `${title} | Heavy Machinery | Dar Chang`,
    description,
    openGraph: { title: `${title} | Dar Chang Machinery`, description },
  };
}

export default async function MachineryCategoryPage({ params }: { params: Params }) {
  const { locale, category } = await params;
  const isRtl = locale === 'ar';

  // ── Try to load from DB ────────────────────────────────────────────────
  let dbTitle = '', dbTitleAr = '', dbDesc = '', dbDescAr = ''
  let dbProducts: {
    id: string; nameEn: string; nameAr: string;
    descriptionEn: string; descriptionAr: string;
    icon: string; imageUrl: string; specs: string;
    displayOrder: number; active: boolean;
  }[] = []

  try {
    const item = await prisma.portfolioItem.findUnique({
      where: { slug: `machinery-${category}` },
      include: {
        products: {
          where: { active: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    })
    if (item) {
      dbTitle = item.titleEn; dbTitleAr = item.titleAr
      dbDesc = item.descriptionEn; dbDescAr = item.descriptionAr
      dbProducts = item.products
    }
  } catch {}

  const hasDbProducts = dbProducts.length > 0

  // ── Fall back to hardcoded if no DB data ───────────────────────────────
  if (!hasDbProducts && !dbTitle) {
    const data = machineryData[category]
    if (!data) notFound()

    const title = isRtl ? data.title.ar : data.title.en
    const description = isRtl ? data.description.ar : data.description.en

    return (
      <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <BackLink isRtl={isRtl} />
          <CategoryHeader title={title} description={description} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.listings.map((listing, idx) => (
              <FallbackCard key={idx} listing={listing} title={title} isRtl={isRtl} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  // ── DB-powered render ──────────────────────────────────────────────────
  const title = isRtl ? (dbTitleAr || machineryData[category]?.title.ar || category) : (dbTitle || machineryData[category]?.title.en || category)
  const description = isRtl ? (dbDescAr || machineryData[category]?.description.ar || '') : (dbDesc || machineryData[category]?.description.en || '')

  // If DB has the portfolio item but no products yet, fall back to hardcoded listings
  const fallback = machineryData[category]
  const listings = hasDbProducts ? null : fallback?.listings ?? []

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
      <div className="max-w-7xl mx-auto px-6">
        <BackLink isRtl={isRtl} />
        <CategoryHeader title={title} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hasDbProducts
            ? dbProducts.map((product) => (
                <DbProductCard
                  key={product.id}
                  product={product}
                  categoryTitle={title}
                  isRtl={isRtl}
                />
              ))
            : listings!.map((listing, idx) => (
                <FallbackCard key={idx} listing={listing} title={title} isRtl={isRtl} />
              ))
          }
        </div>
      </div>
    </main>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function BackLink({ isRtl }: { isRtl: boolean }) {
  return (
    <div className="mb-8">
      <Link
        href="/portfolio/machinery"
        className="inline-flex items-center gap-2 text-text-main hover:text-accent-gold transition-colors text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        {isRtl ? "العودة إلى المعدات الثقيلة" : "Back to Heavy Machinery"}
      </Link>
    </div>
  )
}

function CategoryHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 border border-border-subtle shadow-sm mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">{title}</h1>
      <p className="text-lg text-text-main max-w-3xl">{description}</p>
    </div>
  )
}

function FallbackCard({
  listing,
  title,
  isRtl,
}: {
  listing: { brand: string; models: string; image: string }
  title: string
  isRtl: boolean
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-gold transition-all duration-300 shadow-sm group">
      <div className="relative h-64 w-full bg-bg-neutral overflow-hidden">
        <Image
          src={listing.image}
          alt={`${listing.brand} ${listing.models} - ${title} - Heavy Machinery Sourcing`}
          title={`${listing.brand} ${listing.models} ${title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-primary-navy">{listing.brand}</h3>
          <CheckCircle2 className="w-5 h-5 text-accent-gold" />
        </div>
        <div className="space-y-2 mb-6">
          <p className="text-sm font-semibold text-text-main uppercase tracking-wider">Available Models</p>
          <p className="text-lg text-primary-navy font-medium">{listing.models}</p>
        </div>
        <Link href="/quote" className="btn-primary">
          {isRtl ? "طلب تسعير" : "Request Quote"}
        </Link>
      </div>
    </div>
  )
}

function DbProductCard({
  product,
  categoryTitle,
  isRtl,
}: {
  product: {
    nameEn: string; nameAr: string; descriptionEn: string; descriptionAr: string
    icon: string; imageUrl: string; specs: string
  }
  categoryTitle: string
  isRtl: boolean
}) {
  const name = isRtl ? product.nameAr : product.nameEn
  const description = isRtl ? product.descriptionAr : product.descriptionEn

  let specs: Record<string, string> = {}
  try { specs = JSON.parse(product.specs) } catch {}
  const specEntries = Object.entries(specs)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-gold transition-all duration-300 shadow-sm group">
      {product.imageUrl ? (
        <div className="relative h-64 w-full bg-bg-neutral overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={`${name} - ${categoryTitle} - Heavy Machinery Sourcing`}
            title={`${name} ${categoryTitle}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : product.icon ? (
        <div className="h-40 w-full bg-bg-neutral flex items-center justify-center text-accent-gold">
          <span className="scale-[2.5]">{ICON_MAP[product.icon]}</span>
        </div>
      ) : null}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-primary-navy">{name}</h3>
          <CheckCircle2 className="w-5 h-5 text-accent-gold" />
        </div>

        {description && (
          <p className="text-sm text-text-main mb-4" dir={isRtl ? 'rtl' : 'ltr'}>{description}</p>
        )}

        {specEntries.length > 0 && (
          <div className="space-y-1.5 mb-6">
            {specEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-xs font-semibold text-text-main uppercase tracking-wider">{key}</span>
                <span className="text-base text-primary-navy font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}

        <Link href="/quote" className="btn-primary">
          {isRtl ? "طلب تسعير" : "Request Quote"}
        </Link>
      </div>
    </div>
  )
}
