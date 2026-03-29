import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  const item = await prisma.testimonial.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  const body = await req.json()
  const { id: _id, createdAt, updatedAt, ...data } = body
  const item = await prisma.testimonial.update({ where: { id }, data })
  revalidatePublic()
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  await prisma.testimonial.delete({ where: { id } })
  revalidatePublic()
  return NextResponse.json({ success: true })
}
