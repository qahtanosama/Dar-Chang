import { prisma } from '@/lib/prisma'
import { TestimonialsMarquee } from './TestimonialsMarquee'

interface Props {
  locale: string
}

export async function TestimonialsSection({ locale }: Props) {
  const isAr = locale === 'ar'

  let testimonials: any[] = []
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
  } catch {}

  if (testimonials.length === 0) return null

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: '#F8F8F6' }}
      dir={isAr ? 'rtl' : 'ltr'}
      // Section-level Review aggregate microdata
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent-gold)] mb-3">
          {isAr ? 'شهادات العملاء' : 'Client Testimonials'}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-navy)] mb-4 leading-tight">
          {isAr ? 'ماذا يقول شركاؤنا' : 'What Our Partners Say'}
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
          {isAr
            ? 'ثقة مبنية على نتائج حقيقية — من الخليج إلى آسيا وأبعد.'
            : 'Trust built on real results — from the Gulf to Asia and beyond.'}
        </p>
      </div>

      {/* Marquee — full bleed, no horizontal padding */}
      <TestimonialsMarquee testimonials={testimonials} isAr={isAr} />
    </section>
  )
}
