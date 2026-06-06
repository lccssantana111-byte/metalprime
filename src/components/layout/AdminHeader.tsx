'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { BRAND_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/leads': 'CRM — Pipeline',
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

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/admin/leads/')) return 'Detalhe do Lead'
  if (pathname.startsWith('/admin/orcamentos/')) return 'Orçamento'
  if (pathname.startsWith('/admin/projetos/')) return 'Projeto'
  if (pathname.startsWith('/admin/portfolio/')) return 'Item do Portfólio'
  if (pathname.startsWith('/admin/clientes/')) return 'Cliente'
  return 'Admin'
}

function getInitials(email: string): string {
  const prefix = email.split('@')[0]
  const parts = prefix.split(/[._-]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return prefix.slice(0, 2).toUpperCase()
}

interface AdminHeaderProps {
  onMenuToggle: () => void
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  const initials = email ? getInitials(email) : '··'

  return (
    <header className="h-14 shrink-0 flex items-center gap-3 px-4 sm:px-6 bg-graphite/90 backdrop-blur-md border-b border-metal-dark/30">
      {/* Mobile: hamburger + logo */}
      <button
        className="lg:hidden w-9 h-9 flex items-center justify-center text-metal hover:text-white transition-colors rounded-lg hover:bg-steel/40 shrink-0"
        onClick={onMenuToggle}
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="lg:hidden flex items-center gap-2 shrink-0">
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 bg-amber-brand rotate-45" />
          <div className="absolute inset-[2px] bg-graphite rotate-45" />
          <div className="absolute inset-[4px] bg-amber-brand rotate-45" />
        </div>
        <span className="font-display font-bold text-sm text-white tracking-wide">
          {BRAND_NAME.split(' ')[0]}
          <span className="text-amber-brand">.</span>
        </span>
      </div>

      {/* Desktop: page title */}
      <div className="hidden lg:flex items-center gap-2.5 min-w-0">
        <span className="text-metal-dark text-xs tracking-widest uppercase font-mono select-none">
          /
        </span>
        <h1 className="font-display font-semibold text-white text-sm truncate">
          {title}
        </h1>
      </div>

      {/* Mobile: page title (smaller) */}
      <div className="lg:hidden flex-1 min-w-0">
        <span className="font-display font-semibold text-white text-sm truncate block">{title}</span>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2 shrink-0">
        {/* Ver site — desktop only */}
        <Link
          href="/"
          target="_blank"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-metal hover:text-white border border-metal-dark/40 hover:border-metal/40 rounded-lg transition-all duration-200 group"
        >
          <ExternalLink className="w-3 h-3 group-hover:text-amber-brand transition-colors" />
          Ver site
        </Link>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          {email && (
            <span className="hidden sm:block text-xs text-metal-dark truncate max-w-[140px]">
              {email}
            </span>
          )}
          <div
            className={cn(
              'w-8 h-8 rounded-lg bg-amber-brand/15 border border-amber-brand/30',
              'flex items-center justify-center shrink-0',
            )}
          >
            <span className="font-display font-bold text-[11px] text-amber-brand leading-none">
              {initials}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
