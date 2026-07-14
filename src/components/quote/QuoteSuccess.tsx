'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react'
import { buildQuoteWhatsAppUrl } from '@/lib/whatsapp'
import type { WizardState } from './QuoteWizard'
import type { ServiceType } from '@/types'
import { useWhatsAppNumber } from '@/components/providers/WhatsAppNumberProvider'

interface Props { state: WizardState }

const PRICE_RANGES: Record<string, { min: number; max: number; note: string }> = {
  portoes: { min: 3500, max: 12000, note: 'portão manual ou automático, instalado' },
  grades_e_cercas: { min: 800, max: 4000, note: 'por metro linear instalado' },
  escadas: { min: 6000, max: 25000, note: 'escada metálica completa instalada' },
  corrimoes: { min: 400, max: 2500, note: 'por metro linear instalado' },
  estruturas_metalicas: { min: 15000, max: 80000, note: 'estrutura comercial ou industrial' },
  sob_medida: { min: 2000, max: 30000, note: 'projeto personalizado' },
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export default function QuoteSuccess({ state }: Props) {
  const whatsappNumber = useWhatsAppNumber()
  const waUrl = buildQuoteWhatsAppUrl(state.name, state.services[0] as ServiceType, whatsappNumber)
  const priceRange = PRICE_RANGES[state.services[0]]

  return (
    <div style={{
      maxWidth: '560px', margin: '0 auto', textAlign: 'center',
      background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)',
      borderRadius: '20px', padding: 'clamp(2rem, 5vw, 3rem)',
      boxShadow: '0 2px 16px rgba(15,23,42,0.06)',
    }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        background: '#fff7ed', border: '1px solid rgba(249,115,22,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.75rem',
      }}>
        <CheckCircle2 style={{ width: '28px', height: '28px', color: '#f97316' }} />
      </div>

      <h2 style={{
        fontFamily: 'var(--font-barlow-condensed)', fontWeight: 900,
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '0.01em',
        textTransform: 'uppercase', color: '#0f172a', margin: '0 0 1rem', lineHeight: 1,
      }}>
        Recebemos!<br />
        <span style={{ color: '#f97316' }}>Você está em boas mãos.</span>
      </h2>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.75, color: '#64748b', margin: '0 0 1.75rem' }}>
        <strong style={{ color: '#0f172a' }}>{state.name}</strong>, sua solicitação está com nossa equipe.
        Em até <strong style={{ color: '#0f172a' }}>24 horas úteis</strong> você recebe a proposta e confirmamos a visita técnica gratuita.
      </p>

      {priceRange && (
        <div style={{
          textAlign: 'left', padding: '1.25rem', marginBottom: '1.5rem',
          background: '#fff7ed', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '14px',
        }}>
          <p style={{
            fontFamily: 'var(--font-ibm-mono)', fontSize: '9px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#f97316', margin: '0 0 6px',
          }}>Estimativa de investimento</p>
          <p style={{
            fontFamily: 'var(--font-barlow-condensed)', fontWeight: 900,
            fontSize: '2rem', lineHeight: 1, color: '#0f172a', margin: '0 0 4px',
          }}>
            {formatBRL(priceRange.min)} — {formatBRL(priceRange.max)}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#64748b', margin: '0 0 6px' }}>{priceRange.note}</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
            Valores estimados. O preço exato depende das dimensões, materiais e condições do local.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '1.75rem' }}>
        <Clock style={{ width: '12px', height: '12px', color: '#94a3b8' }} />
        <span style={{ fontFamily: 'var(--font-ibm-mono)', fontSize: '10px', letterSpacing: '0.1em', color: '#94a3b8' }}>
          Seg–Sex 8h–18h · Sáb 8h–13h
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '14px 24px', borderRadius: '999px',
            background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.3)',
            color: '#16a34a', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.14)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.08)' }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Acompanhar pelo WhatsApp
        </a>

        <Link href="/portfolio"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '13px 24px', borderRadius: '999px',
            background: 'transparent', border: '1.5px solid #e2e8f0',
            color: '#64748b', fontFamily: 'var(--font-sans)', fontSize: '14px',
            fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#94a3b8'; (e.currentTarget as HTMLElement).style.color = '#0f172a' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.color = '#64748b' }}
        >
          Ver nossos projetos <ArrowRight style={{ width: '14px', height: '14px' }} />
        </Link>
      </div>
    </div>
  )
}
