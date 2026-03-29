import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE_URL = 'https://www.darchangglobal.com';
const locales = ['en', 'ar'];

// All public static routes (excluding /admin and /api)
const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/quote', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/insights', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/compliance', priority: 0.5, changeFrequency: 'yearly' as const },
    // Portfolio Hub
    { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/portfolio/machinery', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio/production-line', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio/hotel-furniture-procurement', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio/vhs-nema-industrial-motors', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio/custom', priority: 0.7, changeFrequency: 'monthly' as const },
    // Production Line Sub-Pages
    { path: '/industrial-fruit-sorting-lines', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/industrial-date-processing-lines', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/industrial-avocado-oil-lines', priority: 0.8, changeFrequency: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    const staticEntries = staticRoutes.flatMap(({ path, priority, changeFrequency }) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}${path}`,
            lastModified,
            changeFrequency,
            priority,
        }))
    );

    // Dynamic: published insights
    let insightEntries: MetadataRoute.Sitemap = [];
    try {
        const insights = await prisma.insight.findMany({
            where: { published: true },
            select: { slug: true, publishedAt: true },
        });
        insightEntries = insights.flatMap((insight) =>
            locales.map((locale) => ({
                url: `${BASE_URL}/${locale}/insights/${insight.slug}`,
                lastModified: insight.publishedAt ?? lastModified,
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }))
        );
    } catch {}

    // Dynamic: machinery categories (static slugs matching /public/portfolio/machinery/)
    const machinerySlugs = ['excavators', 'bulldozers', 'wheel-loaders', 'backhoe-loaders', 'motor-graders'];
    const machineryEntries: MetadataRoute.Sitemap = machinerySlugs.flatMap((slug) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/portfolio/machinery/${slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    return [...staticEntries, ...insightEntries, ...machineryEntries];
}
