import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  const member = await prisma.teamMember.findUnique({ where: { id } })
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(member)
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  const body = await req.json()
  const { id: _id, createdAt, updatedAt, ...data } = body
  const member = await prisma.teamMember.update({ where: { id }, data })
  revalidatePublic()
  return NextResponse.json(member)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  await prisma.teamMember.delete({ where: { id } })
  revalidatePublic()
  return NextResponse.json({ success: true })
}
