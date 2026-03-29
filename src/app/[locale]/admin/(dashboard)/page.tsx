import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FolderOpen, Briefcase, BarChart3, FileText, BookOpen, ArrowRight } from 'lucide-react'

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const session = await getSession()

  const [portfolioCount, servicesCount, statsCount, insightsTotal, insightsPublished] = await Promise.all([
    prisma.portfolioItem.count(),
    prisma.service.count(),
    prisma.impactStat.count(),
    prisma.insight.count(),
    prisma.insight.count({ where: { published: true } }),
  ])

  const cards = [
    { label: 'Portfolio Items', value: portfolioCount, href: `/${locale}/admin/portfolio`, icon: FolderOpen, color: 'blue' },
    { label: 'Services', value: servicesCount, href: `/${locale}/admin/services`, icon: Briefcase, color: 'emerald' },
    { label: 'Impact Stats', value: statsCount, href: `/${locale}/admin/stats`, icon: BarChart3, color: 'amber' },
    { label: 'Insights Published', value: `${insightsPublished} / ${insightsTotal}`, href: `/${locale}/admin/insights`, icon: FileText, color: 'purple' },
  ]

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Welcome back 👋</h2>
        <p className="text-sm text-slate-500 mt-0.5">Signed in as <strong>{String(session?.email)}</strong></p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[card.color]}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
              Manage <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href={`/${locale}/admin/portfolio`} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm text-slate-600">
            <FolderOpen className="w-4 h-4 text-blue-500" />
            Add Portfolio Item
          </Link>
          <Link href={`/${locale}/admin/insights`} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm text-slate-600">
            <FileText className="w-4 h-4 text-purple-500" />
            Write an Insight
          </Link>
          <Link href={`/${locale}/admin/stats`} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm text-slate-600">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            Update Impact Stats
          </Link>
          <Link href={`/${locale}/admin/seo`} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm text-slate-600">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Edit SEO Metadata
          </Link>
        </div>
      </div>
    </div>
  )
}
