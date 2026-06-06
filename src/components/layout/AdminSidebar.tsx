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

const navGroups = [
  {
    label: 'Principal',
    items: [
      { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { href: '/admin/leads', icon: Users, label: 'Leads / CRM' },
      { href: '/admin/orcamentos', icon: FileText, label: 'Orçamentos' },
      { href: '/admin/projetos', icon: FolderOpen, label: 'Projetos' },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { href: '/admin/portfolio', icon: Image, label: 'Portfólio' },
      { href: '/admin/clientes', icon: Building2, label: 'Clientes' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
      { href: '/admin/usuarios', icon: UserCog, label: 'Usuários' },
    ],
  },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  function handleLinkClick() {
    onClose?.()
  }

  return (
    <aside
      className={cn(
        'fixed lg:sticky inset-y-0 left-0 z-30',
        'w-60 shrink-0 bg-graphite border-r border-metal-dark/30 flex flex-col h-screen',
        'transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      {/* Logo */}
      <div className="p-5 border-b border-metal-dark/20 shrink-0">
        <Link href="/admin" onClick={handleLinkClick} className="flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 border border-amber-brand/40 rounded-sm rotate-45" />
            <div className="absolute inset-1.5 bg-amber-brand rounded-sm rotate-45" />
          </div>
          <div>
            <span className="font-display font-semibold text-white text-sm">
              {BRAND_NAME.split(' ')[0]}
              <span className="text-amber-brand">.</span>
            </span>
            <p className="text-[10px] font-normal text-metal-dark tracking-widest uppercase leading-none mt-0.5">
              admin
            </p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-metal-dark px-3 mb-1.5">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                        active
                          ? 'bg-amber-brand/10 text-amber-brand'
                          : 'text-metal hover:text-white hover:bg-steel/40',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          active ? 'text-amber-brand' : 'text-metal-dark group-hover:text-metal',
                        )}
                      />
                      {item.label}
                      {active && (
                        <span className="ml-auto w-1 h-1 rounded-full bg-amber-brand shrink-0" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-metal-dark/20 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-metal hover:text-red-400 transition-colors w-full rounded-lg hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
