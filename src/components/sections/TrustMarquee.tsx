"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const logos = [
  "Caterpillar",
  "Komatsu",
  "SANY",
  "Volvo",
  "SDLG",
  "Shantui",
  "JCB",
  "CASE",
  "Maersk",
  "DHL",
];

export function TrustMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".marquee-content", {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <div ref={marqueeRef} className="w-full relative overflow-hidden border-b border-border-subtle bg-white py-8 md:py-12 z-10 shadow-sm">
      {/* Edge masks for a fade out effect */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="marquee-content flex items-center gap-16 md:gap-32 w-max px-8">
        {/* Render items twice for infinite scroll trick */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="text-primary-navy font-bold text-xl md:text-3xl tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
