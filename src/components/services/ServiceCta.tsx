'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'

interface Props {
  serviceName: string
}

export default function ServiceCta({ serviceName }: Props) {
  return (
    <section
      className="py-28 sm:py-40 overflow-hidden relative"
      style={{ background: '#050608', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-10" style={{ color: 'rgba(196,160,64,0.7)' }}>
            Próximo passo
          </span>
          <h2
            className="font-display font-black leading-[0.88] mb-10"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', color: '#f0f1f2', letterSpacing: '-0.025em' }}
          >
            Pronto para<br />
            <span style={{ color: '#c4a040' }}>começar?</span>
          </h2>

          <a
            href={`tel:${COMPANY_PHONE}`}
            className="block font-display font-black leading-none mb-12 transition-colors"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', color: 'rgba(240,241,242,0.2)', letterSpacing: '-0.02em' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240,241,242,0.2)' }}
          >
            {COMPANY_PHONE}
          </a>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/orcamento"
              className="group inline-flex items-center gap-3 font-bold text-[13px] tracking-[0.1em] uppercase px-10 py-[18px] transition-all duration-200"
              style={{ background: '#c4a040', color: '#050608' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
            >
              Solicitar Orçamento Gratuito
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${serviceName.toLowerCase()}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[13px] px-9 py-[18px] transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(180,188,198,0.7)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.25)'
                el.style.color = '#f0f1f2'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.12)'
                el.style.color = 'rgba(180,188,198,0.7)'
              }}
            >
              Falar pelo WhatsApp
            </a>
          </div>

          <p className="mt-10 text-[12px] font-mono" style={{ color: 'rgba(180,188,198,0.25)' }}>
            Orçamento em 24h · Visita técnica gratuita · ART inclusa em todos os projetos
          </p>
        </div>
      </div>
    </section>
  )
}
