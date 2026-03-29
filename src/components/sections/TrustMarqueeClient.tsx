'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type Brand = { id: string; name: string; logoUrl: string }

export function TrustMarqueeClient({ brands }: { brands: Brand[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.marquee-content', {
        xPercent: -50,
        duration: Math.max(20, brands.length * 3),
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: marqueeRef, dependencies: [brands.length] },
  )

  const items = [...brands, ...brands] // duplicate for seamless loop

  return (
    <div
      ref={marqueeRef}
      className="w-full relative overflow-hidden border-b border-border-subtle bg-white py-8 md:py-12 z-10 shadow-sm"
    >
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="marquee-content flex items-center gap-16 md:gap-32 w-max px-8">
        {items.map((brand, idx) => {
          // If logoUrl points to an SVG, intelligently determine the WebP path as the primary image
          const fallbackSrc = brand.logoUrl ? brand.logoUrl.replace(/\.svg$/, '.webp') : '';
          const isEager = idx < 4;

          return (
            <figure
              key={`${brand.id}-${idx}`}
              className="m-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <figcaption className="sr-only">{brand.name} - Heavy Equipment Partner</figcaption>
              {brand.logoUrl ? (
                <Image
                  src={fallbackSrc || brand.logoUrl}
                  alt={`${brand.name} - Heavy Equipment Partner`}
                  width={120}
                  height={40}
                  className="object-contain max-h-10 min-w-[80px]"
                  unoptimized={brand.logoUrl.startsWith('http')}
                  loading={isEager ? "eager" : "lazy"}
                  fetchPriority={isEager ? "high" : "auto"}
                />
              ) : (
                <span className="text-primary-navy font-bold text-xl md:text-3xl tracking-widest uppercase px-4">
                  {brand.name}
                </span>
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}
