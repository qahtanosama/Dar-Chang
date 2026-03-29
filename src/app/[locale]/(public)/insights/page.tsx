export const revalidate = 60;

import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { getSeoConfig } from '@/lib/getSeoConfig'
import { Calendar, Tag } from 'lucide-react'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  const seo = await getSeoConfig('insights', locale)
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: { title: seo.ogTitle, description: seo.ogDescription, images: seo.ogImageUrl ? [seo.ogImageUrl] : [] },
    twitter: { card: 'summary_large_image' as const, title: seo.ogTitle || seo.metaTitle, images: seo.ogImageUrl ? [seo.ogImageUrl] : [] },
  }
}

export default async function InsightsListPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const isAr = locale === 'ar'

  // Fetch from DB; fall back to static articles if empty
  const dbInsights = await prisma.insight.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: { id: true, slug: true, titleEn: true, titleAr: true, summaryEn: true, summaryAr: true, coverImage: true, category: true, publishedAt: true },
  })

  const insights = dbInsights;

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center md:text-start">
          <p className="text-accent-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">
            {isAr ? 'رؤى دار تشانغ' : 'Dar Chang Insights'}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {isAr ? 'رؤى ' : 'Global'}<span className="text-accent-gold">{isAr ? 'عالمية' : ' Insights'}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            {isAr ? 'تحليلات الخبراء، واتجاهات الصناعة، والذكاء الاستراتيجي عبر التوريد العالمي.' : 'Expert analysis, industry trends, and strategic intelligence across global sourcing, heavy machinery, and international supply chains.'}
          </p>
        </div>

        {insights.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">{isAr ? 'لا توجد مقالات منشورة حتى الآن.' : 'No insights published yet. Check back soon.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {insights.map((insight) => (
              <Link
                key={insight.id}
                href={`/${locale}/insights/${insight.slug}`}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                  {insight.coverImage ? (
                    <Image src={insight.coverImage} alt={isAr ? insight.titleAr : insight.titleEn} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <span className="text-white/30 text-4xl font-bold">DC</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-primary-navy/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium text-accent-gold border border-white/10">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{insight.category}</span>
                  </div>
                </div>
                <div className="flex-grow flex flex-col">
                  {insight.publishedAt && (
                    <time className="text-sm text-gray-500 mb-3 block flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 inline" />
                      {new Date(insight.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-accent-gold transition-colors">
                    {isAr ? insight.titleAr : insight.titleEn}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {isAr ? insight.summaryAr : insight.summaryEn}
                  </p>
                  <div className="mt-auto text-accent-gold font-bold text-sm tracking-wide group-hover:underline underline-offset-4">
                    {isAr ? 'اقرأ المقال ←' : 'Read Article →'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
