'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { SectionLabel, CTAButton } from '@/components/ui/design-system'

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
    <section style={{ background: '#0f172a', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Esquerda */}
          <div className="lg:sticky" style={{ top: '8rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionLabel label="Por que a Metalprime" />
            </div>

            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase' as const,
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}>
              O que você não<br />
              encontra em<br />
              <span style={{ color: '#f97316' }}>qualquer serralheria</span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '3rem',
              maxWidth: '38ch',
            }}>
              A maioria terceiriza, improvisa e entrega sem ART. Aqui é diferente.
              Fale com um engenheiro: visita técnica gratuita, orçamento em 24h.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <CTAButton
                variant="primary"
                href="/orcamento"
                iconCircle
                icon={<ArrowRight style={{ width: '14px', height: '14px' }} />}
              >
                Solicitar Orçamento Gratuito
              </CTAButton>

              <CTAButton
                variant="ghost"
                hrefExternal={`https://wa.me/${WHATSAPP_NUMBER}`}
                onDark
              >
                Falar pelo WhatsApp
              </CTAButton>
            </div>
          </div>

          {/* Direita — diferenciais */}
          <div style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {differentials.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-5"
                style={{
                  padding: '1.75rem 2rem',
                  borderBottom: i < differentials.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid rgba(249,115,22,0.3)',
                  background: 'rgba(249,115,22,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  <CheckCircle style={{ width: '14px', height: '14px', color: '#f97316' }} />
                </div>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
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
