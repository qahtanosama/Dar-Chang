import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { ShieldCheck, Lock, Globe, Server, UserCheck, FileText } from 'lucide-react';

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const locale = params.locale;

    if (locale === 'ar') {
        return {
            title: 'سياسة الخصوصية وأمن البيانات | دار تشانغ',
            description: 'نحن ندرك أن أسراركم التجارية هي رأس مالكم. تضمن سياستنا حماية بياناتكم بمعايير GDPR وتوفير الشفافية الكاملة.',
        };
    }

    return {
        title: 'Privacy & Data Security | Dar Chang',
        description: 'We prioritize your trade secrets. Our policy ensures global GDPR compliance while maintaining transparency for international trade.',
    };
}

export default function PrivacyPage() {
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header Section */}
                <div className={`text-center mb-16 ${isRtl ? 'rtl' : 'ltr'}`}>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm mb-6 border border-border-subtle">
                        <ShieldCheck className="w-10 h-10 text-accent-gold" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
                        {isRtl ? "سياسة الخصوصية وأمن البيانات" : "Privacy & Data Security"}
                    </h1>
                    <p className="text-xl text-text-main leading-relaxed max-w-3xl mx-auto">
                        {isRtl
                            ? "نحن ندرك أن أسراركم التجارية هي رأس مالكم؛ لذا فإن حمايتها هي أولويتنا القصوى كما نحمي أسرارنا تماماً. تضمن سياستنا الشفافية المطلقة والامتثال للمعايير الدولية (GDPR)."
                            : "We prioritize your trade secrets as much as our own. Our policy ensures global compliance (GDPR) while maintaining the transparency required for international trade."}
                    </p>
                </div>

                {/* Content Section */}
                <div className={`space-y-12 ${isRtl ? 'rtl' : 'ltr'}`}>

                    {/* Section 1 */}
                    <section className="bg-white rounded-3xl p-8 md:p-10 border border-border-subtle shadow-sm">
                        <h2 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-bg-neutral text-accent-gold text-lg">1</span>
                            {isRtl ? "البيانات التي نجمعها (لخدمتكم باحترافية)" : "Data We Collect (For Service Excellence)"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors">
                                <FileText className="w-6 h-6 text-primary-navy mb-4" />
                                <h3 className="font-bold text-primary-navy mb-2">{isRtl ? "البيانات التشغيلية" : "Operational Data"}</h3>
                                <p className="text-text-main text-sm leading-relaxed">
                                    {isRtl ? "نجمع فقط المعلومات الضرورية التي تخدم عمليات التوريد والخدمات اللوجستية الخاصة بكم." : "We only collect information necessary to fulfill your sourcing and logistics requirements."}
                                </p>
                            </div>
                            <div className="p-6 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors">
                                <Globe className="w-6 h-6 text-primary-navy mb-4" />
                                <h3 className="font-bold text-primary-navy mb-2">{isRtl ? "تحسين التجربة الرقمية" : "Technical Insights"}</h3>
                                <p className="text-text-main text-sm leading-relaxed">
                                    {isRtl ? "نستخدم ملفات تعريف الارتباط (Cookies) لتحسين أداء الموقع وتفعيل الـ SEO، مما يضمن وصول أهم تحديثات السوق الصيني إليكم بدقة." : "Website cookies are used to optimize your browsing experience and ensure our SEO delivers the most relevant market updates to you."}
                                </p>
                            </div>
                            <div className="p-6 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors">
                                <UserCheck className="w-6 h-6 text-primary-navy mb-4" />
                                <h3 className="font-bold text-primary-navy mb-2">{isRtl ? "التواصل الفعال" : "Communication"}</h3>
                                <p className="text-text-main text-sm leading-relaxed">
                                    {isRtl ? "تُستخدم بيانات الاتصال حصرياً لإرسال تحديثات مشاريعكم عبر البريد الإلكتروني، WeChat، أو WhatsApp." : "Your contact details are used exclusively for project updates via WeChat, Email, or WhatsApp."}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white rounded-3xl p-8 md:p-10 border border-border-subtle shadow-sm relative overflow-hidden">
                        <div className={`absolute top-0 w-2 h-full bg-accent-gold ${isRtl ? 'right-0' : 'left-0'}`}></div>
                        <h2 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3 pl-4 rtl:pl-0 rtl:pr-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-bg-neutral text-accent-gold text-lg">2</span>
                            {isRtl ? 'ضمان "صفر مخاطر" لبياناتكم' : 'Your "Zero-Risk" Guarantee'}
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <ShieldCheck className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary-navy mb-2">{isRtl ? "سرية الموردين والأسعار" : "No Third-Party Sharing"}</h3>
                                    <p className="text-text-main">{isRtl ? "نلتزم بعدم مشاركة قوائم الموردين، تفاصيل الأسعار، أو التصاميم الخاصة بكم مع أي طرف ثالث أو منافس." : "We never sell your supplier lists, pricing, or proprietary designs to competitors."}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <Server className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary-navy mb-2">{isRtl ? "تخزين مشفر" : "Encrypted Storage"}</h3>
                                    <p className="text-text-main">{isRtl ? "تُحفظ كافة العقود وتقارير الفحص الهندسي على خوادم آمنة ومشفرة لضمان عدم الوصول غير المصرح به." : "All contract and audit documents are stored on secure, encrypted servers."}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <Lock className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary-navy mb-2">{isRtl ? "حق الحذف الفوري" : "On-Demand Deletion"}</h3>
                                    <p className="text-text-main">{isRtl ? "لديكم الحق الكامل في طلب حذف كافة بياناتكم التجارية من أنظمتنا بشكل نهائي في أي وقت." : "You have the right to request the permanent deletion of your business data at any time."}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-primary-navy text-white rounded-3xl p-8 md:p-10 border border-primary-navy shadow-lg relative overflow-hidden">
                        <Globe className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5" />
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-accent-gold text-lg">3</span>
                            {isRtl ? "الامتثال القانوني والدولي" : "International Compliance"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <h3 className="font-bold text-accent-gold mb-3 flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    {isRtl ? "تواجدنا في شنغهاي" : "Shanghai Presence"}
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    {isRtl ? "كشركة رسمية مسجلة في شنغهاي، نجمع بين الالتزام بالقوانين الصينية والمعايير الدولية لحماية خصوصية عملائنا العالميين." : "As a registered entity in Shanghai, we adhere to both Chinese data regulations and international privacy standards for our global clients."}
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <h3 className="font-bold text-accent-gold mb-3 flex items-center gap-2">
                                    <UserCheck className="w-5 h-5" />
                                    {isRtl ? "فريقنا هو حارس بياناتكم" : "Transparency"}
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    {isRtl ? "يعمل خبراؤنا الصينيون والدوليون كأمناء على بياناتكم، لضمان الحماية القانونية الكاملة لمصالحكم عبر الحدود." : "Our team of Chinese and international experts acts as your data custodians, ensuring full legal protection across borders."}
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
