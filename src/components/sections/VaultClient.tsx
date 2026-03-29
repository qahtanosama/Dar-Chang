'use client'

import { useState } from 'react'
import { CheckCircle2, ShieldCheck, FileCheck, BadgeCheck, ScrollText, Box, Building2, Scale, Anchor, FileText, Globe, Search, Package, Layers, Truck, Settings, Wrench, Zap, Factory, Star, Cpu, Cog } from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-accent-gold" />,
  Scale: <Scale className="w-6 h-6 text-accent-gold" />,
  FileCheck: <FileCheck className="w-6 h-6 text-accent-gold" />,
  Anchor: <Anchor className="w-6 h-6 text-accent-gold" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-accent-gold" />,
  ScrollText: <ScrollText className="w-6 h-6 text-accent-gold" />,
  BadgeCheck: <BadgeCheck className="w-6 h-6 text-accent-gold" />,
  Box: <Box className="w-6 h-6 text-accent-gold" />,
  FileText: <FileText className="w-6 h-6 text-accent-gold" />,
  Globe: <Globe className="w-6 h-6 text-accent-gold" />,
  Search: <Search className="w-6 h-6 text-accent-gold" />,
  Package: <Package className="w-6 h-6 text-accent-gold" />,
  Layers: <Layers className="w-6 h-6 text-accent-gold" />,
  Truck: <Truck className="w-6 h-6 text-accent-gold" />,
  Settings: <Settings className="w-6 h-6 text-accent-gold" />,
  Wrench: <Wrench className="w-6 h-6 text-accent-gold" />,
  Zap: <Zap className="w-6 h-6 text-accent-gold" />,
  Factory: <Factory className="w-6 h-6 text-accent-gold" />,
  Star: <Star className="w-6 h-6 text-accent-gold" />,
  Cpu: <Cpu className="w-6 h-6 text-accent-gold" />,
  Cog: <Cog className="w-6 h-6 text-accent-gold" />,
}

const STATUS_COLORS: Record<string, string> = {
  Verified: 'text-green-400 bg-green-500/10 border-green-500/20',
  Active: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Expired: 'text-red-400 bg-red-500/10 border-red-500/20',
}

type Doc = {
  id: string
  titleEn: string; titleAr: string
  descriptionEn: string; descriptionAr: string
  categoryEn: string; categoryAr: string
  icon: string
  status: string
  validUntil: string
  documentUrl: string
}

const SOP_TIMELINE = [
  {
    phase: '01', title: 'Partner Standards', titleAr: 'معايير الشركاء',
    desc: 'Strict criteria used to vet and verify all global suppliers against international benchmarks.',
    descAr: 'معايير صارمة تستخدم لتقييم جميع الموردين العالميين والتحقق منهم وفقًا للمقاييس الدولية.',
    icon: <BadgeCheck className="w-5 h-5 text-accent-gold" />,
  },
  {
    phase: '02', title: 'Inspection Protocols', titleAr: 'بروتوكولات التفتيش',
    desc: 'Detailed pre-shipment inspections and third-party verification performed at the source factory.',
    descAr: 'عمليات تفتيش مفصلة قبل الشحن والتحقق من قبل طرف ثالث تتم في مصنع المنشأ.',
    icon: <ScrollText className="w-5 h-5 text-accent-gold" />,
  },
  {
    phase: '03', title: 'Supervision Oversight', titleAr: 'الإشراف والرقابة',
    desc: 'Documentation of supervised container loading to ensure cargo integrity and prevent transit damage.',
    descAr: 'توثيق عمليات شحن الحاويات تحت الإشراف لضمان سلامة البضائع ومنع التلف أثناء النقل.',
    icon: <Box className="w-5 h-5 text-accent-gold" />,
  },
  {
    phase: '04', title: 'Contractual Accuracy', titleAr: 'الدقة التعاقدية',
    desc: 'Systematic assurance that all physical shipments strictly match the signed POs and specifications.',
    descAr: 'ضمان منهجي بأن جميع الشحنات المادية تتطابق تمامًا مع طلبات الشراء والمواصفات الموقعة.',
    icon: <FileCheck className="w-5 h-5 text-accent-gold" />,
  },
]

export function VaultClient({ docs, locale }: { docs: Doc[]; locale: string }) {
  const isRtl = locale === 'ar'
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null)

  // Group docs by category
  const grouped: Record<string, { categoryAr: string; docs: Doc[] }> = {}
  for (const doc of docs) {
    const key = doc.categoryEn || 'General'
    if (!grouped[key]) grouped[key] = { categoryAr: doc.categoryAr, docs: [] }
    grouped[key].docs.push(doc)
  }

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center md:text-start mb-20 md:mb-28 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <ShieldCheck className="w-6 h-6 text-accent-gold" />
              <span className="text-accent-gold font-bold tracking-wider uppercase text-sm">
                {isRtl ? 'تأكيد الأمن والثقة' : 'Security & Trust Verification'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
              {isRtl ? 'القبو' : 'The Digital'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-600">
                {isRtl ? ' الرقمي.' : 'Vault.'}
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              {isRtl
                ? 'عمليات أرضية شفافة وموثقة قانونيًا وموثقة فعليًا في شنغهاي. يمكنك الوصول إلى أوراق الاعتماد الأساسية وإجراءات التشغيل القياسية الخاصة بنا.'
                : 'Transparent, legally sound, and physically verified ground operations in Shanghai. Access our core credentials and Standard Operating Procedures.'}
            </p>
          </div>
        </div>

        {/* Document sections grouped by category */}
        {Object.entries(grouped).map(([categoryEn, group]) => (
          <div key={categoryEn} className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-gold block" />
              {isRtl ? group.categoryAr : categoryEn}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.docs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-accent-gold/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary-dark/80 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {ICON_MAP[doc.icon] ?? <ShieldCheck className="w-6 h-6 text-accent-gold" />}
                    </div>
                    <div className={`flex items-center gap-1.5 border px-2.5 py-1 rounded text-xs font-semibold ${STATUS_COLORS[doc.status] ?? STATUS_COLORS.Active}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isRtl
                        ? doc.status === 'Verified' ? 'موثق' : doc.status === 'Active' ? 'نشط' : 'منتهي'
                        : doc.status}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {isRtl ? doc.titleAr : doc.titleEn}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2">
                      {isRtl ? doc.descriptionAr : doc.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/10 pt-4">
                      <span>{doc.validUntil}</span>
                      <span className="text-accent-gold group-hover:underline underline-offset-2">
                        {isRtl ? 'عرض المستند' : 'View Document'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SOP Timeline */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="mb-12 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isRtl ? 'إجراءات التشغيل القياسية للتنفيذ' : 'Implementation SOPs'}
            </h2>
            <p className="text-gray-400 max-w-2xl">
              {isRtl
                ? 'إثبات خبرتنا العملية في إدارة سلاسل التوريد المعقدة من الصين إلى الأسواق الدولية من خلال التحقق الزمني الصارم.'
                : 'Demonstrating our hands-on expertise in managing complex supply chains from China to international markets through strict chronological verification.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {SOP_TIMELINE.map((step, idx) => (
              <div key={idx} className="relative">
                {idx !== SOP_TIMELINE.length - 1 && (
                  <div className={'hidden lg:block absolute top-8 w-[calc(100%+48px)] h-px border-t border-dashed border-white/20 z-0 ' + (isRtl ? 'right-[calc(100%-24px)]' : 'left-[calc(100%-24px)]')} />
                )}
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">{step.phase}</span>
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{isRtl ? step.titleAr : step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{isRtl ? step.descAr : step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF viewer modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[100] bg-primary-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
            <div className="h-16 bg-[#252526] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent-gold" />
                <span className="text-sm font-semibold text-white tracking-wide">
                  {isRtl ? selectedDoc.titleAr : selectedDoc.titleEn}.pdf —{' '}
                  {isRtl ? 'مُحَمَّل بعلامة مائية' : 'Watermark Protected'}
                </span>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {selectedDoc.documentUrl ? (
                <iframe
                  src={selectedDoc.documentUrl}
                  className="w-full h-full border-0"
                  title={isRtl ? selectedDoc.titleAr : selectedDoc.titleEn}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none rotate-[-30deg]">
                    <span className="text-8xl font-black tracking-widest text-white">DAR CHANG OFFICIAL</span>
                  </div>
                  <div className="text-center z-10">
                    <FileCheck className="w-20 h-20 text-accent-gold/50 mx-auto mb-6" />
                    <p className="text-xl font-medium text-white mb-2">{isRtl ? 'عارض PDF الآمن' : 'Secure PDF Viewer'}</p>
                    <p className="text-sm text-gray-500">{isRtl ? 'تم استرداد المستند من التخزين المشفر.' : 'Document retrieved from encrypted storage.'}</p>
                    <p className="text-xs text-accent-gold mt-8 border border-accent-gold/20 bg-accent-gold/10 px-4 py-2 rounded-full inline-block">
                      Verified: Shanghai Administration for Industry and Commerce
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
