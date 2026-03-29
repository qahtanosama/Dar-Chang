import { Metadata } from 'next';

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const locale = (await props.params).locale;
    const BASE = 'https://www.darchangglobal.com'
    const isAr = locale === 'ar'
    const title = isAr
        ? "طلب عرض سعر | دار تشانغ — أرسل مواصفاتك التقنية"
        : "Request a Quote | Dar Chang — Submit Your Technical Specifications"
    const description = isAr
        ? "أرسل طلب عرض سعر مفصلاً لمعداتك أو خط الإنتاج أو المنتجات المخصصة. فريقنا في شنغهاي يرد خلال 24 ساعة."
        : "Submit a detailed RFQ for heavy machinery, production lines, or custom sourcing. Our Shanghai team responds within 24 hours."
    return {
        title,
        description,
        keywords: isAr
            ? ["طلب عرض سعر", "توريد من الصين", "استفسار صناعي", "مواصفات المعدات", "دار تشانغ"]
            : ["request a quote China", "RFQ sourcing", "industrial inquiry", "machinery specifications", "Dar Chang"],
        openGraph: {
            title,
            description,
            url: `${BASE}/${isAr ? 'ar' : 'en'}/quote`,
            siteName: isAr ? 'دار تشانغ العالمية' : 'Dar Chang Global',
            locale: isAr ? 'ar_SA' : 'en_US',
            type: 'website',
            images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: isAr ? 'طلب عرض سعر — دار تشانغ' : 'Request a Quote — Dar Chang' }],
        },
        twitter: { card: 'summary_large_image' as const, title, images: [`${BASE}/hero-poster.png`] },
    };
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
