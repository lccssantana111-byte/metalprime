'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'

const differentials = [
  'Equipe própria de engenheiros e soldadores certificados',
  'Fabricação própria, sem terceirizar nenhuma etapa',
  'ART em 100% dos projetos estruturais (você não se preocupa com a vistoria)',
  'Atendemos toda Grande São Paulo e interior',
  'Garantia de 5 anos em peças estruturais',
  '+500 condomínios que renovam contratos conosco',
]

export default function SobreCTA() {
  return (
    <section style={{ background: '#ffffff', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '32px', height: '1px', background: '#f97316', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#f97316',
              }}>
                Por que a Metalprime
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#0f172a',
              marginBottom: '1.25rem',
            }}>
              O que você não<br />
              encontra em<br />
              <span style={{ color: '#f97316' }}>qualquer serralheria</span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: '#64748b',
              marginBottom: '2.5rem',
              maxWidth: '380px',
            }}>
              A maioria terceiriza, improvisa e entrega sem ART. Aqui é diferente.
              Fale com um engenheiro: visita técnica gratuita, orçamento em 24h.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 font-bold text-sm tracking-wide px-8 py-4"
                style={{ background: '#f97316', color: '#ffffff' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ea580c' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#f97316' }}
              >
                Solicitar Orçamento Gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-8 py-4 transition-all duration-200"
                style={{ border: '1px solid #e2e8f0', color: '#475569' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#0f172a'
                  el.style.color = '#0f172a'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#e2e8f0'
                  el.style.color = '#475569'
                }}
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>

          <div>
            {differentials.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: i < differentials.length - 1 ? '1px solid #e2e8f0' : 'none' }}
              >
                <CheckCircle style={{ width: '18px', height: '18px', color: '#f97316', flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontSize: '14px', color: '#334155', lineHeight: 1.65 }}>
                  {d}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
