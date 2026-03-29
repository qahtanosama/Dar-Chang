import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20')))
  const unreadOnly = searchParams.get('unreadOnly') === 'true'

  const where = unreadOnly ? { read: false } : {}

  const [submissions, total, unreadCount] = await Promise.all([
    prisma.formSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.formSubmission.count({ where }),
    prisma.formSubmission.count({ where: { read: false } }),
  ])

  return NextResponse.json({
    submissions,
    total,
    unreadCount,
    page,
    totalPages: Math.ceil(total / limit),
  })
}
