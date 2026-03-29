import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const pageParam = searchParams.get('page')
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20')))
  const statusFilter = searchParams.get('status')

  const where = statusFilter ? { status: statusFilter } : {}

  if (pageParam) {
    const page = Math.max(1, parseInt(pageParam))
    const [insights, total] = await Promise.all([
      prisma.insight.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, slug: true, titleEn: true, titleAr: true,
          category: true, published: true, status: true,
          publishedAt: true, createdAt: true, updatedAt: true,
          summaryEn: true, summaryAr: true, coverImage: true,
        },
      }),
      prisma.insight.count({ where }),
    ])
    return NextResponse.json({ insights, total, page, totalPages: Math.ceil(total / limit) })
  }

  // Backward-compat: no pagination params = return all
  const insights = await prisma.insight.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, slug: true, titleEn: true, titleAr: true,
      category: true, published: true, status: true,
      publishedAt: true, createdAt: true, updatedAt: true,
      summaryEn: true, summaryAr: true, coverImage: true,
    },
  })
  return NextResponse.json(insights)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const body = await req.json()
  const insight = await prisma.insight.create({ data: body })
  revalidatePublic()
  return NextResponse.json(insight, { status: 201 })
}
