'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type Testimonial = {
  id: string
  clientNameEn: string
  clientNameAr: string
  companyEn: string
  companyAr: string
  quoteEn: string
  quoteAr: string
  rating: number
  photoUrl: string
}

interface Props {
  testimonials: Testimonial[]
  isAr: boolean
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
      <meta itemProp="ratingValue" content={String(rating)} />
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-base leading-none select-none ${
            i < rating ? 'text-[var(--color-accent-gold)]' : 'text-slate-200'
          }`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

function TestimonialCard({ t, isAr }: { t: Testimonial; isAr: boolean }) {
  const name = isAr ? t.clientNameAr : t.clientNameEn
  const company = isAr ? t.companyAr : t.companyEn
  const quote = isAr ? t.quoteAr : t.quoteEn
  const initial = name.charAt(0).toUpperCase()

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="w-[300px] shrink-0 bg-white rounded-2xl shadow-sm flex flex-col p-5"
      style={{
        border: '1px solid #ebebeb',
        borderLeft: '3px solid var(--color-accent-gold)',
      }}
    >
      <StarRating rating={t.rating} />

      <blockquote
        itemProp="reviewBody"
        className="text-sm leading-relaxed text-slate-600 line-clamp-3 flex-1 mb-4 not-italic"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <hr className="border-slate-100 mb-4" />

      <div
        className="flex items-center gap-3"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        {t.photoUrl ? (
          <Image
            src={t.photoUrl}
            alt={name}
            width={36}
            height={36}
            className="rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'var(--color-primary-navy)' }}
            aria-hidden="true"
          >
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <cite
            itemProp="name"
            className="not-italic font-semibold text-slate-800 text-sm block leading-tight truncate"
          >
            {name}
          </cite>
          {company && (
            <span className="text-xs text-slate-400 truncate block">{company}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export function TestimonialsMarquee({ testimonials, isAr }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      if (!trackRef.current || testimonials.length === 0) return

      if (isAr) {
        gsap.set(trackRef.current, { xPercent: -50 })
        tweenRef.current = gsap.to(trackRef.current, {
          xPercent: 0,
          duration: testimonials.length * 8,
          ease: 'none',
          repeat: -1,
        })
      } else {
        tweenRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: testimonials.length * 8,
          ease: 'none',
          repeat: -1,
        })
      }
    },
    { scope: containerRef, dependencies: [isAr, testimonials.length] },
  )

  const handleMouseEnter = () => tweenRef.current?.pause()
  const handleMouseLeave = () => tweenRef.current?.resume()

  if (testimonials.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*
       * Two identical sets of cards in a single flex row.
       * GSAP moves the track by ±50% of its total width (= one full card set),
       * then loops — the transition is invisible since both sets are identical.
       *
       * SEO: All card content is in the real DOM (not hidden).
       * Accessibility: The duplicate set carries aria-hidden so screen readers
       * don't announce each testimonial twice.
       */}
      <div ref={trackRef} className="flex gap-5 w-max py-4 px-6">
        {/* Primary set — fully indexed by search engines */}
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} t={t} isAr={isAr} />
        ))}

        {/* Visual clone — hidden from assistive technology */}
        <div className="flex gap-5" aria-hidden="true">
          {testimonials.map((t) => (
            <TestimonialCard key={`clone-${t.id}`} t={t} isAr={isAr} />
          ))}
        </div>
      </div>
    </div>
  )
}
