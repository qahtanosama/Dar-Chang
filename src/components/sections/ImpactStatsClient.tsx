"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { StatData } from "./ImpactStats";

gsap.registerPlugin(ScrollTrigger);

export function ImpactStatsClient({ stats }: { stats: StatData[] }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  // JSON-LD structured data for this section
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dar Chang Global",
    description: "Premium B2B Import-Export Sourcing",
    knowsAbout: ["Sourcing", "Import", "Export", "Heavy Machinery", "Hotel Furniture"],
    interactionStatistic: stats.map((st) => ({
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/TradeAction",
      userInteractionCount: parseInt(st.value) || 0,
      name: st.labelEn,
    })),
  };

  useGSAP(
    () => {
      const numbers = gsap.utils.toArray(".stat-number");
      const labels = gsap.utils.toArray(".stat-label");

      gsap.from(numbers, {
        textContent: 0,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(labels, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Business Impact Stats"
      className="py-24 bg-white relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
          {stats.map((stat, idx) => (
            <article
              key={stat.id ?? idx}
              className="flex flex-col items-center justify-start gap-4"
            >
              <div
                aria-hidden="true"
                className="text-5xl lg:text-6xl font-bold text-accent-gold flex items-center justify-center"
                dir="ltr"
              >
                <span className="stat-number">{parseInt(stat.value) || 0}</span>
                <span>{stat.suffix}</span>
              </div>

              <span className="sr-only">
                {stat.value}{stat.suffix} {isRtl ? stat.labelAr : stat.labelEn}
              </span>

              <h3 className="stat-label text-base md:text-lg lg:text-xl font-medium text-primary-navy tracking-wide">
                {isRtl ? stat.labelAr : stat.labelEn}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
