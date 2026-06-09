'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react'
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
  { label: 'Orçamento', href: '/orcamento' },
  { label: 'Contato', href: '/contato' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111] text-white">

      {/* CTA faixa */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-display font-black text-[clamp(1.5rem,3vw,2.2rem)] leading-tight tracking-tight uppercase text-white max-w-xl">
            Pronto para começar<br />seu projeto?
          </p>
          <Link
            href="/orcamento"
            className="group inline-flex items-center gap-2 bg-brand text-white font-semibold text-[13px] px-6 py-3.5 transition-colors hover:bg-brand-hover shrink-0"
          >
            Solicitar orçamento
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-7">
              <img src="/logo.png" alt="Metalprime" width={28} height={28} className="object-contain brightness-0 invert" />
              <span className="font-display font-black text-[13px] tracking-widest uppercase text-white">
                {BRAND_NAME.split(' ')[0]}<span className="text-brand">.</span>
              </span>
            </Link>

            <p className="text-[13px] leading-relaxed text-white/40 mb-8 max-w-[260px]">
              Engenharia metálica há mais de 20 anos. Residências, condomínios, construtoras e indústrias em São Paulo.
            </p>

            <div className="space-y-3">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 group">
                <Phone className="w-3.5 h-3.5 text-white/20" />
                <span className="font-display font-bold text-[1.1rem] text-white group-hover:text-brand transition-colors">
                  {COMPANY_PHONE}
                </span>
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`}
                className="flex items-center gap-2.5 group">
                <Mail className="w-3.5 h-3.5 text-white/20" />
                <span className="text-[12px] text-white/40 group-hover:text-white/80 transition-colors font-mono">
                  {COMPANY_EMAIL}
                </span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-white/20 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/30 font-mono leading-relaxed">
                  {COMPANY_ADDRESS}
                </span>
              </div>
            </div>
          </div>

          {/* Serviços */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-6">Serviços</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}
                    className="text-[13px] text-white/50 hover:text-white transition-colors block">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-6">Empresa</p>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}
                    className="text-[13px] text-white/50 hover:text-white transition-colors block">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horários + redes */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-6">Atendimento</p>

            <div className="space-y-1.5 mb-8">
              <div className="flex justify-between text-[12px] font-mono">
                <span className="text-white/30">Seg – Sex</span>
                <span className="text-white/60">8h – 18h</span>
              </div>
              <div className="flex justify-between text-[12px] font-mono">
                <span className="text-white/30">Sábado</span>
                <span className="text-white/60">8h – 13h</span>
              </div>
            </div>

            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">Redes</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Instagram', href: 'https://instagram.com/metalprime' },
                { label: 'Facebook', href: 'https://facebook.com/metalprime' },
                { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-white/50 hover:text-brand transition-colors w-fit">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-white/20">
            © {year} {BRAND_NAME}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 text-[10px] font-mono text-white/15">
            <span>CREA-SP 000000000</span>
            <span className="text-white/10">·</span>
            <span>São Paulo, SP</span>
          </div>
        </div>
      </div>

    </footer>
  )
}
