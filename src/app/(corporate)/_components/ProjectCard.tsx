'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { PROJECT_STATUS_LABELS, SERVICE_LABELS } from '@/lib/constants'
import type { Project } from '@/types'

const STATUS_COLORS: Record<string, { dot: string; text: string; bg: string; border: string }> = {
  planejamento: { dot: '#60a5fa', text: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
  medicao:      { dot: '#818cf8', text: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
  producao:     { dot: '#fbbf24', text: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)'  },
  instalacao:   { dot: '#fb923c', text: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)'  },
  concluido:    { dot: '#4ade80', text: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)'  },
  pausado:      { dot: '#94a3b8', text: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
  cancelado:    { dot: '#f87171', text: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
}

export default function ProjectCard({ project: p }: { project: Project }) {
  const done = p.milestones?.filter((m) => m.completed_at).length ?? 0
  const total = p.milestones?.length ?? 0
  const progress = total > 0 ? Math.round((done / total) * 100) : 0
  const s = STATUS_COLORS[p.status] ?? STATUS_COLORS.pausado

  return (
    <Link
      href={`/corporate/projetos/${p.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '1.5rem',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        minHeight: '160px',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(249,115,22,0.3)'
        el.style.background = 'rgba(249,115,22,0.04)'
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.background = 'rgba(255,255,255,0.03)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            margin: '0 0 5px',
            letterSpacing: '-0.015em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {p.name}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            {SERVICE_LABELS[p.service]}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 500,
            padding: '4px 10px',
            borderRadius: '6px',
            background: s.bg,
            border: `1px solid ${s.border}`,
            color: s.text,
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.dot }} />
            {PROJECT_STATUS_LABELS[p.status]}
          </span>
          <ArrowUpRight style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* Progress */}
      {total > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em' }}>
              progresso
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#f97316', fontFamily: 'var(--font-mono, monospace)' }}>
              {progress}%
            </span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #f97316, #fb923c)',
              borderRadius: '99px',
              transition: 'width 0.5s ease',
            }} />
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '5px 0 0', fontFamily: 'var(--font-mono, monospace)' }}>
            {done} de {total} marcos
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: total > 0 ? '0' : '8px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-mono, monospace)' }}>
          {p.estimated_end ? `Previsão: ${formatDate(p.estimated_end)}` : 'Prazo a definir'}
        </span>
      </div>
    </Link>
  )
}
