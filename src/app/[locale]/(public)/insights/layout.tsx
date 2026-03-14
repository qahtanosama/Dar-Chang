import { Metadata } from 'next';

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const locale = (await props.params).locale;
    if (locale === 'ar') {
        return {
            title: "رؤى عالمية | دار تشانغ — اتجاهات الصناعة وتحليلات التوريد",
            description: "تحليلات خبراء التوريد الدولي، لوائح تصدير المنتجات الطازجة، المحركات الصناعية، وسلاسل التوريد في الأسواق العالمية.",
            keywords: ["رؤى الأعمال", "التوريد الدولي", "تصدير الصين", "محركات NEMA", "تحليلات السوق"],
        };
    }
    return {
        title: "Global Insights | Dar Chang — Industry Trends & Sourcing Analysis",
        description: "Expert analysis on international sourcing, fresh produce export regulations, NEMA industrial motors, and global supply chain intelligence.",
        keywords: ["global trade insights", "China sourcing trends", "NEMA motors", "supply chain analysis", "procurement intelligence"],
    };
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
