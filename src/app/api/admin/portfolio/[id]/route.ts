import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  const body = await req.json()
  const item = await prisma.portfolioItem.update({ where: { id }, data: body })
  revalidatePublic()
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  await prisma.portfolioItem.delete({ where: { id } })
  revalidatePublic()
  return NextResponse.json({ success: true })
}
