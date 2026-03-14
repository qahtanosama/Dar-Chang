import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

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
            { brand: "Caterpillar", models: "140K, 140GC", image: "/portfolio/excavator.png" },
            { brand: "Komatsu", models: "GD655", image: "/portfolio/excavator.png" },
            { brand: "SANY", models: "STG170C", image: "/portfolio/excavator.png" },
            { brand: "SDLG", models: "G9190", image: "/portfolio/excavator.png" },
            { brand: "Volvo", models: "G940", image: "/portfolio/excavator.png" }
        ]
    },
    'backhoe-loaders': {
        title: { en: "Backhoe Loaders", ar: "اللوادر الحفارة" },
        description: {
            en: "Multi-functional units for urban and utility projects.",
            ar: "وحدات متعددة الوظائف للمشاريع الحضرية ومشاريع المرافق."
        },
        listings: [
            { brand: "JCB", models: "3CX", image: "/portfolio/excavator.png" },
            { brand: "Caterpillar", models: "428, 432", image: "/portfolio/excavator.png" },
            { brand: "CASE", models: "580T", image: "/portfolio/excavator.png" },
            { brand: "SDLG", models: "B877", image: "/portfolio/excavator.png" },
            { brand: "Komatsu", models: "WB97R", image: "/portfolio/excavator.png" }
        ]
    }
};

type Params = Promise<{ locale: string; category: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale, category } = await params;
    const data = machineryData[category];

    if (!data) return { title: 'Not Found' };

    const title = locale === 'ar' ? data.title.ar : data.title.en;
    const description = locale === 'ar' ? data.description.ar : data.description.en;

    return {
        title: `${title} | Heavy Machinery | Dar Chang`,
        description: description,
        openGraph: {
            title: `${title} | Dar Chang Machinery`,
            description: description,
        }
    };
}

export default async function MachineryCategoryPage({ params }: { params: Params }) {
    const { locale, category } = await params;
    const isRtl = locale === 'ar';
    const data = machineryData[category];

    if (!data) {
        notFound();
    }

    const title = locale === 'ar' ? data.title.ar : data.title.en;
    const description = locale === 'ar' ? data.description.ar : data.description.en;

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <Link
                        href="/portfolio/machinery"
                        className="inline-flex items-center gap-2 text-text-main hover:text-accent-gold transition-colors text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                        {isRtl ? "العودة إلى المعدات الثقيلة" : "Back to Heavy Machinery"}
                    </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 border border-border-subtle shadow-sm mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                        {title}
                    </h1>
                    <p className="text-lg text-text-main max-w-3xl">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.listings.map((listing, idx) => (
                        <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-gold transition-all duration-300 shadow-sm group">
                            <div className="relative h-64 w-full bg-bg-neutral overflow-hidden">
                                <Image
                                    src={listing.image}
                                    alt={`${listing.brand} ${listing.models}`}
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
                                <Link
                                    href="/quote"
                                    className="btn-primary"
                                >
                                    {isRtl ? "طلب تسعير" : "Request Quote"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
