"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroBanner() {
  const t = useTranslations("HomePage");
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Hardware-accelerated entrance animation
      gsap.from(".hero-element", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        clearProps: "all", // Prevent lingering transform styles that might cause issues later
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* 
        Video Background 
        We use a high-res placeholder from Unsplash that fits the "Shanghai Port / Containers" theme as requested.
        In a real production environment, this would be the Veo 3.1 video.
        
        CRITICAL LCP: To guarantee LCP < 2.5s, the poster image should be preloaded in the layout head,
        and the video must be optimized.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/hero-poster.png"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        {/* Fallback to a conceptual port video if available, otherwise just rely on the poster */}
      </video>

      {/* Dark Overlays for Contrast Safety */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4),transparent)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.7)_100%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#C9A84C]/[.05] z-10 mix-blend-overlay pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-10 md:mt-20">
        {/* Subtle Brand pill */}
        <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse shadow-[0_0_10px_rgba(201,168,76,1)]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
            Dar Chang • دار تشانغ
          </span>
        </div>

        <h1 className="hero-element text-4xl md:text-6xl lg:text-7xl font-bold md:font-semibold antialiased text-white max-w-5xl leading-tight md:leading-tight mb-6">
          {t("title")}
        </h1>

        <p className="hero-element text-lg md:text-xl font-medium antialiased text-gray-200 max-w-3xl mb-10 leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="hero-element flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA (Matte Gold) */}
          <Link
            href="/quote"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C5A059] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b08d4b] transition-all active:scale-95 touch-manipulation group shadow-sm border border-[#C5A059]"
          >
            {t("cta_primary")}
            <ArrowRight className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>

          {/* Secondary WhatsApp CTA (High-Gloss Green) */}
          <Link
            href="https://wa.me/8618721160270"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1ebe5d] transition-all shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_25px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-95 touch-manipulation relative overflow-hidden group border border-white/20"
          >
            {/* Glossy highlight layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-60 pointer-events-none" />
            <Phone className="w-5 h-5 fill-current relative z-10" />
            <span className="relative z-10">{t("cta_secondary")}</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator (hidden on very small screens) */}
      <div className="hero-element absolute bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 opacity-50">
        <span className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
