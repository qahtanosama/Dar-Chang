/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // Replace with your actual domain when deploying
    siteUrl: process.env.SITE_URL || 'https://www.darchangglobal.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
        ],
    },
    // We exclude the base paths and rely on the localized paths
    exclude: ['/favicon.ico'],
    // Auto-generate hreflang tags for Arabic and English locales
    alternateRefs: [
        {
            href: 'https://www.darchangglobal.com/ar',
            hreflang: 'ar',
        },
        {
            href: 'https://www.darchangglobal.com/en',
            hreflang: 'en',
        },
        {
            href: 'https://www.darchangglobal.com/ar',
            hreflang: 'x-default', // Fallback
        },
    ],
    transform: async (config, path) => {
        // Basic transformation logic to ensure clean URLs
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: path === '/ar' || path === '/en' ? 1.0 : config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    }
}
