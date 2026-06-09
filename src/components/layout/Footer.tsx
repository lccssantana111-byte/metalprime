'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Clock, Mail } from 'lucide-react'
import {
  BRAND_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  WHATSAPP_NUMBER,
} from '@/lib/constants'

const services = [
  { label: 'Portões', href: '/servicos/portoes' },
  { label: 'Grades e Cercas', href: '/servicos/grades-e-cercas' },
  { label: 'Escadas Metálicas', href: '/servicos/escadas' },
  { label: 'Corrimões', href: '/servicos/corrimoes' },
  { label: 'Estruturas Metálicas', href: '/servicos/estruturas-metalicas' },
  { label: 'Projetos Sob Medida', href: '/servicos/sob-medida' },
]

const company = [
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Solicitar Orçamento', href: '/orcamento' },
  { label: 'Contato', href: '/contato' },
]

const LOGO_MARK = (
  <img
    src="/logo.png"
    alt="Metalprime logo"
    width={32}
    height={32}
    style={{ objectFit: 'contain', display: 'block' }}
  />
)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'white', borderTop: '1px solid #e2e8f0' }}>

      {/* Main grid */}
      <div className="container mx-auto px-5 sm:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand — 4 cols */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                {LOGO_MARK}
              </div>
              <span className="font-display font-black text-[14px] tracking-[0.08em] uppercase" style={{ color: '#0f172a' }}>
                {BRAND_NAME.split(' ')[0]}
                <span style={{ color: '#f97316' }}>.</span>
              </span>
            </Link>

            <p className="text-[14px] leading-[1.8] mb-10 max-w-xs" style={{ color: '#64748b' }}>
              Excelência em engenharia metálica há mais de 20 anos.
              Estruturas para residências, condomínios, construtoras e indústrias em São Paulo.
            </p>

            {/* Contact */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <span
                  className="font-display font-bold text-[1.25rem] transition-colors"
                  style={{ color: '#0f172a' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#0f172a' }}
                >
                  {COMPANY_PHONE}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#f97316' }} />
              </a>

              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: '#cbd5e1' }} />
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-[13px] font-mono transition-colors"
                  style={{ color: '#64748b' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0f172a' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#64748b' }}
                >
                  {COMPANY_EMAIL}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#cbd5e1' }} />
                <p className="text-[12px] font-mono leading-relaxed" style={{ color: '#94a3b8' }}>
                  {COMPANY_ADDRESS}
                </p>
              </div>
            </div>
          </div>

          {/* Services — 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase mb-7" style={{ color: '#94a3b8' }}>
              Serviços
            </h3>
            <ul className="space-y-3.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[13px] transition-colors duration-200 block"
                    style={{ color: '#64748b' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0f172a' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#64748b' }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase mb-7" style={{ color: '#94a3b8' }}>
              Empresa
            </h3>
            <ul className="space-y-3.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-[13px] transition-colors duration-200 block"
                    style={{ color: '#64748b' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0f172a' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#64748b' }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li className="mt-6 space-y-2">
                <Link
                  href="/admin"
                  className="text-[11px] font-mono transition-colors duration-200 block"
                  style={{ color: '#cbd5e1' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#cbd5e1' }}
                >
                  Área Admin
                </Link>
                <Link
                  href="/corporate/dashboard"
                  className="text-[11px] font-mono transition-colors duration-200 block"
                  style={{ color: '#cbd5e1' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#cbd5e1' }}
                >
                  Portal do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento — 4 cols */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase mb-7" style={{ color: '#94a3b8' }}>
              Atendimento
            </h3>

            <div className="flex items-start gap-2.5 mb-8">
              <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#cbd5e1' }} />
              <p className="text-[13px] leading-[1.75]" style={{ color: '#64748b' }}>
                Seg–Sex das 8h às 18h<br />
                Sáb das 8h às 13h
              </p>
            </div>

            <Link
              href="/orcamento"
              className="group inline-flex items-center gap-2.5 font-semibold text-[13px] px-7 py-3.5 rounded-full transition-all duration-200 mb-10"
              style={{ background: '#0f172a', color: 'white' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#1e293b' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0f172a' }}
            >
              Solicitar Orçamento
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Social */}
            <div className="flex gap-5 mt-10">
              {[
                { label: 'Instagram', href: 'https://instagram.com/metalprime' },
                { label: 'Facebook', href: 'https://facebook.com/metalprime' },
                { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono tracking-wide transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #f1f5f9' }}>
        <div className="container mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono" style={{ color: '#94a3b8' }}>
            © {year} {BRAND_NAME}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono" style={{ color: '#cbd5e1' }}>
              CREA-SP 000000000
            </span>
            <p className="text-[11px] font-mono" style={{ color: '#cbd5e1' }}>
              São Paulo, SP — Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
