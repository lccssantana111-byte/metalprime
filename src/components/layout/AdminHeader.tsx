'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/leads': 'Leads / CRM',
  '/admin/leads/novo': 'Novo Lead',
  '/admin/orcamentos': 'Orçamentos',
  '/admin/projetos': 'Projetos',
  '/admin/projetos/novo': 'Novo Projeto',
  '/admin/portfolio': 'Portfólio',
  '/admin/portfolio/novo': 'Novo Item',
  '/admin/clientes': 'Clientes',
  '/admin/configuracoes': 'Configurações',
  '/admin/usuarios': 'Usuários',
}

function getTitle(p: string): string {
  if (PAGE_TITLES[p]) return PAGE_TITLES[p]
  if (p.startsWith('/admin/leads/')) return 'Lead'
  if (p.startsWith('/admin/orcamentos/')) return 'Orçamento'
  if (p.startsWith('/admin/projetos/')) return 'Projeto'
  if (p.startsWith('/admin/portfolio/')) return 'Portfólio'
  if (p.startsWith('/admin/clientes/')) return 'Cliente'
  return 'Admin'
}

function toInitials(email: string): string {
  const parts = email.split('@')[0].split(/[._-]/).filter(Boolean)
  return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : email.slice(0, 2).toUpperCase()
}

export default function AdminHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setEmail(data.user?.email ?? null))
  }, [])

  return (
    <header
      className="h-[52px] shrink-0 flex items-center gap-3 px-4 sm:px-6"
      style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
    >
      <button
        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-all shrink-0"
        style={{ color: '#94a3b8' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#0f172a'
          e.currentTarget.style.background = '#f1f5f9'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#94a3b8'
          e.currentTarget.style.background = 'transparent'
        }}
        onClick={onMenuToggle}
        aria-label="Menu"
      >
        <Menu className="w-4 h-4" />
      </button>

      <h1 className="font-display font-semibold text-[15px] truncate" style={{ color: '#0f172a' }}>
        {getTitle(pathname)}
      </h1>

      <div className="ml-auto flex items-center gap-3 shrink-0">
        {email && (
          <span className="hidden md:block text-[12px] font-mono truncate max-w-[180px]" style={{ color: '#94a3b8' }}>
            {email}
          </span>
        )}

        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}
        >
          <span className="font-mono font-bold text-[10px] leading-none" style={{ color: '#ea580c' }}>
            {email ? toInitials(email) : '··'}
          </span>
        </div>
      </div>
    </header>
  )
}
