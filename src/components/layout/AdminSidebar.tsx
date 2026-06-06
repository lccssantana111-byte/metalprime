'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Image,
  Settings,
  UserCog,
  LogOut,
  Building2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { BRAND_NAME } from '@/lib/constants'

const nav = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/leads', icon: Users, label: 'Leads / CRM' },
  { href: '/admin/orcamentos', icon: FileText, label: 'Orçamentos' },
  { href: '/admin/projetos', icon: FolderOpen, label: 'Projetos' },
  { href: '/admin/portfolio', icon: Image, label: 'Portfólio' },
  { href: '/admin/clientes', icon: Building2, label: 'Clientes' },
  { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
  { href: '/admin/usuarios', icon: UserCog, label: 'Usuários' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-60 shrink-0 bg-graphite border-r border-metal-dark/30 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-metal-dark/20">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-amber-brand/40 rounded-sm rotate-45" />
            <div className="absolute inset-1.5 bg-amber-brand rounded-sm rotate-45" />
          </div>
          <span className="font-display font-semibold text-white">
            {BRAND_NAME.split(' ')[0]}
            <span className="text-amber-brand">.</span>
            <span className="text-xs font-normal text-metal-dark ml-1">admin</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-amber-brand/10 text-amber-brand border border-amber-brand/20'
                      : 'text-metal hover:text-white hover:bg-steel/40',
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-metal-dark/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-sm text-metal hover:text-white transition-colors rounded-lg hover:bg-steel/30"
        >
          <Building2 className="w-4 h-4" />
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-metal hover:text-red-400 transition-colors w-full rounded-lg hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
