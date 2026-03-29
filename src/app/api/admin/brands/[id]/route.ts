import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  const body = await req.json()
  delete body.id
  const brand = await prisma.brandLogo.update({ where: { id }, data: body })
  revalidatePublic()
  return NextResponse.json(brand)
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  await prisma.brandLogo.delete({ where: { id } })
  revalidatePublic()
  return NextResponse.json({ success: true })
}
