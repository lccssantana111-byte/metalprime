'use client'

import { useState } from 'react'
import { ChevronLeft, ArrowRight, Loader2 } from 'lucide-react'
import type { WizardState } from './QuoteWizard'

interface Props {
  data: WizardState
  onChange: (data: Partial<WizardState>) => void
  onNext: () => void
  onBack: () => void
}

async function fetchCep(cep: string) {
  const clean = cep.replace(/\D/g, '')
  if (clean.length !== 8) return null
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
    const json = await res.json()
    if (json.erro) return null
    return { address: json.logradouro || '', city: json.localidade || '', state: json.uf || '' }
  } catch { return null }
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-ibm-mono)', fontSize: '10px',
  letterSpacing: '0.25em', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem',
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{error}</p>}
    </div>
  )
}

export default function QuoteStep3Contact({ data, onChange, onNext, onBack }: Props) {
  const [cepLoading, setCepLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)

  function inp(name: string): React.CSSProperties {
    return {
      width: '100%', padding: '0.875rem 1rem', borderRadius: '10px',
      background: '#f8fafc',
      border: `1.5px solid ${focused === name ? '#f97316' : errors[name] ? '#ef4444' : '#e2e8f0'}`,
      color: '#0f172a', fontFamily: 'var(--font-sans)', fontSize: '14px',
      outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s',
    }
  }

  async function handleCepBlur(cep: string) {
    setCepLoading(true)
    const result = await fetchCep(cep)
    if (result) onChange({ address: result.address, city: result.city, state: result.state })
    setCepLoading(false)
  }

  function validate() {
    const errs: Record<string, string> = {}
    if (!data.name || data.name.length < 2) errs.name = 'Nome obrigatório'
    if (!data.phone || data.phone.replace(/\D/g, '').length < 10) errs.phone = 'Telefone inválido'
    if (!data.cep || data.cep.replace(/\D/g, '').length !== 8) errs.cep = 'CEP inválido'
    if (!data.city) errs.city = 'Cidade obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const focus = (name: string) => () => setFocused(name)
  const blur = () => setFocused(null)

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
          Como entramos em contato
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#64748b', margin: 0 }}>
          Retornamos em até 24h com a proposta
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <Field label="Nome completo *" error={errors.name}>
            <input value={data.name} onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Seu nome" style={inp('name')} onFocus={focus('name')} onBlur={blur} />
          </Field>
          <Field label="Telefone / WhatsApp *" error={errors.phone}>
            <input value={data.phone} onChange={(e) => onChange({ phone: e.target.value.replace(/\D/g, '') })}
              placeholder="(11) 99999-9999" style={inp('phone')} onFocus={focus('phone')} onBlur={blur} />
          </Field>
        </div>

        <Field label="E-mail (opcional)">
          <input type="email" value={data.email} onChange={(e) => onChange({ email: e.target.value })}
            placeholder="seu@email.com" style={inp('email')} onFocus={focus('email')} onBlur={blur} />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
          <Field label="CEP *" error={errors.cep}>
            <div style={{ position: 'relative' }}>
              <input value={data.cep}
                onChange={(e) => onChange({ cep: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                onBlur={(e) => { blur(); handleCepBlur(e.target.value) }}
                onFocus={focus('cep')}
                placeholder="00000-000" style={inp('cep')} />
              {cepLoading && (
                <Loader2 style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  width: '14px', height: '14px', color: '#f97316', animation: 'spin 1s linear infinite',
                }} />
              )}
            </div>
          </Field>
          <Field label="Cidade *" error={errors.city}>
            <input value={data.city} onChange={(e) => onChange({ city: e.target.value })}
              placeholder="São Paulo" style={inp('city')} onFocus={focus('city')} onBlur={blur} />
          </Field>
        </div>

        <Field label="Endereço (opcional)">
          <input value={data.address} onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Rua, número, bairro" style={inp('address')} onFocus={focus('address')} onBlur={blur} />
        </Field>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={onBack}
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
        <button onClick={() => { if (validate()) onNext() }}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '13px 24px', borderRadius: '999px',
            background: '#f97316', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff',
            boxShadow: '0 4px 24px rgba(249,115,22,0.35)', transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ea580c' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#f97316' }}
        >
          Revisar pedido <ArrowRight style={{ width: '14px', height: '14px' }} />
        </button>
      </div>
    </div>
  )
}
