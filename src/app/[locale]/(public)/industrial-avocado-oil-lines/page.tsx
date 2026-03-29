import { Metadata } from "next";
import { CheckCircle2, Factory, Settings, ShieldCheck, Thermometer, Droplets, Box, Activity, Layers, PenTool, Sprout } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const locale = params.locale;

    const BASE = 'https://www.darchangglobal.com'
    const isAr = locale === "ar"
    const title = isAr
        ? "خطوط إنتاج زيت الأفوكادو: حلول صناعية متكاملة | توريد مصانع"
        : "Extra Virgin Avocado Oil Extraction Lines | Global Sourcing"
    const description = isAr
        ? "حلول متكاملة لاستخلاص زيت الأفوكادو البكر الممتاز. طاقة إنتاجية 500 كجم/ساعة، تقنيات عصر بارد حاصلة على براءة اختراع، وأنظمة تحكم عالمية."
        : "End-to-end patented avocado oil extraction solutions. 500kg/h capacity, precision cold-press technology, and food grade 304 SS."
    return {
        title,
        description,
        keywords: isAr
            ? ["خط إنتاج زيت أفوكادو", "استخلاص زيت الأفوكادو", "عصر بارد", "معدات زيت طعام", "توريد مصانع الصين", "زيت أفوكادو بكر ممتاز", "تقنية الأمواج فوق الصوتية"]
            : ["Avocado oil processing line", "extra virgin avocado oil", "cold press extraction", "food-grade machinery", "China sourcing", "avocado oil decanter", "ultrasonic extraction"],
        openGraph: {
            title,
            description,
            url: `${BASE}/${isAr ? 'ar' : 'en'}/industrial-avocado-oil-lines`,
            siteName: isAr ? 'دار تشانغ العالمية' : 'Dar Chang Global',
            locale: isAr ? 'ar_SA' : 'en_US',
            type: 'website',
            images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: isAr ? 'خطوط زيت الأفوكادو — دار تشانغ' : 'Avocado Oil Lines — Dar Chang' }],
        },
        twitter: { card: 'summary_large_image' as const, title, images: [`${BASE}/hero-poster.png`] },
    };
}

export default async function IndustrialAvocadoOilLinesPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const isRtl = locale === 'ar';

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 leading-tight max-w-5xl" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "خطوط إنتاج زيت الأفوكادو: حلول صناعية متكاملة" : "Extra Virgin Avocado Oil: One-Stop Industrial Solutions"}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-accent-gold mb-6" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "تقنيات براءة اختراع | إدارة مشاريع 360 درجة | خبرة عالمية موثقة" : "Patented Technology | 360° Project Management | Global Expertise"}
                    </h2>
                    <p className="text-lg md:text-xl text-text-main leading-relaxed max-w-4xl" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ?
                            "نقدم حلولاً متكاملة لاستخلاص زيت الأفوكادو تبدأ من تخطيط المصنع وصولاً إلى ضبط جودة الزيت النهائي. أنظمتنا الحاصلة على براءة اختراع تضمن إنتاج زيت بكر ممتاز يحافظ على كافة العناصر الغذائية والنكهة الطبيعية للثمار." :
                            "We provide end-to-end, patented avocado oil solutions—from initial workshop planning to final quality control. Our systems are engineered to produce high-end edible oils through a process that preserves the fruit's natural nutrients, aroma, and flavor."}
                    </p>
                </div>

                {/* English Content */}
                {!isRtl && (
                    <div className="space-y-16">
                        <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
                            <h3 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                                <Settings className="text-accent-gold w-8 h-8" />
                                Technical Plant Specifications (CPAO-500 Update)
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
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Handling Capacity</td>
                                            <td className="p-4">500kg/h Avocado Fruits (≈ 350kg/h Pulp)</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Oil Recovery Rate</td>
                                            <td className="p-4">8% -- 10% yield based on fruit quality & variety</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Extraction Technology</td>
                                            <td className="p-4">Centrifuge Extraction with optional 2-phase separation</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Cold-Press Integrity</td>
                                            <td className="p-4">Precise control at 45°C -- 50°C for Extra Virgin Oil</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Machinery Power</td>
                                            <td className="p-4">46.5kW total installation power (Machinery)</td>
                                        </tr>
                                        <tr className="hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">System Durability</td>
                                            <td className="p-4">Food Grade Stainless Steel 304 (All contact parts)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">Enhanced Extraction Process Flow</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">1</span>
                                            <span className="text-text-main"><strong>Advanced Washing & Sterilization:</strong> Dual-action bubble soaking and jet cleaning with optional ozone sterilization to eliminate pesticide residues.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">2</span>
                                            <span className="text-text-main"><strong>Automated Destoning:</strong> Efficient separation of pulp from seeds and skin, with customizable settings to calibrate pigment composition.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">3</span>
                                            <span className="text-text-main"><strong>Ultrasonic Treatment (20kHz):</strong> NEW—Optional ultrasonic integration to further enhance oil release and improve nutrient retention.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">4</span>
                                            <span className="text-text-main"><strong>Thermal Malaxing:</strong> Continuous horizontal kneading in stainless steel jackets for even heating and optimal oil droplet formation.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">5</span>
                                            <span className="text-text-main"><strong>Centrifugal Decanting:</strong> High-speed separation utilizing ABB or Siemens VFD controls for maximum operational stability.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">6</span>
                                            <span className="text-text-main"><strong>Vertical Purification:</strong> Final polishing through disc stack separators to ensure moisture levels &lt; 0.3% and impurities &lt; 0.1%.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-bg-neutral p-8 rounded-2xl border border-accent-gold/50 shadow-inner">
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-2">
                                        <Sprout className="w-6 h-6 text-accent-gold" />
                                        Expanded Industrial Capabilities
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Physical Refining (RBWD):</strong> Specialized distillation for crude avocado oils to ensure high quality without the losses associated with chemical refining.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Waste Value Recovery:</strong> AWDS-series drying systems to convert pomace, stones, and skins into animal feed or pomace oil extraction.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Automated Bottling:</strong> Full-featured lines (1,000–1,500 bottles/hour) including nitrogen injection to extend shelf life.</span>
                                        </li>
                                    </ul>
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
                                المواصفات التقنية المحدثة (طراز CPAO-500)
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
                                            <td className="p-4">معالجة 500 كجم ثمار في الساعة (حوالي 350 كجم لب).</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">نسبة الاستخلاص</td>
                                            <td className="p-4">من 8% إلى 10% بناءً على نوع وجودة الثمار.</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">تقنية المعالجة</td>
                                            <td className="p-4">عصر بارد دقيق عند 45 إلى 50 درجة مئوية للزيت البكر الممتاز.</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">جودة التصنيع</td>
                                            <td className="p-4">كافة أجزاء ملامسة المنتج مصنوعة من الفولاذ المقاوم للصدأ 304 الغذائي.</td>
                                        </tr>
                                        <tr className="hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">المكونات الإلكترونية</td>
                                            <td className="p-4">أنظمة تحكم متطورة من شركات Siemens أو ABB أو Schneider.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">مسار الإنتاج المطور</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">1</span>
                                            <span className="text-text-main"><strong>الغسيل والتعقيم:</strong> غسيل بالفقاعات مع خيار التعقيم بالأوزون لتقليل بقايا المبيدات العضوية.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">2</span>
                                            <span className="text-text-main"><strong>نزع النوى المطور:</strong> فصل آلي دقيق مع إمكانية ضبط نسبة القشور للحفاظ على تركيبة الصبغة الطبيعية للزيت.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">3</span>
                                            <span className="text-text-main"><strong>المعالجة بالأمواج فوق الصوتية (20 كيلوهرتز):</strong> تحديث—دمج اختياري لتقنية الموجات الصوتية لزيادة كفاءة استخلاص الزيت.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">4</span>
                                            <span className="text-text-main"><strong>الفصل المركزي الفائق:</strong> استخدام أجهزة الطرد المركزي (Decanter) لضمان فصل الزيت عن المواد الصلبة والمياه النباتية بكفاءة تامة.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-primary-navy font-bold text-sm shrink-0">5</span>
                                            <span className="text-text-main"><strong>التنقية الرأسية:</strong> فواصل أقراص تضمن وصول نسبة الرطوبة لأقل من 0.3% والشوائب لأقل من 0.1%.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-bg-neutral p-8 rounded-2xl border border-accent-gold/50 shadow-inner">
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-2">
                                        <ShieldCheck className="w-6 h-6 text-accent-gold" />
                                        سجل الإنجازات والدعم العالمي
                                    </h3>
                                    <p className="text-text-main mb-6 italic">نفتخر بتصدير تقنياتنا إلى كبرى الدول المنتجة للأفوكادو، بما في ذلك المكسيك، وبيرو، وكينيا، وأوغندا، وإندونيسيا.</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>دعم فني ميداني:</strong> فرق مهندسين (صينيين ودوليين) للإشراف على التركيب والتشغيل والتدريب.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>ضمان ممتد:</strong> ضمان جودة يصل إلى 18 شهراً بعد التركيب أو 24 شهراً من تاريخ الشحن.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>حماية البيانات:</strong> نلتزم بأقصى درجات السرية لحماية أسراركم التجارية وتصاميم مصانعكم.</span>
                                        </li>
                                    </ul>
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
                        {isRtl ? "طلب استشارة هندسية للمصنع" : "Request a Plant Engineering Quote"}
                    </Link>
                </div>

            </div>
        </main>
    );
}
