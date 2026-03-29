import { Metadata } from "next";
import { CheckCircle2, Factory, Settings, ShieldCheck, Cpu, Droplets, Box, Activity, Layers, PenTool, Sprout } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const locale = params.locale;

    const BASE = 'https://www.darchangglobal.com'
    const isAr = locale === "ar"
    const title = isAr
        ? "نظام معالجة وفرز التمور الصناعي المتطور | معدات تصدير التمور"
        : "Industrial Date Processing & Automated Grading | Global Sourcing"
    const description = isAr
        ? "نظام متكامل لمعالجة وفرز التمور بالذكاء الاصطناعي وبطاقة إنتاجية 2.5-3.0 طن/ساعة. مكونات ألمانية وفرنسية (Siemens & Schneider) لضمان جودة التصدير العالمي."
        : "End-to-end industrial date processing and AI grading systems. 2.5–3.0 Tons/Hour with Siemens & Schneider electronics for global premium export standards."
    return {
        title,
        description,
        keywords: isAr
            ? ["خط معالجة تمور", "ماكينات فرز الذكاء الاصطناعي", "فرز التمور", "معدات تعبئة تمور", "فرز آلي", "توريد مصانع الصين", "تصدير التمور السعودية"]
            : ["Date processing line", "AI fruit sorting machinery", "automated date grading", "food-grade packaging", "Medjool processing", "Sukkari sorting", "premium export packaging"],
        openGraph: {
            title,
            description,
            url: `${BASE}/${isAr ? 'ar' : 'en'}/industrial-date-processing-lines`,
            siteName: isAr ? 'دار تشانغ العالمية' : 'Dar Chang Global',
            locale: isAr ? 'ar_SA' : 'en_US',
            type: 'website',
            images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: isAr ? 'خطوط معالجة التمور — دار تشانغ' : 'Date Processing Lines — Dar Chang' }],
        },
        twitter: { card: 'summary_large_image' as const, title, images: [`${BASE}/hero-poster.png`] },
    };
}

export default async function IndustrialDateProcessingPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const isRtl = locale === 'ar';

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 leading-tight max-w-5xl" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "نظام معالجة وفرز التمور الصناعي المتطور" : "Industrial Date Processing & Automated Grading System"}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-accent-gold mb-6" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "إنتاجية ضخمة | معالجة لطيفة | فرز دقيق" : "High-Capacity | Gentle Handling | Precision Grading"}
                    </h2>
                    <p className="text-lg md:text-xl text-text-main leading-relaxed max-w-4xl" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ?
                            "نقدم أنظمة متكاملة مصممة خصيصاً للتعامل مع التمور، تجمع بين المتانة الصناعية والتقنيات الإلكترونية المتقدمة لضمان مطابقة إنتاجكم لأعلى معايير التصدير العالمية." :
                            "We provide end-to-end processing solutions designed specifically for the delicate profile of dates. This system integrates heavy-duty industrial durability with high-precision electronics to ensure your produce meets the strictest global export standards."}
                    </p>
                </div>

                {/* English Content */}
                {!isRtl && (
                    <div className="space-y-16">
                        <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
                            <h3 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                                <Settings className="text-accent-gold w-8 h-8" />
                                Technical Specifications
                            </h3>
                            <div className="overflow-hidden rounded-xl border border-border-subtle shadow-sm mb-12">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-primary-navy text-white">
                                            <th className="p-4 font-bold border-b border-primary-navy/20">Feature</th>
                                            <th className="p-4 font-bold border-b border-primary-navy/20">Capability</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-text-main bg-white">
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Throughput Capacity</td>
                                            <td className="p-4">2.5 – 3.0 Tons Per Hour</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Grading Precision</td>
                                            <td className="p-4">4 Customizable Size Grades</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">System Power</td>
                                            <td className="p-4">4.13kW / 380V Industrial Supply</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Core Electronics</td>
                                            <td className="p-4">Siemens (Germany) & Schneider (France)</td>
                                        </tr>
                                        <tr className="hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">System Length</td>
                                            <td className="p-4">Approximately 8.5 Meters (8510mm)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">Multi-Stage Processing Flow</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">1</span>
                                            <span className="text-text-main"><strong>Dual-Action Cleaning:</strong> A combination of a bubble-soaking tank and a high-pressure spray bed with 25 soft nylon brushes to remove contaminants without damaging the skin.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">2</span>
                                            <span className="text-text-main"><strong>Rapid Air-Dry System:</strong> 4 specialized overhead blowers designed to remove surface moisture instantly, preparing the fruit for immediate grading.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">3</span>
                                            <span className="text-text-main"><strong>Mechanical Roller Sorting:</strong> A high-speed roller grading module featuring 4 distinct exits and soft buffer belts to minimize fruit impact and bruising.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">4</span>
                                            <span className="text-text-main"><strong>Intelligent Control:</strong> Centralized Schneider frequency converters allow operators to adjust the speed of the entire line to match seasonal volumes.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-bg-neutral p-8 rounded-2xl border border-accent-gold/50 shadow-inner">
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-2">
                                        <Cpu className="w-6 h-6 text-accent-gold" />
                                        Premium Upgrade: AI-Powered Inspection
                                    </h3>
                                    <p className="text-text-main mb-6 italic">For operations targeting ultra-premium markets, we offer optional Artificial Intelligence integration to replace or enhance manual inspection.</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Visual Analysis:</strong> AI cameras sort dates by color consistency and complex geometric shapes.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Internal Quality Sensing:</strong> Optional NIRS (Near-Infrared) sensors to detect inner defects, moisture levels, and sugar content (Brix) without harming the fruit.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Data Driven Accuracy:</strong> Intelligent algorithms that learn to identify specific date varieties (e.g., Medjool, Sukkari) for 100% sorting consistency.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-border-subtle">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 bg-accent-gold/10 inline-block px-4 py-2 rounded-lg">Project & Logistics Support</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Box className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">Delivery</h4>
                                        <p className="text-text-main text-sm">25–30 working days from our Shanghai-affiliated facilities.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <PenTool className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">Warranty</h4>
                                        <p className="text-text-main text-sm">One-year comprehensive warranty with on-site or online training support.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <ShieldCheck className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">Global Access</h4>
                                        <p className="text-text-main text-sm">Managed through our network in Shanghai, Makkah, and Dubai.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* Arabic Content */}
                {isRtl && (
                    <div className="space-y-16" dir="rtl">
                        <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
                            <h3 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                                <Settings className="text-accent-gold w-8 h-8" />
                                المواصفات التقنية الرئيسية
                            </h3>
                            <div className="overflow-hidden rounded-xl border border-border-subtle shadow-sm mb-12">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="bg-primary-navy text-white">
                                            <th className="p-4 font-bold border-b border-primary-navy/20">المواصفة</th>
                                            <th className="p-4 font-bold border-b border-primary-navy/20">التفاصيل</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-text-main bg-white">
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">الطاقة الإنتاجية</td>
                                            <td className="p-4">2.5 إلى 3 طن في الساعة.</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">دقة التصنيف</td>
                                            <td className="p-4">4 فئات أحجام قابلة للتخصيص بالكامل.</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">المكونات الحيوية</td>
                                            <td className="p-4">أنظمة تحكم من شركة Siemens الألمانية و Schneider الفرنسية.</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">طول النظام</td>
                                            <td className="p-4">حوالي 8.5 متر لضمان معالجة وافية ومريحة للثمار.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">مراحل العمل الميدانية</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">1</span>
                                            <span className="text-text-main"><strong>التنظيف المزدوج:</strong> نظام نقع بالفقاعات مع سرير مكون من 25 فرشاة ناعمة ورشاشات ضغط عالٍ لإزالة الأتربة مع الحفاظ على سلامة القشرة.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">2</span>
                                            <span className="text-text-main"><strong>التجفيف السريع:</strong> 4 منافيخ هوائية صناعية علوية لإزالة الرطوبة تماماً وبسرعة قبل مرحلة الفرز.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">3</span>
                                            <span className="text-text-main"><strong>الفرز الأسطواني:</strong> وحدة فرز عالية السرعة بـ 4 مخارج مزودة بأحزمة مبطنة لمنع تكدس أو تضرر الثمار.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">4</span>
                                            <span className="text-text-main"><strong>التحكم الذكي:</strong> إمكانية ضبط سرعة الخط بالكامل عبر محولات تردد Schneider لتناسب ضغط العمل الموسمي.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-bg-neutral p-8 rounded-2xl border border-accent-gold/50 shadow-inner">
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-2">
                                        <Cpu className="w-6 h-6 text-accent-gold" />
                                        إضافة ذكية: الفرز المتقدم بالذكاء الاصطناعي
                                    </h3>
                                    <p className="text-text-main mb-6 italic">للشركات التي تستهدف أسواق النخبة، نوفر إمكانية دمج أنظمة الذكاء الاصطناعي (AI) لرفع دقة التصنيف وتقليل الاعتماد على العنصر البشري.</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>التحليل البصري:</strong> فرز التمور بناءً على تدرج اللون وتطابق الشكل الهندسي بدقة متناهية.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>كشف الجودة الداخلية:</strong> تقنية اختيارية للكشف عن العيوب الداخلية ونسبة السكر (Brix) دون المساس بالثمرة.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>خوارزميات التعلم:</strong> أنظمة ذكية تتعرف على أنواع التمور المختلفة (مثل السكري والمجدول) لضمان جودة موحدة لكل شحنة.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-border-subtle">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 bg-accent-gold/10 inline-block px-4 py-2 rounded-lg">الدعم اللوجستي</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Box className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">الشحن والتسليم</h4>
                                        <p className="text-text-main text-sm">25 إلى 30 يوم عمل من منشآتنا التصنيعية المرتبطة في شنغهاي.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <ShieldCheck className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">الدعم الفني والضمان</h4>
                                        <p className="text-text-main text-sm">ضمان شامل لمدة عام مع دعم تدريبي في الموقع أو عبر الإنترنت.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Factory className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">وصول عالمي</h4>
                                        <p className="text-text-main text-sm">تنسيق الشحن والتركيب مباشرة من مكاتبنا في دبي، مكة، وشنغهاي.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/quote?type=production_line"
                        className="bg-accent-gold text-primary-navy px-10 py-5 rounded-full font-bold text-lg hover:bg-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                        dir={isRtl ? "rtl" : "ltr"}
                    >
                        {isRtl ? "طلب نظام معالجة لعملك" : "Request a Processing Line Quote"}
                    </Link>
                </div>

            </div>
        </main>
    );
}
