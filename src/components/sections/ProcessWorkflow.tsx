"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ProcessWorkflow() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      num: "01",
      title_ar: "استلام الطلب (Request)",
      desc_ar: "استلام المواصفات الفنية (صور، فيديوهات، ملفات CAD).",
      title_en: "Request",
      desc_en:
        "Receiving technical specifications (images, videos, CAD files).",
    },
    {
      num: "02",
      title_ar: "التحليل والمقارنة (Analysis)",
      desc_ar: "تحليل الموردين والمقارنة بين الجودة والتكلفة بدقة.",
      title_en: "Analysis",
      desc_en:
        "Analyzing suppliers and meticulously comparing quality to cost.",
    },
    {
      num: "03",
      title_ar: "الاجتماع والنقاش (Discussion)",
      desc_ar: "اجتماع لمناقشة العروض الفنية والمالية بشفافية.",
      title_en: "Discussion",
      desc_en:
        "Meeting to discuss technical and financial offers with full transparency.",
    },
    {
      num: "04",
      title_ar: "التنفيذ والمتابعة (Execution)",
      desc_ar: "البدء في التصنيع/التوريد مع المتابعة الميدانية اللحظية.",
      title_en: "Execution",
      desc_en:
        "Initiating manufacturing/sourcing with real-time field monitoring.",
    },
    {
      num: "05",
      title_ar: "متابعة ما بعد الشحن (After-Sales)",
      desc_ar: "تأكيد الاستلام، حل مشاكل الجمارك، وتوثيق ملفات الإعادة.",
      title_en: "After-Sales Follow-Up",
      desc_en:
        "Confirming delivery, resolving customs issues, and documenting for reorders.",
    },
  ];

  useGSAP(
    () => {
      const stepElements = gsap.utils.toArray(".process-step");
      const lines = gsap.utils.toArray(".process-line");

      // Animate lines drawing in
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          { scaleX: 0, transformOrigin: isRtl ? "right" : "left" },
          {
            scaleX: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          },
        );
      }

      // Animate steps coming in
      gsap.from(stepElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        clearProps: "all",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden text-text-main"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-navy">
            {isRtl ? "طريقة العمل المعتمدة" : "Our Proven Process"}
          </h2>
          <p className="text-accent-gold font-semibold tracking-widest uppercase text-sm">
            {isRtl
              ? "الشفافية في التعامل خطوة بخطوة"
              : "Step-by-Step Transparency"}
          </p>
        </div>

        <div className="relative">
          {/* Main timeline axis (Mobile = vertical, Desktop = horizontal) */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[2px] bg-border-subtle z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="process-step relative flex flex-row lg:flex-col items-start gap-6 lg:gap-8"
              >
                {/* Mobile timeline line */}
                <div className="lg:hidden absolute left-5 top-12 bottom-[-2rem] w-[2px] bg-border-subtle -z-10 rtl:left-auto rtl:right-5" />

                {/* Number Circle */}
                <div className="w-10 h-10 lg:w-20 lg:h-20 shrink-0 rounded-full bg-bg-neutral border-2 border-accent-gold flex items-center justify-center font-bold text-lg lg:text-2xl text-primary-navy shadow-sm">
                  {step.num}
                </div>

                {/* Content */}
                <div className="pt-1 lg:pt-0">
                  <h3 className="text-xl font-bold text-primary-navy mb-2">
                    {isRtl ? step.title_ar : step.title_en}
                  </h3>
                  <p className="text-text-main text-sm leading-relaxed">
                    {isRtl ? step.desc_ar : step.desc_en}
                  </p>
                </div>

                {/* Animated connecting line for desktop only */}
                {idx < steps.length - 1 && (
                  <div className="process-line hidden lg:block absolute top-[40px] left-20 right-[-1rem] rtl:left-[-1rem] rtl:right-20 h-[2px] bg-accent-gold origin-left rtl:origin-right z-[-1]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
