'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BRAND_NAME, COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'

const services = [
  { label: 'Portões', href: '/servicos/portoes' },
  { label: 'Grades e Cercas', href: '/servicos/grades-e-cercas' },
  { label: 'Escadas', href: '/servicos/escadas' },
  { label: 'Corrimões', href: '/servicos/corrimoes' },
  { label: 'Estruturas Metálicas', href: '/servicos/estruturas-metalicas' },
  { label: 'Sob Medida', href: '/servicos/sob-medida' },
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
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
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
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-carbon/98 backdrop-blur-md border-b border-white/5 py-0'
          : 'bg-transparent py-0',
      )}
    >
      <nav className="container mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-7 h-7 shrink-0">
            <div className="absolute inset-0 bg-amber-brand rotate-45 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-[3px] bg-carbon rotate-45" />
            <div className="absolute inset-[6px] bg-amber-brand rotate-45" />
          </div>
          <span className="font-display font-bold text-base tracking-wider text-white uppercase">
            {BRAND_NAME.split(' ')[0]}
            <span className="text-amber-brand">.</span>
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {nav.map((item) =>
            item.children ? (
              <li key={item.href} className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-sm transition-colors duration-200 relative',
                    isActive(item.href) ? 'text-white' : 'text-metal hover:text-white',
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', servicesOpen && 'rotate-180')} />
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-amber-brand" />
                  )}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="absolute top-full left-0 pt-3"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="bg-carbon/98 backdrop-blur-md border border-white/8 shadow-2xl py-2 min-w-[220px]">
                        {/* Top accent */}
                        <div className="absolute top-0 left-6 right-6 h-px bg-amber-brand/60" />
                        {item.children.map((child, i) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-5 py-2.5 text-sm text-metal hover:text-white hover:bg-white/4 transition-all duration-150 group/item"
                          >
                            <span className="text-[10px] text-metal-dark font-mono group-hover/item:text-amber-brand transition-colors">
                              0{i + 1}
                            </span>
                            {child.label}
                          </Link>
                        ))}
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
                    'relative px-4 py-2 text-sm transition-colors duration-200 block',
                    isActive(item.href) ? 'text-white' : 'text-metal hover:text-white',
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-amber-brand" />
                  )}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={`tel:${COMPANY_PHONE}`}
            className="flex items-center gap-2 text-xs text-metal hover:text-white transition-colors duration-200 tracking-wide"
          >
            <Phone className="w-3.5 h-3.5 text-amber-brand" />
            {COMPANY_PHONE}
          </a>
          <Link
            href="/orcamento"
            className="bg-amber-brand hover:bg-amber-light text-carbon font-bold text-xs tracking-wide uppercase px-5 py-2.5 transition-colors duration-200"
          >
            Orçamento
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-metal-light hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
            className="lg:hidden fixed inset-0 top-16 bg-carbon z-30"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h-full overflow-y-auto px-6 py-10 flex flex-col">
              <nav className="flex-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-5 font-display font-bold text-3xl border-b border-white/6 transition-colors',
                        isActive(item.href) ? 'text-amber-brand' : 'text-white/80 hover:text-white',
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-4 py-3 flex flex-col gap-0">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-2 text-sm text-metal hover:text-metal-light transition-colors"
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
                className="pt-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-metal-light text-sm"
                >
                  <Phone className="w-4 h-4 text-amber-brand" />
                  {COMPANY_PHONE}
                </a>
                <Link
                  href="/orcamento"
                  className="block w-full bg-amber-brand hover:bg-amber-light text-carbon font-bold text-center py-4 text-sm tracking-wide uppercase transition-colors"
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
