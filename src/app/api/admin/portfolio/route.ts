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
    const [items, total] = await Promise.all([
      prisma.portfolioItem.findMany({ where, orderBy: { order: 'asc' }, skip: (page - 1) * limit, take: limit }),
      prisma.portfolioItem.count({ where }),
    ])
    return NextResponse.json({ items, total, page, totalPages: Math.ceil(total / limit) })
  }

  const items = await prisma.portfolioItem.findMany({ where, orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  try {
    const body = await req.json()
    if (body.id === 'new') delete body.id
    const item = await prisma.portfolioItem.create({ data: body })
    revalidatePublic()
    return NextResponse.json(item, { status: 201 })
  } catch(e: any) {
    console.error("Failed to create portfolio item:", e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
