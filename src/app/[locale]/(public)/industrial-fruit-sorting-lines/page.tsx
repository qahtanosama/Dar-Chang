import { Metadata } from "next";
import { CheckCircle2, Factory, Settings, ShieldCheck, Thermometer, Droplets, Box, Activity, Layers, PenTool } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const locale = params.locale;

    if (locale === "ar") {
        return {
            title: "خطوط تعبئة وفرز الفاكهة الطازجة | حلول التوريد الصناعية المعتمدة",
            description: "خطوط معالجة صناعية متطورة للفواكه والخضروات. طاقة إنتاجية 50,000 وحدة/ساعة، مكونات شنايدر العالمية، وفولاذ 304. حلول مخصصة للتصدير العالمي.",
            keywords: ["خط معالجة أفوكادو", "ماكينات فرز فاكهة", "معدات تعبئة وتغليف", "فرز وزني آلي", "توريد مصانع الصين", "تصدير خضروات طازجة"],
        };
    }

    return {
        title: "Industrial Fruit Sorting Lines | Dar Chang Sourcing",
        description: "High-efficiency automated grading and packaging. Up to 50,000 units/hour, Schneider components, and Food-grade 304 SS. Global export standards.",
        keywords: ["Avocado processing line", "fruit sorting machinery", "automated grading", "food-grade packaging", "China sourcing", "fresh produce export packaging"],
    };
}

export default async function IndustrialFruitSortingLinesPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const isRtl = locale === 'ar';

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 leading-tight max-w-5xl" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "خطوط معالجة الفاكهة الطازجة الصناعية المخصصة" : "Industrial Avocado & Fresh Produce Processing Lines"}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-accent-gold mb-6" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "حلول فرز وتعبئة آلية عالية الكفاءة" : "High-Efficiency Automated Grading & Packaging"}
                    </h2>
                    <p className="text-lg md:text-xl text-text-main leading-relaxed max-w-4xl" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ?
                            "نقدم أنظمة معالجة متكاملة مصممة خصيصاً لتلبية معايير التصدير العالمية للفواكه والخضروات. تركز حلولنا الهندسية على الحفاظ على سلامة المنتج مع تحقيق إنتاجية ضخمة تلبي احتياجات الأسواق الكبرى في الخليج وأوروبا." :
                            "We provide end-to-end processing ecosystems tailored for the global export of fresh fruits and vegetables. Our engineering focuses on maintaining produce integrity while achieving industrial-scale throughput for the most demanding markets."}
                    </p>
                </div>

                {/* English Content */}
                {!isRtl && (
                    <div className="space-y-16">
                        <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
                            <h3 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                                <Settings className="text-accent-gold w-8 h-8" />
                                Key Technical Specifications
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
                                            <td className="p-4">Up to 50,000 units per hour</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Grading Precision</td>
                                            <td className="p-4">12 distinct weight categories</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Weight Range</td>
                                            <td className="p-4">50g to 800g per unit</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Primary Material</td>
                                            <td className="p-4">Food-grade Stainless Steel 304 (product contact areas)</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Power System</td>
                                            <td className="p-4">23kW / 380V Industrial Supply</td>
                                        </tr>
                                        <tr className="hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Global Components</td>
                                            <td className="p-4">Schneider Electronics & Italy Riello Burners</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">Engineered for Maximum Customization</h3>
                                    <p className="text-text-main mb-6">Our modular systems are designed to adapt to your specific operational footprint and seasonal demands:</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Multi-Crop Versatility:</strong> Optimized for avocados, but features soft-material brushes and adjustable sprayers proven for sweet potatoes and other delicate vegetables.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Layers className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Layout Flexibility:</strong> Custom footprints available, including L-shaped configurations (17.5m x 16.1m), to fit existing warehouse dimensions.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Activity className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Operational Control:</strong> Integrated Schneider frequency converters allow operators to adjust line speed to match seasonal harvest volumes.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Droplets className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Adaptive Waxing:</strong> Physically adjustable waxing modules to control dwell time based on produce variety and required finish.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Thermometer className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>Thermal Efficiency:</strong> Closed-heat cycle drying (35°C to 45°C) configurable for natural gas or diesel fuel.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">Comprehensive Processing Stages</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">1</span>
                                            <span className="text-text-main"><strong>Dual-Action Washing:</strong> Bubble soaking and high-pressure sprayers for deep contaminant removal.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">2</span>
                                            <span className="text-text-main"><strong>Gentle Air-Dry:</strong> 16 industrial blowers and 25 soft nylon brushes to remove surface moisture without bruising.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">3</span>
                                            <span className="text-text-main"><strong>360° Manual Inspection:</strong> Specialized roller beds that rotate produce for total visibility of defects.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">4</span>
                                            <span className="text-text-main"><strong>Uniform Waxing:</strong> Intermittent spray system with 14 horsehair brushes for a premium, protective finish.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">5</span>
                                            <span className="text-text-main"><strong>Electronic Weight Sorting:</strong> High-precision PLC-controlled grading ensuring consistent packaging standards for export.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-border-subtle">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 bg-accent-gold/10 inline-block px-4 py-2 rounded-lg">Project Support & Global Logistics</h3>
                                <p className="text-lg text-text-main mb-6">We manage the technical complexity of international delivery and setup to ensure your facility is operational within 40 working days.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Box className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">Shipping</h4>
                                        <p className="text-text-main text-sm">Optimized 2x 40HQ container loading plans for secure transit.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <PenTool className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">Service</h4>
                                        <p className="text-text-main text-sm">Professional on-site installation and a one-year comprehensive warranty.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Factory className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">Lead Time</h4>
                                        <p className="text-text-main text-sm">Standard manufacturing duration of 40 working days.</p>
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
                                            <th className="p-4 font-bold border-b border-primary-navy/20">القدرة التشغيلية</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-text-main bg-white">
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">طاقة الإنتاج</td>
                                            <td className="p-4">تصل إلى 50,000 وحدة في الساعة</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">دقة الفرز</td>
                                            <td className="p-4">12 فئة وزن مستقلة لضمان التجانس</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">نطاق الوزن</td>
                                            <td className="p-4">من 50 جرام إلى 800 جرام للوحدة</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">المادة الأساسية</td>
                                            <td className="p-4">فولاذ مقاوم للصدأ 304 (مطابق للمعايير الغذائية)</td>
                                        </tr>
                                        <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">نظام الطاقة</td>
                                            <td className="p-4">23 كيلوواط / 380 فولت (تغذية صناعية)</td>
                                        </tr>
                                        <tr className="hover:bg-bg-neutral transition-colors">
                                            <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">المكونات العالمية</td>
                                            <td className="p-4">إلكترونيات Schneider وموقدات Riello الإيطالية</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">مزايا التخصيص الهندسي</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>تعدد المحاصيل:</strong> نظام مرن محسّن للأفوكادو ومثبت الكفاءة للبطاطا الحلوة والخضروات الحساسة.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Layers className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>مرونة التخطيط:</strong> تصميمات مخصصة (مثل حرف L بـ 17.5m x 16.1m) لتناسب مساحة مستودعك الحالية.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Activity className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>تحكم تشغيلي كامل:</strong> محولات تردد من شركة Schneider لضبط سرعة الخط بما يتناسب مع حجم المحصول الموسمي.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Thermometer className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-text-main"><strong>كفاءة حرارية:</strong> نظام تجفيف بدورة مغلقة (35°م – 45°م) يعمل بالغاز الطبيعي أو الديزل لتقليل استهلاك الطاقة.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-primary-navy mb-6">مراحل المعالجة الشاملة</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">1</span>
                                            <span className="text-text-main"><strong>الغسيل المزدوج:</strong> نقع بالفقاعات مع رشاشات ضغط عالي لضمان إزالة كافة الملوثات بعمق.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">2</span>
                                            <span className="text-text-main"><strong>التجفيف الهوائي اللطيف:</strong> استخدام 16 منفاخاً صناعياً و25 فرشاة نايلون ناعمة لتجفيف السطح دون الإضرار بالقشرة.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">3</span>
                                            <span className="text-text-main"><strong>الفحص بزاوية 360 درجة:</strong> أسطوانات دوارة تضمن الرؤية الكاملة للمنتج لاستبعاد العيوب يدوياً بدقة.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">4</span>
                                            <span className="text-text-main"><strong>التشميع الموحد:</strong> نظام رش متطور بـ 14 فرشاة شعر حصاني لمنح المنتج طبقة حماية ومظهراً جذاباً.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-neutral text-primary-navy font-bold text-sm shrink-0">5</span>
                                            <span className="text-text-main"><strong>الفرز الإلكتروني بالوزن:</strong> نظام PLC عالي الدقة يضمن تعبئة المنتجات وفق معايير الأسواق الدولية.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-border-subtle">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 bg-accent-gold/10 inline-block px-4 py-2 rounded-lg">الدعم اللوجستي وضمان الاستمرارية</h3>
                                <p className="text-lg text-text-main mb-6">من مكاتبنا في شنغهاي ومكة ودبي، ندير التعقيدات اللوجستية لضمان وصول وتركيب خط الإنتاج الخاص بك.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Box className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">شحن احترافي</h4>
                                        <p className="text-text-main text-sm">خطط تحميل محسّنة لحاويتين 40HQ لتقليل تكاليف النقل.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <ShieldCheck className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">دعم ميداني</h4>
                                        <p className="text-text-main text-sm">فريق مهندسين دوليين للتركيب في الموقع مع ضمان شامل لمدة عام واحد.</p>
                                    </div>
                                    <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle flex flex-col items-center text-center">
                                        <Factory className="w-8 h-8 text-primary-navy mb-4" />
                                        <h4 className="font-bold text-primary-navy mb-2">الجدول الزمني</h4>
                                        <p className="text-text-main text-sm">مدة تصنيع قياسية تبلغ 40 يوم عمل لضمان الجاهزية الموسمية.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/quote"
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
