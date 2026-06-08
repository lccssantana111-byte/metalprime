'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Image,
  Building2,
  Settings,
  UserCog,
  LogOut,
  ExternalLink,
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

interface Props {
  onClose?: () => void
}

export default function AdminSidebar({ onClose }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside
      className="w-[220px] h-full flex flex-col"
      style={{
        background: '#0b0d10',
        borderRight: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Logo — height matches header */}
      <div
        className="h-[52px] flex items-center gap-2.5 px-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="relative w-5 h-5 shrink-0">
          <div className="absolute inset-0 bg-amber-brand rotate-45" />
          <div className="absolute inset-[2px] rotate-45" style={{ background: '#0b0d10' }} />
          <div className="absolute inset-[4px] bg-amber-brand rotate-45" />
        </div>
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="font-display font-bold text-[13px] text-foreground tracking-wider truncate">
            {BRAND_NAME.split(' ')[0]}
            <span className="text-amber-brand">.</span>
          </span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase shrink-0" style={{ color: 'rgba(0,0,0,0.20)' }}>
            admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p
              className="px-2 pb-1 text-[10px] font-semibold tracking-[0.18em] uppercase select-none"
              style={{ color: 'rgba(0,0,0,0.20)' }}
            >
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'relative flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium transition-all duration-100',
                      active
                        ? 'text-foreground'
                        : 'hover:text-foreground/75',
                    )}
                    style={{
                      background: active ? 'rgba(0,0,0,0.08)' : undefined,
                      color: active ? '#fff' : 'rgba(0,0,0,0.35)',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {/* Active indicator */}
                    {active && (
                      <span
                        className="absolute left-0 rounded-r-full"
                        style={{
                          top: '6px',
                          bottom: '6px',
                          width: '2px',
                          background: '#c8860a',
                        }}
                      />
                    )}
                    <item.icon
                      className="w-3.5 h-3.5 shrink-0 transition-colors"
                      style={{ color: active ? '#c8860a' : 'rgba(0,0,0,0.20)' }}
                    />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-2 py-2 shrink-0 space-y-0.5"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] transition-all duration-100"
          style={{ color: 'rgba(0,0,0,0.25)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(0,0,0,0.55)'
            e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(0,0,0,0.25)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] transition-all duration-100 w-full text-left"
          style={{ color: 'rgba(0,0,0,0.25)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f87171'
            e.currentTarget.style.background = 'rgba(239,68,68,0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(0,0,0,0.25)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
