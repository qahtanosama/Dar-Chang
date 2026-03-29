// Server Component wrapper — fetches from DB, falls back to hardcoded data
import { prisma } from '@/lib/prisma'
import { ServicesOverviewClient } from './ServicesOverviewClient'

const FALLBACK_SERVICES = [
  {
    id: 'fallback-1', slug: 'direct-source-procurement', order: 0, active: true,
    titleEn: 'Direct Source Procurement', titleAr: 'البحث والربط المباشر مع المصادر',
    descriptionEn: 'Direct access to specialized manufacturers for your product. We eliminate middlemen to secure the most competitive source pricing for your operations.',
    descriptionAr: 'نختصر عليك المسافة ونصلك بأفضل المصانع المتخصصة في منتجك، لنضمن لك الحصول على السعر من المصدر مباشرة مع مطابقة أدق التفاصيل الفنية.',
    icon: 'Search',
    bgImage: '/images/supplier_research_bg.png',
  },
  {
    id: 'fallback-2', slug: 'on-ground-verification', order: 1, active: true,
    titleEn: 'On-Ground Verification', titleAr: 'التحقق الميداني والاعتماد',
    descriptionEn: 'Rigorous on-site audits of production capacity and legal compliance. Secure your investment with professional "boots on the ground" before signing any contract.',
    descriptionAr: 'لا تكتفِ بالصور؛ نحن نزور المصنع على أرض الواقع وندقق في سجلاته القانونية وقدرته الإنتاجية، لنعطيك الضوء الأخضر قبل أن تدفع ريالاً واحداً.',
    icon: 'ShieldCheck',
    bgImage: '/images/factory_audit_bg.png',
  },
  {
    id: 'fallback-3', slug: 'strict-quality-management', order: 2, active: true,
    titleEn: 'Strict Quality Management', titleAr: 'الرقابة الصارمة على الجودة',
    descriptionEn: 'Technical inspections tailored to your specific product requirements. We ensure every shipment meets international standards before leaving the source.',
    descriptionAr: 'فحص هندسي دقيق لكل قطعة قبل التعبئة. نضمن أن ما طلبته في العقد هو تماماً ما سيصل إلى مخازنك، دون مفاجآت أو عيوب تصنيعية.',
    icon: 'Settings',
    bgImage: '/images/quality_management_bg.png',
  },
  {
    id: 'fallback-4', slug: 'integrated-supply-chain', order: 3, active: true,
    titleEn: 'Integrated Supply Chain', titleAr: 'إدارة الشحن والخدمات اللوجستية',
    descriptionEn: 'Managing complex shipping and documentation for your international cargo. Reliable, efficient delivery to any destination worldwide.',
    descriptionAr: 'نتولى عنك تعقيدات الشحن الدولي، من التعاقد وحتى وصول الشحنة. نركز على التوقيت الدقيق وسلامة البضائع لتصلك جاهزة للبيع أو التشغيل.',
    icon: 'Ship',
    bgImage: '/images/integrated_logistics_bg.png',
  },
  {
    id: 'fallback-5', slug: 'legal-financial-safeguard', order: 4, active: true,
    titleEn: 'Legal & Financial Safeguard', titleAr: 'شريككم التجاري المعتمد في الصين',
    descriptionEn: 'Your official representative on the ground in China. We protect your interests and mitigate cross-border trade risks across your business.',
    descriptionAr: 'نُمثلك رسمياً أمام الجهات الصينية ونحمي حقوقك القانونية والمالية. نوفر لك الحضور الفعلي في السوق الصيني دون الحاجة لمغادرة مكتبك.',
    icon: 'FileText',
    bgImage: '/images/commercial_mandate_bg.png',
  },
]

export type ServiceData = typeof FALLBACK_SERVICES[0]

export async function ServicesOverview() {
  const dbServices = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  // Map DB services to include static bgImage (DB doesn't store bgImage yet)
  const bgImages: Record<string, string> = {
    'direct-source-procurement': '/images/supplier_research_bg.png',
    'on-ground-verification': '/images/factory_audit_bg.png',
    'strict-quality-management': '/images/quality_management_bg.png',
    'integrated-supply-chain': '/images/integrated_logistics_bg.png',
    'legal-financial-safeguard': '/images/commercial_mandate_bg.png',
  }

  const services: ServiceData[] = dbServices.length > 0
    ? dbServices.map((s: { id: string; slug: string; titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string; icon: string; order: number; active: boolean }) => ({ ...s, bgImage: bgImages[s.slug] || '/images/supplier_research_bg.png' }))
    : FALLBACK_SERVICES

  return <ServicesOverviewClient services={services} />
}
