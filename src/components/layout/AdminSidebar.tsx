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
      className="w-[260px] h-full flex flex-col"
      style={{ background: '#ffffff', borderRight: '1px solid #e2e8f0' }}
    >
      {/* Logo */}
      <div
        className="h-[64px] flex items-center gap-3 px-5 shrink-0"
        style={{ borderBottom: '1px solid #f1f5f9' }}
      >
        <img
          src="/logo.png"
          alt="Metal Shark logo"
          width={34}
          height={34}
          style={{ objectFit: 'contain', display: 'block' }}
        />
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-display font-bold text-[15px] tracking-wider truncate" style={{ color: '#0f172a' }}>
            {BRAND_NAME.split(' ')[0]}
            <span style={{ color: '#f97316' }}>.</span>
          </span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase shrink-0" style={{ color: '#cbd5e1' }}>
            admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p
              className="px-2 pb-2 text-[10px] font-semibold tracking-[0.18em] uppercase select-none"
              style={{ color: '#cbd5e1' }}
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
                      'relative flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-100',
                    )}
                    style={{
                      background: active ? '#fff7ed' : 'transparent',
                      color: active ? '#ea580c' : '#64748b',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = '#f8fafc'
                        e.currentTarget.style.color = '#0f172a'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#64748b'
                      }
                    }}
                  >
                    {active && (
                      <span
                        className="absolute left-0 rounded-r-full"
                        style={{ top: '6px', bottom: '6px', width: '3px', background: '#f97316' }}
                      />
                    )}
                    <item.icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: active ? '#f97316' : '#94a3b8' }}
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
        className="px-3 py-3 shrink-0 space-y-0.5"
        style={{ borderTop: '1px solid #f1f5f9' }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-all duration-100"
          style={{ color: '#94a3b8' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0f172a'
            e.currentTarget.style.background = '#f8fafc'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94a3b8'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-all duration-100 w-full text-left"
          style={{ color: '#94a3b8' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#dc2626'
            e.currentTarget.style.background = '#fef2f2'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94a3b8'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
