import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Factory, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const locale = (await props.params).locale;
    const BASE = 'https://www.darchangglobal.com'
    const isAr = locale === 'ar'
    const title = isAr
        ? "خطوط الإنتاج الصناعية | فرز التمور، الأفوكادو، زيت الأفوكادو | دار تشانغ"
        : "Industrial Production Lines | Date Grading, Avocado Oil & Sorting | Dar Chang"
    const description = isAr
        ? "نوفر خطوط إنتاج متكاملة لفرز التمور، معالجة الفاكهة الطازجة، واستخلاص زيت الأفوكادو بتقنية العصر البارد."
        : "End-to-end industrial processing systems: automated date grading (3T/H), avocado fruit sorting, and patented extra virgin avocado oil extraction (CPAO-500)."
    return {
        title,
        description,
        keywords: isAr
            ? ["خطوط إنتاج", "فرز التمور", "معالجة الأفوكادو", "زيت أفوكادو بكر", "آلات فرز ثمار"]
            : ["production lines China", "date processing machine", "avocado sorting line", "avocado oil extraction", "industrial grading system"],
        openGraph: {
            title,
            description,
            url: `${BASE}/${isAr ? 'ar' : 'en'}/portfolio/production-line`,
            siteName: isAr ? 'دار تشانغ العالمية' : 'Dar Chang Global',
            locale: isAr ? 'ar_SA' : 'en_US',
            type: 'website',
            images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: isAr ? 'خطوط الإنتاج — دار تشانغ' : 'Production Lines — Dar Chang' }],
        },
        twitter: { card: 'summary_large_image' as const, title, images: [`${BASE}/hero-poster.png`] },
    };
}

export default function ProductionLinePage() {
    const locale = useLocale();
    const isRtl = locale === "ar";

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-text-main hover:text-accent-gold transition-colors text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                        {isRtl ? "العودة إلى المنتجات" : "Back to Products"}
                    </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-16 border border-border-subtle shadow-sm flex flex-col mb-12">
                    <div className="flex flex-col items-center md:items-start text-center md:text-start mb-12">
                        <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                            <Factory className="w-10 h-10 text-accent-gold" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
                            {isRtl ? "خطوط الإنتاج والتصنيع" : "Production Lines & Manufacturing"}
                        </h1>
                        <p className="text-lg text-text-main max-w-4xl leading-relaxed">
                            {isRtl
                                ? "نوفر أنظمة تصنيع آلية شاملة، مصممة بدقة لرفع الكفاءة والإنتاجية وفقاً لأعلى المعايير الصناعية العالمية."
                                : "We provide comprehensive automated manufacturing systems, precisely engineered to elevate efficiency and throughput according to the highest global industrial standards."}
                        </p>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-primary-navy mb-8 text-center md:text-start" dir={isRtl ? 'rtl' : 'ltr'}>{isRtl ? "محفظة المعدات" : "Available Systems"}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
                            <Link href="/industrial-fruit-sorting-lines" className="group flex flex-col items-center bg-bg-neutral rounded-3xl border border-border-subtle p-8 hover:shadow-lg transition-all hover:border-accent-gold cursor-pointer h-full">
                                <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Factory className="w-10 h-10 text-primary-navy group-hover:text-accent-gold transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors text-center">
                                    {isRtl ? "خطوط معالجة وفرز الفاكهة الطازجة" : "Industrial Fruit Sorting Lines"}
                                </h3>
                                <p className="text-text-main text-sm text-center flex-grow mb-8 leading-relaxed max-w-xs">
                                    {isRtl ? "أنظمة آلية لغسيل وتجفيف وتشميع وفرز الأفوكادو وغيرها من الخضروات." : "Automated systems for washing, drying, waxing, and weight grading of avocado and fresh produce."}
                                </p>
                                <div className="mt-auto flex items-center justify-center text-accent-gold font-bold text-sm gap-2">
                                    {isRtl ? "عرض التفاصيل" : "View Details"}
                                    <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-0' : 'rotate-180'}`} />
                                </div>
                            </Link>

                            <Link href="/industrial-date-processing-lines" className="group flex flex-col items-center bg-bg-neutral rounded-3xl border border-border-subtle p-8 hover:shadow-lg transition-all hover:border-accent-gold cursor-pointer h-full">
                                <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Factory className="w-10 h-10 text-primary-navy group-hover:text-accent-gold transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors text-center">
                                    {isRtl ? "نظام معالجة وفرز التمور الصناعي المتطور" : "Industrial Date Processing & Automated Grading"}
                                </h3>
                                <p className="text-text-main text-sm text-center flex-grow mb-8 leading-relaxed max-w-xs">
                                    {isRtl ? "إنتاجية ضخمة تصل إلى 3 طن/ساعة مع خيارات فرز الذكاء الاصطناعي للتمور الفاخرة." : "High-capacity systems up to 3 Tons/Hour with optional AI grading for premium dates."}
                                </p>
                                <div className="mt-auto flex items-center justify-center text-accent-gold font-bold text-sm gap-2">
                                    {isRtl ? "عرض التفاصيل" : "View Details"}
                                    <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-0' : 'rotate-180'}`} />
                                </div>
                            </Link>

                            <Link href="/industrial-avocado-oil-lines" className="group flex flex-col items-center bg-bg-neutral rounded-3xl border border-border-subtle p-8 hover:shadow-lg transition-all hover:border-accent-gold cursor-pointer h-full">
                                <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Factory className="w-10 h-10 text-primary-navy group-hover:text-accent-gold transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors text-center">
                                    {isRtl ? "خطوط إنتاج زيت الأفوكادو الصناعية" : "Extra Virgin Avocado Oil Production Lines"}
                                </h3>
                                <p className="text-text-main text-sm text-center flex-grow mb-8 leading-relaxed max-w-xs">
                                    {isRtl ? "حلول متكاملة لاستخلاص الزيت بعصر بارد بطاقة 500 كجم/ساعة." : "End-to-end patented cold-press extraction solutions with 500kg/h capacity."}
                                </p>
                                <div className="mt-auto flex items-center justify-center text-accent-gold font-bold text-sm gap-2">
                                    {isRtl ? "عرض التفاصيل" : "View Details"}
                                    <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-0' : 'rotate-180'}`} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-border-subtle pt-12 flex flex-col sm:flex-row justify-between items-center gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
                        <p className="text-text-main font-semibold text-center sm:text-start">
                            {isRtl ? "هل تحتاج إلى خط إنتاج مخصص لمنشأتك؟" : "Need a custom production line for your facility?"}
                        </p>
                        <Link
                            href="/quote?type=production_line"
                            className="bg-accent-gold text-primary-navy px-8 py-4 rounded-full font-bold text-center hover:bg-white border-2 border-transparent transition-colors shadow-lg"
                        >
                            {isRtl ? "طلب استشارة هندسية" : "Request Engineering Consultation"}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
