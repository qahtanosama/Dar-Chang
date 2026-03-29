import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const stats = await prisma.impactStat.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(stats)
}

export async function PUT(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const body = await req.json() as Array<{
    id?: string
    labelEn: string
    labelAr: string
    value: string
    suffix: string
    order: number
  }>

  // Upsert all stats in a transaction
  const results = await prisma.$transaction(
    body.map((stat) =>
      stat.id
        ? prisma.impactStat.update({ where: { id: stat.id }, data: stat })
        : prisma.impactStat.create({ data: stat })
    )
  )
  revalidatePublic()
  return NextResponse.json(results)
}
