export const revalidate = 0;

import { prisma } from '@/lib/prisma'
import { VaultClient } from '@/components/sections/VaultClient'
import { Metadata } from 'next'

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  const isAr = locale === 'ar'
  return {
    title: isAr ? 'القبو الرقمي | دار تشانغ' : 'The Digital Vault | Dar Chang',
    description: isAr
      ? 'عمليات أرضية شفافة وموثقة قانونيًا في شنغهاي.'
      : 'Transparent, legally sound ground operations in Shanghai. Access our core credentials and SOPs.',
  }
}

// Hardcoded fallback documents (used when DB has no records)
const FALLBACK_DOCS = [
  {
    id: 'f1', titleEn: 'Shanghai Business Registration', titleAr: 'تسجيل الأعمال في شنغهاي',
    descriptionEn: 'Official Entity Status & Operating License', descriptionAr: 'حالة الكيان الرسمي وتصريح التشغيل',
    categoryEn: 'Trade & Legal Compliance', categoryAr: 'الامتثال التجاري والقانوني',
    icon: 'Building2', status: 'Verified', validUntil: 'Valid 2026-2030', documentUrl: '',
  },
  {
    id: 'f2', titleEn: 'Export & Customs License', titleAr: 'رخصة التصدير والجمارك',
    descriptionEn: 'Verified Permits for International Trade Lanes', descriptionAr: 'تصاريح موثقة لمسارات التجارة الدولية',
    categoryEn: 'Trade & Legal Compliance', categoryAr: 'الامتثال التجاري والقانوني',
    icon: 'Scale', status: 'Verified', validUntil: 'Valid 2026-2030', documentUrl: '',
  },
  {
    id: 'f3', titleEn: 'Financial Standing & Tax Clearance', titleAr: 'الوضع المالي والتخليص الضريبي',
    descriptionEn: 'Certificate of Good Standing', descriptionAr: 'شهادة حسن السيرة',
    categoryEn: 'Trade & Legal Compliance', categoryAr: 'الامتثال التجاري والقانوني',
    icon: 'FileCheck', status: 'Verified', validUntil: 'Q1 2026', documentUrl: '',
  },
  {
    id: 'f4', titleEn: 'Global Carrier Certifications', titleAr: 'شهادات ناقلات الشحن العالمية',
    descriptionEn: 'Licensed International Logistics Partners', descriptionAr: 'شركاء لوجستيون دوليون مرخصون',
    categoryEn: 'Logistics & Shipping Safety', categoryAr: 'الخدمات اللوجستية وتأمين الشحن',
    icon: 'Anchor', status: 'Active', validUntil: 'Continuous Renewal', documentUrl: '',
  },
  {
    id: 'f5', titleEn: 'Secure Handling Standards', titleAr: 'معايير المناولة الآمنة',
    descriptionEn: 'Containerization & Cargo Protection Protocols', descriptionAr: 'بروتوكولات الشحن وحماية البضائع',
    categoryEn: 'Logistics & Shipping Safety', categoryAr: 'الخدمات اللوجستية وتأمين الشحن',
    icon: 'ShieldCheck', status: 'Active', validUntil: 'ISO Compliant', documentUrl: '',
  },
]

export default async function CompliancePage({ params }: { params: Params }) {
  const { locale } = await params

  let docs = FALLBACK_DOCS

  try {
    const rows = await prisma.vaultDocument.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' },
    })
    if (rows.length > 0) docs = rows as typeof FALLBACK_DOCS
  } catch {}

  return <VaultClient docs={docs} locale={locale} />
}
