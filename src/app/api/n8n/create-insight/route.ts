import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateN8nToken } from '@/lib/validateN8nToken'
import { fireWebhook } from '@/lib/fireWebhook'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darchangglobal.com'

export async function POST(req: NextRequest) {
  const authError = validateN8nToken(req)
  if (authError) return authError

  try {
    const body = await req.json()
    const {
      title_en, title_ar,
      content_en, content_ar,
      excerpt_en, excerpt_ar,
      tags,
      slug,
      coverImageUrl,
      publishImmediately = false,
      category = 'General',
    } = body

    if (!title_en || !content_en || !slug) {
      return NextResponse.json({ error: 'title_en, content_en, and slug are required' }, { status: 400 })
    }

    // Auto-generate summary from excerpt or first 155 chars of content
    const summaryEn = excerpt_en || content_en.replace(/<[^>]*>/g, '').slice(0, 155)
    const summaryAr = excerpt_ar || (content_ar ?? '').replace(/<[^>]*>/g, '').slice(0, 155)

    const status = publishImmediately ? 'published' : 'draft'

    const insight = await prisma.insight.create({
      data: {
        slug,
        titleEn: title_en,
        titleAr: title_ar ?? '',
        summaryEn,
        summaryAr,
        bodyEn: content_en,
        bodyAr: content_ar ?? '',
        coverImage: coverImageUrl ?? '',
        category,
        published: publishImmediately,
        publishedAt: publishImmediately ? new Date() : null,
        status,
      },
    })

    if (publishImmediately) {
      await fireWebhook({ event: 'insight.published', source: 'n8n', insight })
    }

    return NextResponse.json({
      success: true,
      id: insight.id,
      slug: insight.slug,
      url: `${BASE_URL}/en/insights/${insight.slug}`,
    }, { status: 201 })
  } catch (err: any) {
    console.error('[n8n create-insight]', err)
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
