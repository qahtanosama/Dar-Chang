import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Armchair, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    if (locale === "ar") {
        return {
            title: "توريد أثاث فنادق – FF&E | خدمات التوريد والمعدات الصناعية",
            description: "خدمات توريد وتجهيز أثاث الفنادق الشاملة (FF&E) – من غرف النزلاء إلى الردهات والمطاعم. نوفر حلول خشبية فاخرة وتجارية مع إدارة كاملة للوجستيات الدولية.",
            keywords: "أثاث فنادق، توريد أثاث فندقي، FF&E فنادق، تأثيث غرف فندقية، أثاث مطاعم فنادق، تجهيز فندق، BOQ فنادق، أثاث ردهة فندق، أثاث فاخر",
        };
    }

    return {
        title: "Turnkey Hospitality FF&E Sourcing | Dar Chang",
        description: "Full-scale sourcing of Furniture, Fixtures & Equipment for hospitality projects.",
    };
}

export default function FFEPage() {
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

                {isRtl ? (
                    // Rich Arabic Content Layout
                    <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-border-subtle shadow-sm">
                        <div className="flex flex-col items-center md:items-start text-center md:text-right mb-12">
                            <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                <Armchair className="w-10 h-10 text-accent-gold" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 leading-tight">
                                توريد وتأثيث الفنادق – FF&E الشامل
                            </h1>
                            <h2 className="text-xl md:text-2xl text-accent-gold font-semibold mb-6">
                                حلول ديكور داخلي مخصصة | تجهيز كامل للفنادق | درجة فاخرة وتجارية
                            </h2>
                            <p className="text-lg text-text-main leading-relaxed max-w-4xl text-right">
                                نقدم خدمات توريد وإدارة تشغيلية شاملة لمشاريع الفنادق الكبرى. تكمن خبرتنا في تحويل جداول الكميات المعمارية (BOQ) إلى بيئات مُؤثّثة بالكامل وجاهزة للضيوف، مع التركيز على المتانة والتشطيبات الراقية.
                            </p>
                        </div>

                        <div className="border-t border-border-subtle pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Category 1 */}
                            <div>
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-accent-gold rounded-full block"></span>
                                    الفئات الأساسية
                                </h3>
                                <p className="text-text-main mb-6">ندير عمليات الشراء والخدمات اللوجستية لكل منطقة في المبنى الفندقي:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>غرف النزلاء:</strong> طقم كامل يشمل أسرّة King/Twin ولوحات رأسية وطاولات جانبية وخزائن</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>مساحات المعيشة:</strong> كراسي مكتب مريحة، أرائك صالة، وطاولات قهوة</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>المناطق العامة:</strong> الأثاث للردهات والمناطق ذات الحركة العالية</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>قاعات الطعام:</strong> كراسي وأثاث مطاعم متين وتجهيزات للمآدب</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Category 2 */}
                            <div>
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-accent-gold rounded-full block"></span>
                                    الخبرة التقنية
                                </h3>
                                <p className="text-text-main mb-6">نوفر مستويات مختلفة من المواد لتتناسب مع ميزانية المشروع ومتطلبات المتانة:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>الخشب الفاخر:</strong> حلول ألواح متعددة الطبقات للأجنحة الفاخرة</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>اللوح الحبيبي:</strong> حلول عالية الأداء وفعالة للفنادق التجارية</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>التكامل العالي:</strong> مفصلات ناعمة الإغلاق، وتنجيد مخصص بمعايير دولية</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Category 3 */}
                            <div className="bg-bg-neutral rounded-2xl p-8 border border-border-subtle">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                                    ميزة التوريد
                                </h3>
                                <p className="text-sm text-accent-gold/80 mb-6 font-semibold uppercase tracking-wider">نموذج: مشروع لمار</p>
                                <p className="text-text-main mb-6">تجربتنا التشغيلية مثبتة من خلال إدارة الطلبات المعقدة:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>دقة BOQ:</strong> ترجمة القوائم التفصيلية لأوامر تصنيع دقيقة</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>طاقة حجمية:</strong> إدارة أثاث فنادق متعددة الطوابق بالكامل</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>لوجستيات عالمية:</strong> توحيد مئات وحدات SKU في شحنات مبسّطة</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-text-main font-semibold">جاهز لبدء تجهيز مشروعك الفندقي؟</p>
                            <Link
                                href="/quote"
                                className="btn-primary"
                            >
                                طلب تسعير المشروع
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Rich English Content Layout
                    <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-border-subtle shadow-sm">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-12">
                            <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                <Armchair className="w-10 h-10 text-accent-gold" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 leading-tight">
                                Turnkey Hospitality FF&E Sourcing
                            </h1>
                            <h2 className="text-xl md:text-2xl text-accent-gold font-semibold mb-6">
                                Bespoke Interior Solutions | Full Hotel Building Fit-Outs | Luxury & Commercial Grades
                            </h2>
                            <p className="text-lg text-text-main leading-relaxed max-w-4xl text-left">
                                We provide comprehensive sourcing and operational management for large-scale hotel projects. Our expertise lies in transforming architectural Bill of Quantities (BOQ) into fully furnished, guest-ready environments with a focus on durability and premium finishes.
                            </p>
                        </div>

                        <div className="border-t border-border-subtle pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
                            {/* Category 1 */}
                            <div>
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-accent-gold rounded-full block"></span>
                                    Core Categories
                                </h3>
                                <p className="text-text-main mb-6">We manage the procurement and logistics for every area of a hotel building:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Guest Room Collections:</strong> Complete sets including King/Twin beds, upholstered headboards, bedside tables, and integrated wardrobes.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Living & Workspaces:</strong> Ergonomic desk chairs, lounge sofas, luggage racks, and coffee tables tailored to room dimensions.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Public Area & Lobby:</strong> High-traffic seating solutions, decorative consoles, and reception area fit-outs.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Dining & Restaurant:</strong> Durable dining chairs, tables, and banquet furniture.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Category 2 */}
                            <div>
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-accent-gold rounded-full block"></span>
                                    Technical Expertise
                                </h3>
                                <p className="text-text-main mb-6">We offer various material tiers to match the project's budget and durability requirements:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Premium Solid Wood:</strong> Multilayer board solutions for high-end luxury suites.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>High-Performance Particleboard:</strong> Cost-effective, durable solutions for commercial and mid-scale hotels.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Hardware & Integration:</strong> Soft-close hinges, reinforced joints, and custom upholstery that meet international hospitality standards.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Category 3 */}
                            <div className="bg-bg-neutral rounded-2xl p-8 border border-border-subtle">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                                    The Sourcing Advantage
                                </h3>
                                <p className="text-sm text-accent-gold/80 mb-6 font-semibold uppercase tracking-wider">Case: Lamar Project</p>
                                <p className="text-text-main mb-6">Our operational experience is proven through the management of complex, high-volume orders:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>BOQ Precision:</strong> We translate detailed itemized lists—from decorative wall panels to vanity units—into precise manufacturing orders.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Volume Capacity:</strong> Experience managing furniture for entire multi-story hotel buildings.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                        <span className="text-text-main"><strong>Global Logistics:</strong> We handle the consolidation of hundreds of unique SKUs into streamlined container shipments.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-text-main font-semibold">Ready to equip your hospitality project?</p>
                            <Link
                                href="/quote"
                                className="btn-primary"
                            >
                                Request a Project Quote
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
