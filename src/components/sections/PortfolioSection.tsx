// Server Component wrapper — fetches from DB, falls back to hardcoded data
import { prisma } from '@/lib/prisma'
import { PortfolioSectionClient } from './PortfolioSectionClient'
import { Tractor, Zap, Factory, Armchair, Puzzle } from 'lucide-react'

const FALLBACK_PILLARS = [
    {
        id: 'f1',
        titleEn: "Heavy Machinery",
        titleAr: "المعدات الثقيلة",
        descEn: "Excavators, Wheel Loaders, Bulldozers & Graders from top global brands — sourced direct from Chinese OEMs.",
        descAr: "حفارات، شيولات، بلدوزرات، ومسطحات — مباشرةً من كبرى المصانع الصينية.",
        iconName: 'Tractor',
        href: "/portfolio/machinery",
        bgImage: "/portfolio/machinery_bg.jpg",
    },
    {
        id: 'f2',
        titleEn: "VHS NEMA Motors",
        titleAr: "محركات VHS / NEMA",
        descEn: "Vertical Hollow Shaft motors, VFD control panels, and full industrial drive integrations.",
        descAr: "محركات VHS وفقًا للمعيار NEMA، ولوحات التحكم VFD والتكاملات الصناعية.",
        iconName: 'Zap',
        href: "/portfolio/vhs-nema-industrial-motors",
        bgImage: "/portfolio/vhs-motor-industrial.jpg",
    },
    {
        id: 'f3',
        titleEn: "Production Lines",
        titleAr: "خطوط الإنتاج",
        descEn: "Fully automated manufacturing systems for packaging, food processing, and industrial output.",
        descAr: "أنظمة تصنيع آلية متكاملة للتعبئة، وتجهيز الغذاء، والإنتاج الصناعي.",
        iconName: 'Factory',
        href: "/portfolio/production-line",
        bgImage: "/portfolio/production_bg.png",
    },
    {
        id: 'f4',
        titleEn: "Hospitality FF&E",
        titleAr: "أثاث ومعدات فندقية",
        descEn: "Turnkey sourcing of Furniture, Fixtures & Equipment for hotels and hospitality projects.",
        descAr: "توريد شامل للأثاث والتجهيزات والمعدات لمشاريع الفنادق والضيافة.",
        iconName: 'Armchair',
        href: "/portfolio/hotel-furniture-procurement",
        bgImage: "/portfolio/hospitality_bg.jpg",
    },
    {
        id: 'f5',
        titleEn: "Custom Sourcing",
        titleAr: "طلبات التوريد المخصصة",
        descEn: "Niche industrial parts, bespoke commercial goods, and verified alternative suppliers.",
        descAr: "قطع صناعية نادرة، منتجات تجارية مخصصة، والبحث عن موردين بديلين معتمدين.",
        iconName: 'Puzzle',
        href: "/portfolio/custom",
        bgImage: "/portfolio/custom_bg.png",
    },
];

export type PortfolioPillar = {
    id: string
    titleEn: string
    titleAr: string
    descEn: string
    descAr: string
    iconName: string
    href: string
    bgImage: string
}

export async function PortfolioSection() {
    const dbItems = await prisma.portfolioItem.findMany({
        where: { featured: true }, // Show featured items on the homepage
        orderBy: { order: 'asc' },
    })

    const items: PortfolioPillar[] = dbItems.length > 0
        ? dbItems.map((item: { id: string; slug: string; titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string; category: string; imageUrl: string; tags: string; featured: boolean; order: number; createdAt: Date; updatedAt: Date }) => {
            // Pick a default icon if we want or just map based on category
            let iconName = 'Puzzle'
            const cat = item.category.toLowerCase()
            if (cat.includes('machine') || cat.includes('heavy')) iconName = 'Tractor'
            else if (cat.includes('motor') || cat.includes('vhs') || cat.includes('electric')) iconName = 'Zap'
            else if (cat.includes('production') || cat.includes('factory')) iconName = 'Factory'
            else if (cat.includes('furniture') || cat.includes('hospitality') || cat.includes('hotel')) iconName = 'Armchair'

            return {
                id: item.id,
                titleEn: item.titleEn,
                titleAr: item.titleAr,
                descEn: item.descriptionEn,
                descAr: item.descriptionAr,
                iconName,
                href: `/portfolio/${item.slug}`,
                bgImage: item.imageUrl || FALLBACK_PILLARS[0].bgImage,
            }
        })
        : FALLBACK_PILLARS

    return <PortfolioSectionClient items={items} />
}
