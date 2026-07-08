'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { SectionLabel, CTAButton } from '@/components/ui/design-system'
import { trackWhatsAppClick } from '@/lib/gtm'
import { useWhatsAppNumber } from '@/components/providers/WhatsAppNumberProvider'

const differentials = [
  'Equipe própria: engenheiros estruturais, soldadores AWS e montadores certificados NR-35',
  'Fabricação 100% interna — sem terceirização em nenhuma etapa crítica',
  'ART em 100% dos projetos estruturais — documentação completa para vistorias e seguros',
  'Memorial descritivo, cronograma físico-financeiro e relatório de inspeção em todas as entregas',
  'Atendemos Grande São Paulo, ABC, Campinas e interior do estado',
  'Garantia estrutural de 5 anos — com laudo técnico de responsabilidade',
]

export default function SobreCTA() {
  const WHATSAPP_NUMBER = useWhatsAppNumber()

  return (
    <section style={{ background: '#0f172a', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Esquerda */}
          <div className="lg:sticky" style={{ top: '8rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionLabel label="Por que a Metal Shark" />
            </div>

            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 7vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase' as const,
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}>
              O que nenhum<br />
              outro fornecedor<br />
              <span style={{ color: '#f97316' }}>garante em contrato</span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
              maxWidth: '38ch',
            }}>
              A maioria terceiriza, improvisa e entrega sem laudo. Aqui, cada etapa é executada por equipe própria e documentada.
              Fale com um engenheiro: diagnóstico técnico gratuito, proposta em 48h.
            </p>

            {/* Botões — visíveis só no desktop (lg+), no mobile aparecem abaixo da lista */}
            <div className="hidden lg:flex" style={{ flexDirection: 'column', gap: '12px' }}>
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
                onClick={() => trackWhatsAppClick('sobre_cta')}
                onDark
              >
                Falar pelo WhatsApp
              </CTAButton>
            </div>
          </div>

          {/* Direita — diferenciais */}
          <div>
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

            {/* Botões — visíveis só no mobile, abaixo da lista */}
            <div className="flex lg:hidden" style={{ flexDirection: 'column', gap: '12px', marginTop: '2rem' }}>
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
                onClick={() => trackWhatsAppClick('sobre_cta')}
                onDark
              >
                Falar pelo WhatsApp
              </CTAButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
