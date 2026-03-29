"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Search, ShieldCheck, Settings, Ship, FileText, Globe, Package, Truck, Factory, Zap, Star, CheckCircle } from "lucide-react";
import type { ServiceData } from "./ServicesOverview";

gsap.registerPlugin(ScrollTrigger);

// Map icon name string → lucide component
const ICON_MAP: Record<string, React.ReactNode> = {
  Search: <Search className="w-8 h-8 text-accent-gold" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-accent-gold" />,
  Settings: <Settings className="w-8 h-8 text-accent-gold" />,
  Ship: <Ship className="w-8 h-8 text-accent-gold" />,
  FileText: <FileText className="w-8 h-8 text-accent-gold" />,
  Globe: <Globe className="w-8 h-8 text-accent-gold" />,
  Package: <Package className="w-8 h-8 text-accent-gold" />,
  Truck: <Truck className="w-8 h-8 text-accent-gold" />,
  Factory: <Factory className="w-8 h-8 text-accent-gold" />,
  Zap: <Zap className="w-8 h-8 text-accent-gold" />,
  Star: <Star className="w-8 h-8 text-accent-gold" />,
  CheckCircle: <CheckCircle className="w-8 h-8 text-accent-gold" />,
}

export function ServicesOverviewClient({ services }: { services: ServiceData[] }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    gsap.to(bgImage, { opacity: 0.6, scale: 1.05, duration: 0.6, ease: "power2.out" });
    gsap.to(contentWrapper, { backdropFilter: "blur(4px)", backgroundColor: "rgba(255, 255, 255, 0.2)", duration: 0.6, ease: "power2.out" });
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const bgImage = card.querySelector(".bg-reveal-image");
    const contentWrapper = card.querySelector(".content-wrapper");

    gsap.to(bgImage, { opacity: 0, scale: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(contentWrapper, { backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 1)", duration: 0.5, ease: "power2.inOut" });
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

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id ?? idx}
              className="service-card relative p-8 rounded-2xl border border-border-subtle shadow-md hover:shadow-lg hover:border-accent-gold transition-shadow duration-300 group overflow-hidden cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-reveal-image absolute inset-0 opacity-0 pointer-events-none z-0 overflow-hidden">
                <Image
                  src={service.bgImage}
                  alt={isRtl ? service.titleAr : service.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="content-wrapper absolute inset-0 z-10 bg-white" />

              <div className="relative z-20">
                <div className="mb-6 bg-bg-neutral w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  {ICON_MAP[service.icon] ?? <Search className="w-8 h-8 text-accent-gold" />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-navy">
                  {isRtl ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-text-main leading-relaxed">
                  {isRtl ? service.descriptionAr : service.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
