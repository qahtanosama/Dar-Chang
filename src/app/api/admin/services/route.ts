import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const body = await req.json()
  const service = await prisma.service.create({ data: body })
  revalidatePublic()
  return NextResponse.json(service, { status: 201 })
}
