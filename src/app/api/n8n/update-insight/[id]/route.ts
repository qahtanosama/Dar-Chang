import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateN8nToken } from '@/lib/validateN8nToken'
import { fireWebhook } from '@/lib/fireWebhook'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darchangglobal.com'

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = validateN8nToken(req)
  if (authError) return authError

  const { id } = await props.params

  try {
    const body = await req.json()
    const {
      title_en, title_ar,
      content_en, content_ar,
      excerpt_en, excerpt_ar,
      coverImageUrl,
      publishImmediately,
      category,
    } = body

    const existing = await prisma.insight.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const willPublish = publishImmediately === true
    const status = willPublish ? 'published' : (publishImmediately === false ? 'draft' : existing.status)

    const data: Record<string, unknown> = {}
    if (title_en !== undefined) data.titleEn = title_en
    if (title_ar !== undefined) data.titleAr = title_ar
    if (content_en !== undefined) data.bodyEn = content_en
    if (content_ar !== undefined) data.bodyAr = content_ar
    if (excerpt_en !== undefined) data.summaryEn = excerpt_en
    if (excerpt_ar !== undefined) data.summaryAr = excerpt_ar
    if (coverImageUrl !== undefined) data.coverImage = coverImageUrl
    if (category !== undefined) data.category = category
    if (publishImmediately !== undefined) {
      data.published = willPublish
      data.status = status
      if (willPublish && !existing.publishedAt) data.publishedAt = new Date()
    }

    const insight = await prisma.insight.update({ where: { id }, data })

    if (willPublish) {
      await fireWebhook({ event: 'insight.published', source: 'n8n', insight })
    }

    return NextResponse.json({
      success: true,
      id: insight.id,
      slug: insight.slug,
      url: `${BASE_URL}/en/insights/${insight.slug}`,
    })
  } catch (err: any) {
    console.error('[n8n update-insight]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
