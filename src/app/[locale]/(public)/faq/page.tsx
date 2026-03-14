import { useTranslations, useLocale } from "next-intl";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Metadata } from "next";
import { ShieldCheck, Globe, HelpCircle } from "lucide-react";

export async function generateMetadata(
    props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const locale = (await props.params).locale;
    const isAr = locale === 'ar';

    return {
        title: isAr ? "الأسئلة الشائعة | دار تشانغ للاستشارات" : "FAQ | Dar Chang Consulting",
        description: isAr
            ? "إجابات على الأسئلة المتكررة حول التوريد من الصين، فحص الجودة، وحماية الملكية الفكرية."
            : "Frequently asked questions about China sourcing, quality inspection, and IP protection.",
    };
}

export default function FAQPage() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const gulfFaqs = [
        {
            question: "س: كيف أضمن مصداقية المصانع الصينية وأنا خارج الصين؟",
            answer: <>نحن نعمل كعينك وكوكيلك الميداني في قلب الصين. لا نعتمد على الوعود الشفهية، بل يقوم فريقنا بزيارات ميدانية لتدقيق المصانع في شنغهاي وكافة المدن الصناعية، والتأكد من سجلاتهم التجارية وقدراتهم الإنتاجية. هدفنا هو حمايتك من <strong>المخاطر التجارية</strong> وضمان تعاملك مع شركاء موثوقين فقط.</>
        },
        {
            question: "س: كيف يتم التأكد من جودة المنتجات قبل دفع القيمة كاملة؟",
            answer: <>نتبع سياسة صارمة في <strong>فحص الجودة</strong>. يقوم فريقنا الفني بفحص المنتجات فحصاً دقيقاً (100%) قبل التحميل، ومطابقتها للمواصفات الفنية المتفق عليها في العقود. نرسل لك تقارير مصورة وفيديوهات توثيقية بكل التفاصيل، لنضمن لك أن ما طلبته هو بالضبط ما سيصل إليك.</>
        },
        {
            question: "س: هل تشمل خدماتكم إجراءات الشحن والمطابقة (مثل سابر و SASO)؟",
            answer: <>نحن نتولى "الصداع" القانوني واللوجستي بالكامل. نهتم بتجهيز كافة المستندات المطلوبة للتخليص الجمركي وضمان مطابقتها للمواصفات القياسية في دول الخليج (مثل <strong>نظام سابر للسعودية</strong> أو شهادات المطابقة الدولية). نحن ندير العملية من أرض المصنع حتى وصول الشحنة إلى الميناء، لنوفر عليك عناء المتابعة مع أطراف متعددة.</>
        },
        {
            question: "س: لماذا أختار 'دار تشانغ' بدلاً من الشراء المباشر عبر منصات الأونلاين؟",
            answer: <>المنصات الإلكترونية تعرض لك صوراً، لكننا نعرض لك واقعاً. الشراء المباشر يضعك أمام مخاطر اختلاف الجودة أو تأخير الشحن أو صعوبة استرداد الحقوق. في &quot;دار تشانغ&quot;، نحن نمثلك قانونياً وميدانياً، ونتولى التفاوض للحصول على أفضل الأسعار، ونحل أي مشكلة تطرأ في المصنع فوراً. باختصار: نحن &quot;نشيل الهم&quot; عنك، وعندما نقول <strong>&quot;لا تشيل هم&quot;</strong>، فنحن نعنيها فعلاً.</>
        },
        {
            question: "س: هل يمكنكم المساعدة في تصنيع منتجات بعلامتي التجارية الخاصة (OEM)؟",
            answer: <>بالتأكيد. نحن متخصصون في ربط أصحاب الأعمال بمصانع قادرة على تنفيذ التصاميم الخاصة وتصنيع المنتجات تحت هويتك التجارية. نتابع معك مراحل تطوير العينات، وضمان دقة التنفيذ، وحماية <strong>حقوق ملكيتك الفكرية</strong> في الصين.</>
        }
    ];

    const intlFaqs = [
        {
            question: "How do you ensure compliance with European safety and environmental standards?",
            answer: <>Compliance is our priority. We only partner with manufacturers that hold valid certifications such as <strong>CE, RoHS, and REACH</strong>. Our team on the ground verifies these documents at the source and conducts rigorous pre-shipment testing to ensure every batch meets the strict regulatory requirements of the European market.</>
        },
        {
            question: "How is my Intellectual Property (IP) protected when manufacturing in China?",
            answer: <>We act as your legal and professional buffer. Before any designs or sensitive information are shared, we implement robust <strong>Sourcing Agent Contracts and Non-Disclosure Agreements (NDAs)</strong> with the factories. By having a physical presence in Shanghai, we monitor production closely to ensure your proprietary designs remain secure.</>
        },
        {
            question: "How do you prevent the shipment of substandard or 'low-quality' goods?",
            answer: <>We eliminate the risk of &quot;surprises&quot; through our <strong>100% Quality Inspection</strong> process. Our field team conducts both mid-production and pre-shipment inspections. We physically verify that the materials, dimensions, and finishing match your exact technical specifications before the container is ever sealed.</>
        },
        {
            question: "Can you consolidate orders from multiple different suppliers into one shipment?",
            answer: <>Yes. For clients looking to optimize logistics and reduce costs, we offer <strong>consolidation services</strong>. We can collect products from various manufacturers across China at our Shanghai warehouse, inspect them, and merge them into a single shipment. This significantly reduces your shipping overhead and simplifies the customs process.</>
        },
        {
            question: "Do you handle the entire logistics 'headache' from factory to port?",
            answer: <>Absolutely. We provide end-to-end <strong>supply chain solutions</strong>. We manage everything from the initial factory audit and price negotiation to the final logistics and export documentation. Our goal is to take over the entire workload of a purchasing department so you can focus on your sales and growth.</>
        },
        {
            question: "What is your approach to ethical sourcing and factory conditions?",
            answer: <>We believe a reliable supply chain must be an ethical one. Our factory audits include a review of labor practices and workplace safety. We ensure that your partners in China align with global <strong>ESG (Environmental, Social, and Governance)</strong> standards, protecting your brand's reputation.</>
        }
    ];

    const currentFaqs = isRtl ? gulfFaqs : intlFaqs;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": currentFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof faq.answer === 'string' ? faq.answer : ""
            }
        }))
    };

    return (
        <main className="min-h-screen pt-32 pb-24 bg-bg-neutral relative z-10">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <HelpCircle className="w-6 h-6 text-accent-gold" />
                        <span className="text-accent-gold font-bold tracking-wider uppercase text-sm">
                            {isRtl ? "مركز المساعدة" : "Help Center"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary-navy mb-6 highlight-border inline-block">
                        {t("faq")}
                    </h1>
                    <p className="text-text-main text-lg max-w-2xl">
                        {isRtl
                            ? "كل ما تحتاج معرفته عن خدماتنا وعملياتنا في الصين."
                            : "Everything you need to know about our services and operations in China."}
                    </p>
                </header>

                <section className="space-y-4" aria-labelledby="faq-section">
                    <h2 id="faq-section" className="sr-only">{t("faq")}</h2>
                    {currentFaqs.map((faq, index) => (
                        <FAQAccordion
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            variant="light"
                        />
                    ))}
                </section>

                {/* JSON-LD Schema injection */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            </div>
        </main>
    );
}

