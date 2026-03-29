import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest, props: { params: Promise<{ pageKey: string; locale: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { pageKey, locale } = await props.params
  const config = await prisma.seoConfig.findUnique({
    where: { pageKey_locale: { pageKey, locale } },
  })
  return NextResponse.json(config ?? null)
}

export async function PUT(req: NextRequest, props: { params: Promise<{ pageKey: string; locale: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { pageKey, locale } = await props.params
  const body = await req.json()
  const config = await prisma.seoConfig.upsert({
    where: { pageKey_locale: { pageKey, locale } },
    update: body,
    create: { pageKey, locale, ...body },
  })
  revalidatePublic()
  return NextResponse.json(config)
}
