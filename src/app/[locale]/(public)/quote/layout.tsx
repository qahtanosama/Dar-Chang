import { Metadata } from 'next';

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const locale = (await props.params).locale;
    if (locale === 'ar') {
        return {
            title: "طلب عرض سعر | دار تشانغ — أرسل مواصفاتك التقنية",
            description: "أرسل طلب عرض سعر مفصلاً لمعداتك أو خط الإنتاج أو المنتجات المخصصة. فريقنا في شنغهاي يرد خلال 24 ساعة.",
            keywords: ["طلب عرض سعر", "توريد من الصين", "استفسار صناعي", "مواصفات المعدات", "دار تشانغ"],
        };
    }
    return {
        title: "Request a Quote | Dar Chang — Submit Your Technical Specifications",
        description: "Submit a detailed RFQ for heavy machinery, production lines, or custom sourcing. Our Shanghai team responds within 24 hours.",
        keywords: ["request a quote China", "RFQ sourcing", "industrial inquiry", "machinery specifications", "Dar Chang"],
    };
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
