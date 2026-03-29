import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const q = new URL(req.url).searchParams.get('q')?.trim() ?? ''
  if (q.length < 2) return NextResponse.json([])

  const [insights, portfolio, services, team, testimonials] = await Promise.all([
    prisma.insight.findMany({
      where: { OR: [{ titleEn: { contains: q } }, { titleAr: { contains: q } }] },
      select: { id: true, titleEn: true, titleAr: true, slug: true },
      take: 5,
    }),
    prisma.portfolioItem.findMany({
      where: { OR: [{ titleEn: { contains: q } }, { titleAr: { contains: q } }] },
      select: { id: true, titleEn: true, titleAr: true },
      take: 5,
    }),
    prisma.service.findMany({
      where: { OR: [{ titleEn: { contains: q } }, { titleAr: { contains: q } }] },
      select: { id: true, titleEn: true, titleAr: true },
      take: 5,
    }),
    prisma.teamMember.findMany({
      where: { OR: [{ nameEn: { contains: q } }, { nameAr: { contains: q } }, { roleEn: { contains: q } }] },
      select: { id: true, nameEn: true, nameAr: true, roleEn: true },
      take: 5,
    }),
    prisma.testimonial.findMany({
      where: { OR: [{ clientNameEn: { contains: q } }, { companyEn: { contains: q } }] },
      select: { id: true, clientNameEn: true, clientNameAr: true, companyEn: true },
      take: 5,
    }),
  ])

  const results = [
    ...insights.map(i => ({ type: 'Insight', id: i.id, title: i.titleEn, subtitle: i.slug, href: `/en/admin/insights/${i.id}` })),
    ...portfolio.map(i => ({ type: 'Portfolio', id: i.id, title: i.titleEn, subtitle: i.titleAr, href: `/en/admin/portfolio/${i.id}` })),
    ...services.map(i => ({ type: 'Service', id: i.id, title: i.titleEn, subtitle: i.titleAr, href: `/en/admin/services` })),
    ...team.map(i => ({ type: 'Team', id: i.id, title: i.nameEn, subtitle: i.roleEn, href: `/en/admin/team/${i.id}` })),
    ...testimonials.map(i => ({ type: 'Testimonial', id: i.id, title: i.clientNameEn, subtitle: i.companyEn, href: `/en/admin/testimonials/${i.id}` })),
  ]

  return NextResponse.json(results)
}
