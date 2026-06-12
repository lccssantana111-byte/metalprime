import type { Metadata } from 'next'
import { BRAND_NAME } from '@/lib/constants'
import QuoteWizard from '@/components/quote/QuoteWizard'
import { CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `Solicitar Orçamento | ${BRAND_NAME}`,
  description:
    'Solicite um orçamento gratuito para portões, grades, escadas e estruturas metálicas em São Paulo. Retorno em até 24 horas.',
  robots: { index: false, follow: false },
}

const benefits = [
  '100% gratuito, sem compromisso',
  'Visita técnica no local, grátis',
  'Retorno em até 24 horas úteis',
  'ART em 100% dos projetos estruturais',
]

export default function OrcamentoPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f0' }}>

      {/* Hero strip */}
      <div style={{
        background: 'linear-gradient(180deg, #0c1220 0%, #0f172a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '7rem',
        paddingBottom: '3.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '200px',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '720px', margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 2rem)',
          position: 'relative', zIndex: 1, textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ width: '24px', height: '1px', background: '#f97316' }} />
            <span style={{ fontFamily: 'var(--font-ibm-mono)', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#f97316' }}>
              Orçamento gratuito
            </span>
            <div style={{ width: '24px', height: '1px', background: '#f97316' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-barlow-condensed)', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.92,
            letterSpacing: '0.01em', textTransform: 'uppercase',
            color: '#ffffff', margin: '0 0 2rem',
          }}>
            Orçamento em{' '}
            <span style={{ color: '#f97316' }}>3 minutos</span>
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.625rem 1.75rem' }}>
            {benefits.map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 style={{ width: '13px', height: '13px', color: '#f97316', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard */}
      <div style={{
        background: '#f4f4f0',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
        position: 'relative',
      }}>
        {/* Dot grid light */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        <QuoteWizard />
      </div>
    </div>
  )
}
