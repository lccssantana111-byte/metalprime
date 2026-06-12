'use client'

import { useState } from 'react'
import { DoorOpen, ShieldCheck, Footprints, Grip, Factory, Pencil, ArrowRight } from 'lucide-react'

const services = [
  { value: 'portoes', label: 'Portões', Icon: DoorOpen, desc: 'Ferro, alumínio e inox' },
  { value: 'grades_e_cercas', label: 'Grades e Cercas', Icon: ShieldCheck, desc: 'Janelas, muros, perímetro' },
  { value: 'escadas', label: 'Escadas', Icon: Footprints, desc: 'Retas, L, U, helicoidais' },
  { value: 'corrimoes', label: 'Corrimões', Icon: Grip, desc: 'Guarda-corpos e corrimões' },
  { value: 'estruturas_metalicas', label: 'Estruturas', Icon: Factory, desc: 'Galpões e coberturas' },
  { value: 'sob_medida', label: 'Sob Medida', Icon: Pencil, desc: 'Qualquer projeto' },
]

interface Props {
  selected: string[]
  onChange: (services: string[]) => void
  onNext: () => void
}

export default function QuoteStep1Service({ selected, onChange, onNext }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  function toggle(value: string) {
    onChange(selected.includes(value) ? selected.filter((s) => s !== value) : [...selected, value])
  }

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
          O que você quer executar?
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#64748b', margin: 0 }}>
          Pode marcar mais de um serviço
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '0.75rem', marginBottom: '2rem',
      }}>
        {services.map(({ value, label, Icon, desc }) => {
          const isSelected = selected.includes(value)
          const isHovered = hovered === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                gap: '10px', padding: '1.125rem', borderRadius: '12px',
                border: isSelected
                  ? '1.5px solid #f97316'
                  : isHovered
                  ? '1.5px solid rgba(15,23,42,0.2)'
                  : '1.5px solid rgba(15,23,42,0.1)',
                background: isSelected ? '#fff7ed' : isHovered ? '#f8fafc' : '#ffffff',
                textAlign: 'left', cursor: 'pointer', position: 'relative',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 0 0 3px rgba(249,115,22,0.1)' : 'none',
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute', top: '8px', right: '8px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '9px', color: '#fff', fontWeight: 700 }}>✓</span>
                </div>
              )}
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: isSelected ? 'rgba(249,115,22,0.1)' : '#f1f5f9',
                border: `1px solid ${isSelected ? 'rgba(249,115,22,0.25)' : 'rgba(15,23,42,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon style={{ width: '16px', height: '16px', color: isSelected ? '#f97316' : '#64748b' }} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600,
                  color: '#0f172a', margin: '0 0 2px',
                }}>{label}</p>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '12px',
                  color: '#94a3b8', margin: 0,
                }}>{desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      <button
        onClick={onNext}
        disabled={selected.length === 0}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '10px', padding: '14px 24px', borderRadius: '999px',
          background: selected.length > 0 ? '#f97316' : '#e2e8f0',
          border: 'none', cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700,
          color: selected.length > 0 ? '#ffffff' : '#94a3b8',
          boxShadow: selected.length > 0 ? '0 4px 24px rgba(249,115,22,0.35)' : 'none',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => { if (selected.length > 0) (e.currentTarget as HTMLElement).style.background = '#ea580c' }}
        onMouseLeave={(e) => { if (selected.length > 0) (e.currentTarget as HTMLElement).style.background = '#f97316' }}
      >
        Continuar — {selected.length} serviço{selected.length !== 1 ? 's' : ''} selecionado{selected.length !== 1 ? 's' : ''}
        <span style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <ArrowRight style={{ width: '13px', height: '13px' }} />
        </span>
      </button>
    </div>
  )
}
