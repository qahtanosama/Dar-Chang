export const revalidate = 60;

import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { Calendar, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { insightToMetadata } from '@/lib/seo'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darchangglobal.com'

export async function generateMetadata(
  props: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await props.params
  const insight = await prisma.insight.findUnique({ where: { slug } })
  if (!insight) return { title: 'Not Found' }
  const meta = insightToMetadata(insight, locale as 'en' | 'ar', BASE_URL)
  if (insight.canonicalUrl) {
    meta.alternates = { ...meta.alternates, canonical: insight.canonicalUrl }
  }
  return meta
}

export default async function InsightDetailPage(
  props: { params: Promise<{ locale: string; slug: string }> }
) {
  const { locale, slug } = await props.params
  const isAr = locale === 'ar'

  const insight = await prisma.insight.findUnique({ where: { slug } })
  if (!insight || !insight.published) notFound()

  const body = (isAr ? insight.bodyAr : insight.bodyEn) || ''

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isAr ? insight.titleAr : insight.titleEn,
    description: isAr ? insight.summaryAr : insight.summaryEn,
    image: insight.coverImage || undefined,
    datePublished: insight.publishedAt?.toISOString() ?? insight.createdAt.toISOString(),
    dateModified: insight.updatedAt.toISOString(),
    url: insight.canonicalUrl || `${BASE_URL}/${locale}/insights/${insight.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Dar Chang',
      url: BASE_URL,
    },
    inLanguage: locale,
  }

  /**
   * Render strategy:
   * - New content (editor output) starts with `<` → dangerouslySetInnerHTML
   * - Old content (Markdown) → ReactMarkdown with same styling
   */
  const isHtml = body.trimStart().startsWith('<')

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
    />
    <main className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back */}
        <div className="mb-10">
          <Link href="/insights"
            className="inline-flex items-center gap-2 text-sm text-text-main hover:text-primary-navy transition-colors font-medium">
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isAr ? 'العودة إلى الرؤى' : 'Back to Insights'}
          </Link>
        </div>

        {/* Meta Header */}
        <div className="mb-10 text-center md:text-start max-w-3xl highlight-border">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-main mb-6">
            <span className="flex items-center gap-1.5 bg-bg-neutral px-3 py-1 rounded-full text-accent-gold font-medium">
              <Tag className="w-3.5 h-3.5" />
              {insight.category}
            </span>
            {insight.publishedAt && (
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-accent-gold" />
                {new Date(insight.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-navy leading-tight mb-6" dir={isAr ? 'rtl' : 'ltr'}>
            {isAr ? insight.titleAr : insight.titleEn}
          </h1>
          <p className="text-lg md:text-xl text-text-main leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>
            {isAr ? insight.summaryAr : insight.summaryEn}
          </p>
        </div>

        {/* Cover Image */}
        {insight.coverImage && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-lg border border-border-subtle">
            <Image
              src={insight.coverImage}
              alt={isAr ? insight.titleAr : insight.titleEn}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              unoptimized
            />
          </div>
        )}

        {/* Article Body */}
        <article
          className="max-w-none text-text-main leading-relaxed text-base md:text-lg"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {isHtml ? (
            /* ── HTML output from Tiptap editor ──────────────────────── */
            <div
              className="insight-prose"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : (
            /* ── Graceful Markdown fallback for legacy content ─────────── */
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h2 className="text-2xl font-bold mt-10 mb-5 text-primary-navy border-b border-border-subtle pb-2" {...props} />,
                h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-10 mb-5 text-primary-navy border-b border-border-subtle pb-2" {...props} />,
                h3: ({ ...props }) => <h3 className="text-xl font-bold mt-8 mb-4 text-primary-navy" {...props} />,
                p: ({ ...props }) => <p className="mb-6 leading-relaxed" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc mb-6 ml-6 mr-6 space-y-2" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal mb-6 ml-6 mr-6 space-y-2" {...props} />,
                li: ({ ...props }) => <li className="pl-2 pr-2" {...props} />,
                a: ({ ...props }) => <a className="text-accent-gold underline hover:no-underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                strong: ({ ...props }) => <strong className="font-bold text-primary-navy" {...props} />,
                blockquote: ({ ...props }) => <blockquote className="border-l-4 border-accent-gold pl-6 pr-6 italic text-gray-600 my-8 bg-bg-neutral py-4 rounded-r-lg" {...props} />,
                table: ({ ...props }) => (
                  <div className="overflow-x-auto mb-8 shadow-sm rounded-lg border border-border-subtle">
                    <table className="w-full text-sm md:text-base text-left rtl:text-right" {...props} />
                  </div>
                ),
                thead: ({ ...props }) => <thead className="bg-primary-navy text-white" {...props} />,
                th: ({ ...props }) => <th className="px-6 py-4 font-bold border-b border-white/10" {...props} />,
                tbody: ({ ...props }) => <tbody className="divide-y divide-border-subtle bg-white" {...props} />,
                td: ({ ...props }) => <td className="px-6 py-4 border-b border-border-subtle" {...props} />,
                hr: ({ ...props }) => <hr className="my-10 border-border-subtle" {...props} />,
              }}
            >
              {body}
            </ReactMarkdown>
          )}
        </article>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border-subtle flex items-center justify-between">
          <Link href="/insights"
            className="text-primary-navy font-bold hover:text-accent-gold transition-colors flex items-center gap-2">
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isAr ? 'المزيد من الرؤى' : 'More Insights'}
          </Link>
          <Link href="/contact"
            className="px-6 py-3 bg-primary-navy text-white text-sm font-bold rounded-full hover:bg-accent-gold transition-colors shadow-md">
            {isAr ? 'تواصل معنا' : 'Get in Touch'}
          </Link>
        </div>
      </div>
    </main>
    </>
  )
}
