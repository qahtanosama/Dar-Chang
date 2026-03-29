'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { logout } from '../login/actions'
import {
  LayoutDashboard, FolderOpen, Briefcase, BarChart3,
  FileText, Search, LogOut, Menu, X, Globe, Settings,
  Users, Star, Inbox, ShieldCheck, BadgeCheck
} from 'lucide-react'
import { GlobalSearch } from '@/components/admin/GlobalSearch'

function getNavItems(locale: string) {
  return [
    { href: `/${locale}/admin`, label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: `/${locale}/admin/portfolio`, label: 'Portfolio', icon: FolderOpen },
    { href: `/${locale}/admin/services`, label: 'Services', icon: Briefcase },
    { href: `/${locale}/admin/stats`, label: 'Impact Stats', icon: BarChart3 },
    { href: `/${locale}/admin/insights`, label: 'Insights', icon: FileText },
    { href: `/${locale}/admin/seo`, label: 'SEO Manager', icon: Search },
    { href: `/${locale}/admin/team`, label: 'Team Members', icon: Users },
    { href: `/${locale}/admin/testimonials`, label: 'Testimonials', icon: Star },
    { href: `/${locale}/admin/submissions`, label: 'Submissions', icon: Inbox },
    { href: `/${locale}/admin/vault`, label: 'Digital Vault', icon: ShieldCheck },
    { href: `/${locale}/admin/brands`, label: 'Brand Ticker', icon: BadgeCheck },
    { href: `/${locale}/admin/site-settings`, label: 'Site Settings', icon: Settings },
  ]
}

function SidebarContent({ pathname, locale, onClose }: { pathname: string; locale: string; onClose?: () => void }) {
  const navItems = getNavItems(locale)
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 shrink-0">
        <Link href={`/${locale}`} className="flex items-center gap-2" onClick={onClose}>
          <span className="text-lg font-bold text-slate-800 tracking-tight">Dar Chang</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">CMS</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 shrink-0 space-y-1">
        <Link
          href={`/${locale}`}
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
        >
          <Globe className="w-4 h-4 shrink-0" />
          View Website
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = getNavItems(locale)
  const activeLabel = navItems.find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  )?.label ?? 'Dashboard'

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-200 shrink-0">
        <SidebarContent pathname={pathname} locale={locale} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white shadow-xl">
            <SidebarContent pathname={pathname} locale={locale} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold text-slate-800 flex-1">{activeLabel}</h1>
          <GlobalSearch />
          <span className="text-xs text-slate-400 hidden sm:block">Dar Chang CMS</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
