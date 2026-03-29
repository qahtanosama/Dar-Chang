import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateN8nToken } from '@/lib/validateN8nToken'

export async function GET(req: NextRequest) {
  const authError = validateN8nToken(req)
  if (authError) return authError

  const [total, published, lastInsight] = await Promise.all([
    prisma.insight.count(),
    prisma.insight.count({ where: { published: true } }),
    prisma.insight.findFirst({ where: { published: true }, orderBy: { publishedAt: 'desc' }, select: { slug: true, titleEn: true, publishedAt: true } }),
  ])

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    cms: {
      totalInsights: total,
      publishedInsights: published,
      draftInsights: total - published,
      lastPublishedArticle: lastInsight ?? null,
    },
  })
}
