"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Search, ShieldCheck, Settings, Ship, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ServicesOverview() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: <Search className="w-8 h-8 text-accent-gold" />,
      title_ar: "البحث والربط المباشر مع المصادر",
      title_en: "Direct Source Procurement",
      desc_ar:
        "نختصر عليك المسافة ونصلك بأفضل المصانع المتخصصة في منتجك، لنضمن لك الحصول على السعر من المصدر مباشرة مع مطابقة أدق التفاصيل الفنية.",
      desc_en:
        "Direct access to specialized manufacturers for your product. We eliminate middlemen to secure the most competitive source pricing for your operations.",
      bgImage: "/images/supplier_research_bg.png",
      alt_en: "Technical sourcing of industrial motors and machinery suppliers in China.",
      alt_ar: "البحث التقني عن موردي المحركات والمعدات الصناعية في الصين.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent-gold" />,
      title_ar: "التحقق الميداني والاعتماد",
      title_en: "On-Ground Verification",
      desc_ar: "لا تكتفِ بالصور؛ نحن نزور المصنع على أرض الواقع وندقق في سجلاته القانونية وقدرته الإنتاجية، لنعطيك الضوء الأخضر قبل أن تدفع ريالاً واحداً.",
      desc_en:
        "Rigorous on-site audits of production capacity and legal compliance. Secure your investment with professional \"boots on the ground\" before signing any contract.",
      bgImage: "/images/factory_audit_bg.png",
      alt_en: "Professional factory audit and technical capacity verification in Shanghai.",
      alt_ar: "تدقيق المصانع والتحقق من القدرة التقنية في شنغهاي.",
    },
    {
      icon: <Settings className="w-8 h-8 text-accent-gold" />,
      title_ar: "الرقابة الصارمة على الجودة",
      title_en: "Strict Quality Management",
      desc_ar: "فحص هندسي دقيق لكل قطعة قبل التعبئة. نضمن أن ما طلبته في العقد هو تماماً ما سيصل إلى مخازنك، دون مفاجآت أو عيوب تصنيعية.",
      desc_en: "Technical inspections tailored to your specific product requirements. We ensure every shipment meets international standards before leaving the source.",
      bgImage: "/images/quality_management_bg.png",
      alt_en: "Engineering inspection and quality control for heavy equipment exports.",
      alt_ar: "إدارة ضبط الجودة والفحص الهندسي لصادرات المعدات الثقيلة.",
    },
    {
      icon: <Ship className="w-8 h-8 text-accent-gold" />,
      title_ar: "إدارة الشحن والخدمات اللوجستية",
      title_en: "Integrated Supply Chain",
      desc_ar: "نتولى عنك تعقيدات الشحن الدولي، من التعاقد وحتى وصول الشحنة. نركز على التوقيت الدقيق وسلامة البضائع لتصلك جاهزة للبيع أو التشغيل.",
      desc_en:
        "Managing complex shipping and documentation for your international cargo. Reliable, efficient delivery to any destination worldwide.",
      bgImage: "/images/integrated_logistics_bg.png",
      alt_en: "International shipping and integrated logistics solutions for bulk cargo.",
      alt_ar: "الحلول اللوجستية المتكاملة والشحن الدولي للبضائع الضخمة.",
    },
    {
      icon: <FileText className="w-8 h-8 text-accent-gold" />,
      title_ar: "شريككم التجاري المعتمد في الصين",
      title_en: "Legal & Financial Safeguard",
      desc_ar:
        "نُمثلك رسمياً أمام الجهات الصينية ونحمي حقوقك القانونية والمالية. نوفر لك الحضور الفعلي في السوق الصيني دون الحاجة لمغادرة مكتبك.",
      desc_en:
        "Your official representative on the ground in China. We protect your interests and mitigate cross-border trade risks across your business.",
      bgImage: "/images/commercial_mandate_bg.png",
      alt_en: "Official commercial mandate and legal representation for business in China.",
      alt_ar: "خدمة المفوض التجاري والتمثيل القانوني الرسمي للأعمال في الصين.",
    },
  ];

  const { contextSafe } = useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    },
    { scope: sectionRef },
  );

  const handleMouseEnter = contextSafe((e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const bgImage = card.querySelector(".bg-reveal-image");
    const contentWrapper = card.querySelector(".content-wrapper");

    gsap.to(bgImage, {
      opacity: 0.6,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(contentWrapper, {
      backdropFilter: "blur(4px)",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      duration: 0.6,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const bgImage = card.querySelector(".bg-reveal-image");
    const contentWrapper = card.querySelector(".content-wrapper");

    gsap.to(bgImage, {
      opacity: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(contentWrapper, {
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(255, 255, 255, 1)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  });

  return (
    <section ref={sectionRef} className="relative z-10 -mt-28 md:-mt-32 pt-28 pb-24 bg-bg-neutral rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center md:text-start mb-16 max-w-3xl highlight-border">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-navy">
            {isRtl ? "حلول من الألف إلى الياء" : "End-to-End Solutions"}
          </h2>
          <p className="text-text-main text-lg">
            {isRtl
              ? "نحن لسنا مجرد وسيط، نحن شريكك اللوجستي والميداني المستقر في الصين. نضمن لك الجودة والشفافية التامة."
              : "We are not just a broker; we are your established logistics and field partner in China, guaranteeing quality and complete transparency."}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <div
              key={idx}
              className="service-card relative p-8 rounded-2xl border border-border-subtle shadow-md hover:shadow-lg hover:border-accent-gold transition-shadow duration-300 group overflow-hidden cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-reveal-image absolute inset-0 opacity-0 pointer-events-none z-0 overflow-hidden">
                <Image
                  src={service.bgImage}
                  alt={isRtl ? service.alt_ar : service.alt_en}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="content-wrapper absolute inset-0 z-10 bg-white" />

              <div className="relative z-20">
                <div className="mb-6 bg-bg-neutral w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-navy">
                  {isRtl ? service.title_ar : service.title_en}
                </h3>
                <p className="text-text-main leading-relaxed">
                  {isRtl ? service.desc_ar : service.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
