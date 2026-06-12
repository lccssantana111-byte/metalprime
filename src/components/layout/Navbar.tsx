'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown, DoorOpen, ShieldCheck, TrendingUp, GripHorizontal, Building2, Wrench } from 'lucide-react'
import { BRAND_NAME, COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'

const services = [
  { label: 'Portões', href: '/servicos/portoes', desc: 'Automáticos, basculantes e deslizantes', Icon: DoorOpen },
  { label: 'Grades e Cercas', href: '/servicos/grades-e-cercas', desc: 'Segurança com design industrial', Icon: ShieldCheck },
  { label: 'Escadas Metálicas', href: '/servicos/escadas', desc: 'Retas, helicoidais e flutuantes', Icon: TrendingUp },
  { label: 'Corrimões', href: '/servicos/corrimoes', desc: 'Inox, ferro e alumínio', Icon: GripHorizontal },
  { label: 'Estruturas Metálicas', href: '/servicos/estruturas-metalicas', desc: 'Galpões, coberturas e mezaninos', Icon: Building2 },
  { label: 'Projetos Sob Medida', href: '/servicos/sob-medida', desc: 'Qualquer metal, qualquer forma', Icon: Wrench },
]

const nav = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos', children: services },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setServicesOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // D = dark state: at top of page, navbar is dark/glass over the hero
  const D = !scrolled

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4">
      <nav
        className="mx-auto max-w-[1300px] h-[58px] flex items-center justify-between gap-6 px-3 sm:px-5 rounded-2xl"
        style={{
          transition: 'background 0.5s cubic-bezier(0.32,0.72,0,1), box-shadow 0.5s cubic-bezier(0.32,0.72,0,1), border-color 0.5s cubic-bezier(0.32,0.72,0,1)',
          background: D ? 'rgba(15,23,42,0.72)' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${D ? 'rgba(255,255,255,0.09)' : 'rgba(226,232,240,0.7)'}`,
          boxShadow: D
            ? '0 4px 24px rgba(0,0,0,0.25)'
            : '0 4px 32px rgba(15,23,42,0.09), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div style={{ transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)' }} className="group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Metalprime logo"
              width={36}
              height={36}
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </div>
          <span
            className="font-display font-black text-[20px] tracking-[0.08em] uppercase"
            style={{ color: D ? 'white' : '#0f172a', transition: 'color 0.4s' }}
          >
            {BRAND_NAME.split(' ')[0]}
            <span style={{ color: '#f97316' }}>.</span>
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <ul className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {nav.map((item) =>
            item.children ? (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 px-4 py-2.5 text-[18px] font-medium rounded-xl transition-all duration-200"
                  style={{
                    color: isActive(item.href)
                      ? (D ? 'white' : '#0f172a')
                      : (D ? 'rgba(255,255,255,0.55)' : '#64748b'),
                    background: 'transparent',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = D ? 'rgba(255,255,255,0.08)' : 'rgba(241,245,249,0.8)'; (e.currentTarget as HTMLElement).style.color = D ? 'white' : '#0f172a' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = isActive(item.href) ? (D ? 'white' : '#0f172a') : (D ? 'rgba(255,255,255,0.55)' : '#64748b') }}
                >
                  {item.label}
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-200"
                    style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full" style={{ background: '#f97316' }} />
                )}

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          minWidth: 'min(540px, calc(100vw - 3rem))',
                          boxShadow: '0 16px 48px rgba(15,23,42,0.14), 0 2px 8px rgba(15,23,42,0.05)',
                        }}
                      >
                        <div className="grid grid-cols-2 gap-1 p-2">
                          {item.children.map((child) => {
                            const Icon = child.Icon
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group/item flex items-start gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 hover:bg-[#fff7ed]"
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 group-hover/item:bg-orange-100"
                                  style={{ background: '#f1f5f9', marginTop: '1px' }}
                                >
                                  <Icon
                                    className="w-[15px] h-[15px] transition-colors duration-150 group-hover/item:text-orange-500"
                                    style={{ color: '#94a3b8' }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <span
                                    className="text-[13px] font-semibold block leading-snug transition-colors duration-150 group-hover/item:text-[#f97316]"
                                    style={{ color: '#0f172a' }}
                                  >
                                    {child.label}
                                  </span>
                                  <span className="text-[11px] block mt-0.5 leading-tight" style={{ color: '#94a3b8' }}>
                                    {child.desc}
                                  </span>
                                </div>
                              </Link>
                            )
                          })}
                        </div>

                        <div
                          className="px-5 py-3 flex items-center justify-between"
                          style={{ borderTop: '1px solid #f1f5f9', background: '#fafafa' }}
                        >
                          <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                            6 especialidades em metal
                          </span>
                          <Link
                            href="/servicos"
                            className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
                            style={{ color: '#f97316' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ea580c' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
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
                  className="relative px-4 py-2.5 text-[18px] font-medium transition-all duration-200 block rounded-xl"
                  style={{ color: isActive(item.href) ? (D ? 'white' : '#0f172a') : (D ? 'rgba(255,255,255,0.55)' : '#64748b') }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = D ? 'rgba(255,255,255,0.08)' : 'rgba(241,245,249,0.8)'; (e.currentTarget as HTMLElement).style.color = D ? 'white' : '#0f172a' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = isActive(item.href) ? (D ? 'white' : '#0f172a') : (D ? 'rgba(255,255,255,0.55)' : '#64748b') }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full" style={{ background: '#f97316' }} />
                  )}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${COMPANY_PHONE}`}
            className="text-[12px] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-mono)', color: D ? 'rgba(255,255,255,0.65)' : '#94a3b8' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = D ? 'rgba(255,255,255,0.95)' : '#0f172a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = D ? 'rgba(255,255,255,0.65)' : '#94a3b8' }}
          >
            {COMPANY_PHONE}
          </a>

          <Link
            href="/orcamento"
            className="group inline-flex items-center gap-2 text-[18px] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            style={{
              background: '#f97316',
              color: 'white',
              boxShadow: '0 2px 12px rgba(249,115,22,0.3)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#ea580c'
              el.style.boxShadow = '0 4px 20px rgba(249,115,22,0.45)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#f97316'
              el.style.boxShadow = '0 2px 12px rgba(249,115,22,0.3)'
            }}
          >
            Orçamento
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
          style={{ color: D ? 'rgba(255,255,255,0.7)' : '#64748b' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = D ? 'rgba(255,255,255,0.1)' : '#f1f5f9' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
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

      {/* Mobile menu — slide from right */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(5,8,15,0.7)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{
                width: 'min(360px, 100vw)',
                background: '#0c1220',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '-24px 0 80px rgba(0,0,0,0.5)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.5rem',
                height: '70px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
              }}>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                >
                  <img src="/logo.png" alt="Metalprime" width={30} height={30} style={{ objectFit: 'contain' }} />
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'white',
                  }}>
                    {BRAND_NAME.split(' ')[0]}<span style={{ color: '#f97316' }}>.</span>
                  </span>
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto" style={{ padding: '1rem 0' }}>
                <nav>
                  {nav.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.9rem 1.5rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1.35rem',
                          letterSpacing: '0.01em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          color: isActive(item.href) ? '#f97316' : 'rgba(255,255,255,0.85)',
                          borderLeft: isActive(item.href) ? '3px solid #f97316' : '3px solid transparent',
                          transition: 'color 0.15s, border-color 0.15s',
                        }}
                      >
                        {item.label}
                        {isActive(item.href) && (
                          <span style={{
                            fontSize: '9px',
                            fontFamily: 'var(--font-ibm-mono)',
                            letterSpacing: '0.2em',
                            color: '#f97316',
                            opacity: 0.7,
                          }}>
                            ATUAL
                          </span>
                        )}
                      </Link>

                      {/* Services submenu */}
                      {item.children && (
                        <div style={{
                          padding: '0.25rem 0 0.75rem 1.5rem',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '2px',
                        }}>
                          {item.children.map((child) => {
                            const Icon = child.Icon
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '0.6rem 0.75rem',
                                  borderRadius: '8px',
                                  textDecoration: 'none',
                                  background: isActive(child.href) ? 'rgba(249,115,22,0.08)' : 'transparent',
                                  transition: 'background 0.15s',
                                }}
                              >
                                <div style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '7px',
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  <Icon className="w-3.5 h-3.5" style={{ color: isActive(child.href) ? '#f97316' : 'rgba(255,255,255,0.4)' }} />
                                </div>
                                <span style={{
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  color: isActive(child.href) ? '#f97316' : 'rgba(255,255,255,0.55)',
                                  lineHeight: 1.3,
                                }}>
                                  {child.label}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Bottom CTAs */}
              <motion.div
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  flexShrink: 0,
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.35 }}
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(37,211,102,0.25)',
                    background: 'rgba(37,211,102,0.05)',
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '13px',
                    fontWeight: 500,
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  <svg width="16" height="16" fill="#25D366" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <Link
                  href="/orcamento"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '0.9rem',
                    borderRadius: '12px',
                    background: '#f97316',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.35)',
                    transition: 'background 0.2s',
                  }}
                >
                  Solicitar Orçamento
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
