'use client'

import { ChevronLeft, ArrowRight, Lightbulb } from 'lucide-react'

interface Props {
  services: string[]
  specs: Record<string, unknown>
  description: string
  images: string[]
  onChange: (data: { specs: Record<string, unknown> }) => void
  onDescriptionChange: (d: string) => void
  onImagesChange: (imgs: string[]) => void
  onNext: () => void
  onBack: () => void
}

export default function QuoteStep2Details({ description, onDescriptionChange, onNext, onBack }: Props) {
  const valid = description.trim().length >= 10

  return (
    <div style={{
      background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)',
      borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      boxShadow: '0 2px 16px rgba(15,23,42,0.06)',
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-barlow-condensed)', fontWeight: 900,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '0.01em',
          textTransform: 'uppercase', color: '#0f172a', margin: '0 0 0.4rem',
        }}>
          Descreva com suas palavras
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#64748b', margin: 0 }}>
          Sem termos técnicos — nosso engenheiro interpreta. Foque no que você quer.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        <div>
          <label style={{
            display: 'block', fontFamily: 'var(--font-ibm-mono)', fontSize: '10px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#64748b', marginBottom: '0.5rem',
          }}>
            Descrição do projeto *
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Ex: Preciso de um portão de ferro de 3m de largura por 2,2m de altura com motor para uma residência. Gosto do estilo moderno com barras horizontais..."
            rows={6}
            style={{
              width: '100%', padding: '0.875rem 1rem', borderRadius: '10px',
              background: '#f8fafc', border: '1.5px solid #e2e8f0',
              color: '#0f172a', fontFamily: 'var(--font-sans)', fontSize: '14px',
              outline: 'none', resize: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.2s', lineHeight: 1.65,
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#f97316' }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0' }}
          />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#94a3b8', marginTop: '0.4rem' }}>
            Inclua dimensões aproximadas, material preferido e referências visuais se tiver
          </p>
        </div>

        <div style={{
          display: 'flex', gap: '12px', padding: '1rem 1.25rem',
          background: '#fff7ed', border: '1px solid rgba(249,115,22,0.2)',
          borderRadius: '12px',
        }}>
          <Lightbulb style={{ width: '16px', height: '16px', color: '#f97316', flexShrink: 0, marginTop: '1px' }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Na visita técnica, nosso engenheiro tira todas as medidas. Por agora, uma descrição geral já basta.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '13px 20px', borderRadius: '999px',
            background: 'transparent', border: '1.5px solid #e2e8f0',
            color: '#64748b', fontFamily: 'var(--font-sans)',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#94a3b8' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0' }}
        >
          <ChevronLeft style={{ width: '14px', height: '14px' }} /> Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '13px 24px', borderRadius: '999px',
            background: valid ? '#f97316' : '#e2e8f0',
            border: 'none', cursor: valid ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700,
            color: valid ? '#ffffff' : '#94a3b8',
            boxShadow: valid ? '0 4px 24px rgba(249,115,22,0.35)' : 'none',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { if (valid) (e.currentTarget as HTMLElement).style.background = '#ea580c' }}
          onMouseLeave={(e) => { if (valid) (e.currentTarget as HTMLElement).style.background = '#f97316' }}
        >
          Continuar <ArrowRight style={{ width: '14px', height: '14px' }} />
        </button>
      </div>
    </div>
  )
}
