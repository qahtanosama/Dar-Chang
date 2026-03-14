import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.darchang.com';
const locales = ['en', 'ar'];

// All public routes (excluding /admin and /api)
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

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return staticRoutes.flatMap(({ path, priority, changeFrequency }) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}${path}`,
            lastModified,
            changeFrequency,
            priority,
        }))
    );
}
