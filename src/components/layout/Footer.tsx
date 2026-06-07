'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
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
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
    <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="#c4a040" strokeWidth="1.5" fill="none" />
    <path d="M14 7L21 11V17L14 21L7 17V11L14 7Z" fill="#c4a040" fillOpacity="0.12" stroke="#c4a040" strokeWidth="1" />
    <circle cx="14" cy="14" r="2.5" fill="#c4a040" />
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#050608', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Main grid */}
      <div className="container mx-auto px-5 sm:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand — 4 cols */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                {LOGO_MARK}
              </div>
              <span className="font-display font-black text-[14px] tracking-[0.12em] uppercase" style={{ color: '#f0f1f2' }}>
                {BRAND_NAME.split(' ')[0]}
                <span style={{ color: '#c4a040' }}>.</span>
              </span>
            </Link>

            <p className="text-[14px] leading-[1.8] mb-10 max-w-xs" style={{ color: 'rgba(180,188,198,0.45)' }}>
              Excelência em engenharia metálica há mais de 20 anos.
              Estruturas para residências, condomínios, construtoras e indústrias em São Paulo.
            </p>

            {/* Contact highlight */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-colors"
                style={{ color: 'rgba(180,188,198,0.5)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f0f1f2' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.5)' }}
              >
                <span className="font-display font-bold text-[1.25rem]" style={{ color: '#c4a040' }}>
                  {COMPANY_PHONE}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="block text-[13px] font-mono transition-colors"
                style={{ color: 'rgba(180,188,198,0.3)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#b4bcc6' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.3)' }}
              >
                {COMPANY_EMAIL}
              </a>
              <p className="text-[12px] font-mono" style={{ color: 'rgba(180,188,198,0.2)' }}>
                {COMPANY_ADDRESS}
              </p>
            </div>
          </div>

          {/* Services — 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(180,188,198,0.25)' }}>
              Serviços
            </h3>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[13px] transition-colors duration-200 block"
                    style={{ color: 'rgba(180,188,198,0.45)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f0f1f2' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.45)' }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(180,188,198,0.25)' }}>
              Empresa
            </h3>
            <ul className="space-y-4">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-[13px] transition-colors duration-200 block"
                    style={{ color: 'rgba(180,188,198,0.45)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f0f1f2' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.45)' }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-[12px] font-mono transition-colors duration-200 block mt-6"
                  style={{ color: 'rgba(180,188,198,0.15)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.35)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.15)' }}
                >
                  Área Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA block — 4 cols */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(180,188,198,0.25)' }}>
              Atendimento
            </h3>
            <p className="text-[13px] leading-[1.8] mb-8" style={{ color: 'rgba(180,188,198,0.35)' }}>
              Seg–Sex das 8h às 18h<br />
              Sáb das 8h às 13h
            </p>
            <Link
              href="/orcamento"
              className="group inline-flex items-center gap-3 font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200"
              style={{ background: '#c4a040', color: '#050608' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
            >
              Solicitar Orçamento
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Social */}
            <div className="flex gap-3 mt-8">
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
                  className="text-[11px] font-mono transition-colors"
                  style={{ color: 'rgba(180,188,198,0.2)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.5)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.2)' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono" style={{ color: 'rgba(180,188,198,0.2)' }}>
            © {year} {BRAND_NAME}. Todos os direitos reservados.
          </p>
          <p className="text-[11px] font-mono" style={{ color: 'rgba(180,188,198,0.15)' }}>
            São Paulo, SP — Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
