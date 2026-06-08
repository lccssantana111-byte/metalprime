'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BRAND_NAME, COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'

const services = [
  { label: 'Portões', href: '/servicos/portoes', desc: 'Automáticos, basculantes e deslizantes' },
  { label: 'Grades e Cercas', href: '/servicos/grades-e-cercas', desc: 'Segurança com design industrial' },
  { label: 'Escadas Metálicas', href: '/servicos/escadas', desc: 'Retas, helicoidais e flutuantes' },
  { label: 'Corrimões', href: '/servicos/corrimoes', desc: 'Inox, ferro e alumínio' },
  { label: 'Estruturas Metálicas', href: '/servicos/estruturas-metalicas', desc: 'Galpões, coberturas e mezaninos' },
  { label: 'Projetos Sob Medida', href: '/servicos/sob-medida', desc: 'Qualquer metal, qualquer forma' },
]

const nav = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos', children: services },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contato', href: '/contato' },
]

const LOGO_MARK = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="#c4a040" strokeWidth="1.5" fill="none" />
    <path d="M14 7L21 11V17L14 21L7 17V11L14 7Z" fill="#c4a040" fillOpacity="0.15" stroke="#c4a040" strokeWidth="1" />
    <circle cx="14" cy="14" r="2.5" fill="#c4a040" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#f7f5f2]/97 backdrop-blur-xl border-b'
          : 'bg-transparent',
      )}
      style={{
        borderBottomColor: scrolled ? 'rgba(0,0,0,0.09)' : 'transparent',
      }}
    >
      <nav className="container mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="transition-transform duration-300 group-hover:scale-105">
            {LOGO_MARK}
          </div>
          <span className="font-display font-black text-[15px] tracking-[0.12em] uppercase text-[#1e2328]">
            {BRAND_NAME.split(' ')[0]}
            <span style={{ color: '#c4a040' }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {nav.map((item) =>
            item.children ? (
              <li
                key={item.href}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 tracking-wide',
                    isActive(item.href)
                      ? 'text-[#1e2328]'
                      : 'text-[#607080] hover:text-[#1e2328]',
                  )}
                >
                  {item.label}
                  <ChevronRight
                    className={cn(
                      'w-3 h-3 transition-transform duration-200',
                      servicesOpen ? 'rotate-90' : '',
                    )}
                  />
                  {isActive(item.href) && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ background: '#c4a040' }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div
                        className="shadow-2xl overflow-hidden"
                        style={{
                          background: '#eeeae3',
                          border: '1px solid rgba(0,0,0,0.10)',
                          minWidth: '480px',
                        }}
                      >
                        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #c4a040, transparent)' }} />
                        <div className="grid grid-cols-2 gap-px p-1">
                          {item.children.map((child, i) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex flex-col gap-0.5 px-5 py-4 transition-colors duration-150"
                              style={{}}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <span className="flex items-center gap-2 text-[13px] font-medium text-[#1e2328]">
                                <span
                                  className="font-mono text-[9px] tracking-widest"
                                  style={{ color: 'rgba(196,160,64,0.6)' }}
                                >
                                  0{i + 1}
                                </span>
                                {child.label}
                              </span>
                              <span className="text-[11px]" style={{ color: '#8a9199' }}>
                                {child.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="px-6 py-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                          <span className="text-[11px] font-mono" style={{ color: '#8a9199' }}>
                            Todos os serviços
                          </span>
                          <Link
                            href="/servicos"
                            className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide transition-colors"
                            style={{ color: '#c4a040' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4b454' }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
                          >
                            Ver todos
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 block tracking-wide',
                    isActive(item.href)
                      ? 'text-[#1e2328]'
                      : 'text-[#607080] hover:text-[#1e2328]',
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ background: '#c4a040' }}
                    />
                  )}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a
            href={`tel:${COMPANY_PHONE}`}
            className="text-[12px] font-mono transition-colors duration-200"
            style={{ color: '#607080' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#1e2328' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1e2328' }}
          >
            {COMPANY_PHONE}
          </a>
          <Link
            href="/orcamento"
            className="text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-2.5 transition-all duration-200"
            style={{ background: '#c4a040', color: '#050608' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
          >
            Orçamento Gratuito
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors"
          style={{ color: '#607080' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#1e2328' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1e2328' }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-[72px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: '#f7f5f2' }}
          >
            {/* Top gold line */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #c4a040, transparent)' }} />

            <div className="h-full overflow-y-auto px-6 pt-8 pb-16 flex flex-col">
              <nav className="flex-1 space-y-0">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="block py-5 font-display font-black text-[2rem] transition-colors leading-none"
                      style={{
                        color: isActive(item.href) ? '#c4a040' : '#1e2328',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="py-3 pl-4 grid grid-cols-2 gap-x-4 gap-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-1.5 text-[13px] transition-colors"
                            style={{ color: '#8a9199' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#1e2328' }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8a9199' }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="pt-8 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-4 text-[14px] font-mono"
                  style={{ color: '#8a9199', border: '1px solid rgba(0,0,0,0.10)' }}
                >
                  {COMPANY_PHONE}
                </a>
                <Link
                  href="/orcamento"
                  className="block w-full text-center py-4 text-[13px] font-bold tracking-[0.12em] uppercase transition-colors"
                  style={{ background: '#c4a040', color: '#050608' }}
                >
                  Solicitar Orçamento Gratuito
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
