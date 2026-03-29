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
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title_ar: "استلام الطلب (Request)",
      desc_ar: "استلام المواصفات الفنية (صور، فيديوهات، ملفات CAD).",
      title_en: "Request",
      desc_en: "Receiving technical specifications (images, videos, CAD files).",
    },
    {
      num: "02",
      title_ar: "التحليل والمقارنة (Analysis)",
      desc_ar: "تحليل الموردين والمقارنة بين الجودة والتكلفة بدقة.",
      title_en: "Analysis",
      desc_en: "Analyzing suppliers and meticulously comparing quality to cost.",
    },
    {
      num: "03",
      title_ar: "الاجتماع والنقاش (Discussion)",
      desc_ar: "اجتماع لمناقشة العروض الفنية والمالية بشفافية.",
      title_en: "Discussion",
      desc_en: "Meeting to discuss technical and financial offers with full transparency.",
    },
    {
      num: "04",
      title_ar: "التنفيذ والمتابعة (Execution)",
      desc_ar: "البدء في التصنيع/التوريد مع المتابعة الميدانية اللحظية.",
      title_en: "Execution",
      desc_en: "Initiating manufacturing/sourcing with real-time field monitoring.",
    },
    {
      num: "05",
      title_ar: "متابعة ما بعد الشحن (After-Sales)",
      desc_ar: "تأكيد الاستلام، حل مشاكل الجمارك، وتوثيق ملفات الإعادة.",
      title_en: "After-Sales Follow-Up",
      desc_en: "Confirming delivery, resolving customs issues, and documenting for reorders.",
    },
  ];

  useGSAP(
    () => {
      // 1. Draw the main vertical line on scroll Down
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Trigger earlier for mobile
            end: "bottom 60%",
            scrub: 1, // Add slight delay for smoothness
          },
        });
      }

      // 2. Animate each step as the line reaches it
      const stepItems = gsap.utils.toArray(".timeline-step");
      
      stepItems.forEach((step: any) => {
        const circle = step.querySelector(".step-circle");
        const content = step.querySelector(".step-content");

        // Initial states
        gsap.set(circle, { scale: 1, borderColor: "rgba(0,0,0,0.1)" });
        gsap.set(content, { 
          opacity: 0, 
          x: isRtl ? -40 : 40, 
          filter: "blur(8px)",
        });

        // Trigger animation when the step reaches the center of screen
        ScrollTrigger.create({
          trigger: step,
          start: "top 85%", // Trigger earlier on mobile so it shows properly on scroll
          onEnter: () => {
            // Pop out the circle
            gsap.to(circle, {
              scale: 1.1,
              duration: 0.5,
              ease: "back.out(1.5)",
              borderColor: "#d4af37", // accent-gold approx
              boxShadow: "0 0 25px rgba(212, 175, 55, 0.3)",
            });

            // Fade in text with motion blur removal
            gsap.to(content, {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1, // slight delay after circle
            });
          },
          // Reverse animation when scrolling quickly back up
          onLeaveBack: () => {
            gsap.to(circle, {
              scale: 1,
              borderColor: "rgba(0,0,0,0.1)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              duration: 0.4,
              ease: "power2.inOut",
            });
            gsap.to(content, {
              opacity: 0,
              x: isRtl ? -40 : 40,
              filter: "blur(8px)",
              duration: 0.4,
            });
          }
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden text-text-main"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-navy">
            {isRtl ? "طريقة العمل المعتمدة" : "Our Proven Process"}
          </h2>
          <p className="text-accent-gold font-semibold tracking-widest uppercase text-sm">
            {isRtl
              ? "الشفافية في التعامل خطوة بخطوة"
              : "Step-by-Step Transparency"}
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative py-4">
          {/* Background subtle line */}
          <div className={`absolute top-0 bottom-0 w-[2px] bg-border-subtle z-0 ${isRtl ? "right-[31px] md:right-[47px]" : "left-[31px] md:left-[47px]"}`} />
          
          {/* Animated gold line */}
          <div 
            ref={lineRef}
            className={`absolute top-0 bottom-0 w-[2px] bg-accent-gold origin-top scale-y-0 z-10 ${isRtl ? "right-[31px] md:right-[47px]" : "left-[31px] md:left-[47px]"}`}
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="timeline-step relative flex items-center gap-8 md:gap-16 z-20"
              >
                {/* Number Circle: w-16 = 64px, w-24 = 96px on md */}
                <div className="step-circle w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-full bg-white border-2 flex items-center justify-center font-bold text-xl md:text-2xl text-primary-navy shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all">
                  {step.num}
                </div>

                {/* Content */}
                <div className="step-content pt-1">
                  <h3 className="text-2xl font-bold text-primary-navy mb-3">
                    {isRtl ? step.title_ar : step.title_en}
                  </h3>
                  <p className="text-text-main/80 text-base md:text-lg leading-relaxed max-w-xl">
                    {isRtl ? step.desc_ar : step.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
