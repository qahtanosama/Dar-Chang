import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(members)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const body = await req.json()
  if (body.id === 'new') delete body.id
  const member = await prisma.teamMember.create({ data: body })
  revalidatePublic()
  return NextResponse.json(member, { status: 201 })
}
