import { Metadata } from 'next';

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const locale = (await props.params).locale;
    if (locale === 'ar') {
        return {
            title: "الامتثال والوثائق القانونية | دار تشانغ — سابر، CE، وأكثر",
            description: "اطلع على بنية الامتثال القانوني لدينا: شهادات المنشأ، معايير سابر (SASO)، وثائق الجمارك، وأطر العناية الواجبة.",
            keywords: ["الامتثال التجاري", "سابر SASO", "معايير CE", "شهادة المنشأ", "وثائق الاستيراد"],
        };
    }
    return {
        title: "Compliance & Legal Documentation | Dar Chang — SASO, CE & Customs",
        description: "Review our compliance framework: certificates of origin, SASO standards, customs documentation, and due diligence protocols for all sourcing projects.",
        keywords: ["import compliance", "SASO certification", "CE standards", "certificate of origin", "Dar Chang legal"],
    };
}

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
