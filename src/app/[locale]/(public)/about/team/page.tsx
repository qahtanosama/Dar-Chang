export const revalidate = 60;

import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Linkedin } from 'lucide-react'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale === 'ar') {
    return {
      title: 'فريقنا | دار تشانغ',
      description: 'تعرف على الفريق المتخصص خلف دار تشانغ — خبراء التوريد والمشتريات والخدمات اللوجستية في شنغهاي.',
    }
  }
  return {
    title: 'Our Team | Dar Chang',
    description: 'Meet the specialist team behind Dar Chang — sourcing, procurement, and logistics experts based in Shanghai.',
  }
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params
  const isAr = locale === 'ar'

  let members: any[] = []
  try {
    members = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
  } catch {}

  return (
    <main className="min-h-screen bg-bg-neutral" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero strip */}
      <div className="bg-primary-navy text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            {isAr ? 'العودة إلى من نحن' : 'Back to About'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {isAr ? 'تعرف على فريقنا' : 'Meet Our Team'}
          </h1>
          <p className="text-white/70 max-w-2xl text-base">
            {isAr
              ? 'محترفون متخصصون يجمعون بين الخبرة الميدانية في الصين والفهم العميق لاحتياجات السوق الخليجي والشرق أوسطي.'
              : 'Specialist professionals combining on-the-ground expertise in China with a deep understanding of Gulf and Middle East market needs.'}
          </p>
        </div>
      </div>

      {/* Team grid */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {members.length === 0 ? (
          <p className="text-center text-text-main py-12">
            {isAr ? 'سيتم إضافة أعضاء الفريق قريباً.' : 'Team members will be added soon.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-border-subtle overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="w-full aspect-square bg-primary-navy/5 relative overflow-hidden">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={isAr ? member.nameAr : member.nameEn}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary-navy/20">
                        {(isAr ? member.nameAr : member.nameEn).charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-base font-semibold text-primary-navy leading-tight">
                    {isAr ? member.nameAr : member.nameEn}
                  </h2>
                  <p className="text-sm text-accent-gold font-medium mt-0.5">
                    {isAr ? member.roleAr : member.roleEn}
                  </p>

                  {(isAr ? member.bioAr : member.bioEn) && (
                    <p className="text-sm text-text-main mt-3 leading-relaxed flex-1">
                      {isAr ? member.bioAr : member.bioEn}
                    </p>
                  )}

                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
