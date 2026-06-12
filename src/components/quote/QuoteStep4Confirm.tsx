'use client'

import { useState } from 'react'
import { ChevronLeft, Loader2, Pencil, Send } from 'lucide-react'
import { SERVICE_LABELS } from '@/lib/constants'
import { toast } from 'sonner'
import type { WizardState } from './QuoteWizard'

interface Props {
  state: WizardState
  onEdit: (step: number) => void
  onSuccess: (quoteId: string, leadId: string) => void
  onBack: () => void
}

export default function QuoteStep4Confirm({ state, onEdit, onSuccess, onBack }: Props) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: state.services, specs: state.specs, description: state.description,
          reference_image_paths: state.reference_image_paths,
          name: state.name, phone: state.phone, email: state.email || undefined,
          cep: state.cep, address: state.address, city: state.city,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      onSuccess(json.quote_id, json.lead_id)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao enviar orçamento.')
    } finally {
      setSubmitting(false)
    }
  }

  const rows = [
    { label: 'Serviços', value: state.services.map((s) => SERVICE_LABELS[s] ?? s).join(', '), step: 1 },
    { label: 'Descrição', value: state.description, step: 2 },
    { label: 'Nome', value: state.name, step: 3 },
    { label: 'Telefone', value: state.phone, step: 3 },
    { label: 'E-mail', value: state.email || '—', step: 3 },
    { label: 'Cidade', value: state.city, step: 3 },
    { label: 'CEP', value: state.cep, step: 3 },
  ]

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
          Tudo certo?
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#64748b', margin: 0 }}>
          Revise e confirme — você pode editar qualquer item
        </p>
      </div>

      <div style={{ marginBottom: '1.75rem', borderTop: '1px solid #f1f5f9' }}>
        {rows.map((row) => (
          <div key={row.label} style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            gap: '1rem', padding: '0.875rem 0', borderBottom: '1px solid #f1f5f9',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-ibm-mono)', fontSize: '9px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 3px',
              }}>{row.label}</p>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0f172a', margin: 0,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{row.value || '—'}</p>
            </div>
            <button onClick={() => onEdit(row.step)} aria-label={`Editar ${row.label}`}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#cbd5e1', padding: '4px', flexShrink: 0, transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#cbd5e1' }}
            >
              <Pencil style={{ width: '13px', height: '13px' }} />
            </button>
          </div>
        ))}
      </div>

      <div style={{
        padding: '1rem 1.25rem', marginBottom: '2rem',
        background: '#fff7ed', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px',
      }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Nossa equipe analisa seu pedido e retorna em até{' '}
          <strong style={{ color: '#0f172a' }}>24 horas úteis</strong>{' '}
          com a proposta detalhada e agendamento da visita técnica.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={onBack} disabled={submitting}
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
        <button onClick={handleSubmit} disabled={submitting}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '14px 24px', borderRadius: '999px',
            background: submitting ? 'rgba(249,115,22,0.6)' : '#f97316',
            border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff',
            boxShadow: '0 4px 24px rgba(249,115,22,0.35)', transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLElement).style.background = '#ea580c' }}
          onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLElement).style.background = '#f97316' }}
        >
          {submitting
            ? <><Loader2 style={{ width: '15px', height: '15px', animation: 'spin 1s linear infinite' }} /> Enviando...</>
            : <><Send style={{ width: '15px', height: '15px' }} /> Confirmar e Enviar Orçamento</>
          }
        </button>
      </div>
    </div>
  )
}
