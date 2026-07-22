import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Project } from '@/types'
import { SERVICE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/constants'
import { formatBRL, formatDate } from '@/lib/utils'
import { ArrowLeft, CheckCircle, Circle, Clock, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getWhatsAppNumber } from '@/lib/queries/settings'

export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  planejamento: { dot: '#60a5fa', text: '#60a5fa', bg: 'rgba(96,165,250,0.06)', border: 'rgba(96,165,250,0.2)' },
  medicao:      { dot: '#818cf8', text: '#818cf8', bg: 'rgba(129,140,248,0.06)', border: 'rgba(129,140,248,0.2)' },
  producao:     { dot: '#fbbf24', text: '#fbbf24', bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.2)'  },
  instalacao:   { dot: '#fb923c', text: '#fb923c', bg: 'rgba(251,146,60,0.06)',  border: 'rgba(251,146,60,0.2)'  },
  concluido:    { dot: '#4ade80', text: '#4ade80', bg: 'rgba(74,222,128,0.06)',  border: 'rgba(74,222,128,0.2)'  },
  pausado:      { dot: '#94a3b8', text: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.2)' },
  cancelado:    { dot: '#f87171', text: '#f87171', bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.2)' },
}

export default async function CorporateProjetoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/corporate/login')
  const WHATSAPP_NUMBER = await getWhatsAppNumber()

  const supabase = createAdminClient()

  const { data: clientData } = await supabase
    .from('clients')
    .select('id')
    .eq('portal_user_id', user.id)
    .single()

  if (!clientData) redirect('/corporate/dashboard')

  const { data } = await supabase
    .from('projects')
    .select('*, milestones:project_milestones(*)')
    .eq('id', id)
    .eq('client_id', clientData.id)
    .single()

  if (!data) notFound()
  const p = data as Project

  const paidPct = p.contract_value > 0
    ? Math.round((p.amount_paid / p.contract_value) * 100)
    : 0

  const doneMilestones = p.milestones?.filter((m) => m.completed_at).length ?? 0
  const totalMilestones = p.milestones?.length ?? 0
  const progressPct = totalMilestones > 0 ? Math.round((doneMilestones / totalMilestones) * 100) : 0

  const s = STATUS_COLORS[p.status] ?? STATUS_COLORS.pausado

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '1.5rem',
  }

  const sectionLabel: React.CSSProperties = {
    fontSize: '10px',
    fontFamily: 'var(--font-mono, monospace)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.28)',
    marginBottom: '4px',
  }

  const valueText: React.CSSProperties = {
    fontSize: '11px',
    fontFamily: 'var(--font-mono, monospace)',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.06em',
  }

  return (
    <div>
      <Link
        href="/corporate/dashboard"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          marginBottom: '1.75rem',
        }}
      >
        <ArrowLeft style={{ width: '14px', height: '14px' }} />
        Meus projetos
      </Link>

      <style>{`
        @media (min-width: 860px) {
          .corporate-project-grid {
            grid-template-columns: minmax(0, 1fr) min(300px, 100%) !important;
          }
        }
      `}</style>
      <div className="corporate-project-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.25rem',
        alignItems: 'start',
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

          {/* Project header */}
          <div style={card}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.6rem', marginBottom: '6px' }}>
              <h1 style={{
                fontFamily: 'var(--font-display, var(--font-sans))',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
                minWidth: 0,
                wordBreak: 'break-word',
              }}>
                {p.name}
              </h1>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 500,
                padding: '5px 11px',
                borderRadius: '6px',
                background: s.bg,
                border: `1px solid ${s.border}`,
                color: s.text,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                {PROJECT_STATUS_LABELS[p.status]}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#f97316', margin: p.description ? '0 0 12px' : '0' }}>
              {SERVICE_LABELS[p.service]}
            </p>
            {p.description && (
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '12px 0 0', lineHeight: 1.6 }}>
                {p.description}
              </p>
            )}
          </div>

          {/* Milestones */}
          {totalMilestones > 0 && (
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: 0, letterSpacing: '-0.01em' }}>
                  Progresso da obra
                </h3>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#f97316',
                  fontFamily: 'var(--font-mono, monospace)',
                }}>
                  {progressPct}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '99px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressPct}%`,
                  background: 'linear-gradient(90deg, #f97316, #fb923c)',
                  borderRadius: '99px',
                  transition: 'width 0.4s ease',
                }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {p.milestones?.map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    {m.completed_at ? (
                      <CheckCircle style={{ width: '17px', height: '17px', color: '#4ade80', flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <Circle style={{ width: '17px', height: '17px', color: 'rgba(255,255,255,0.15)', flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: m.completed_at ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)',
                        textDecoration: m.completed_at ? 'line-through' : 'none',
                        margin: '0 0 3px',
                      }}>
                        {m.title}
                      </p>
                      {m.completed_at ? (
                        <p style={{ fontSize: '11px', color: 'rgba(74,222,128,0.6)', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
                          Concluído em {formatDate(m.completed_at)}
                        </p>
                      ) : m.due_date ? (
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono, monospace)' }}>
                          <Clock style={{ width: '10px', height: '10px' }} />
                          Prazo: {formatDate(m.due_date)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>

          {/* Financial */}
          <div style={card}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: '0 0 1.25rem', letterSpacing: '-0.01em' }}>
              Financeiro
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={sectionLabel}>Valor do contrato</p>
                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f97316', margin: 0, fontFamily: 'var(--font-mono, monospace)', letterSpacing: '-0.02em' }}>
                  {formatBRL(p.contract_value)}
                </p>
              </div>
              <div>
                <p style={sectionLabel}>Valor pago</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#4ade80', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
                  {formatBRL(p.amount_paid)}
                </p>
              </div>
              <div>
                <p style={sectionLabel}>Saldo restante</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
                  {formatBRL(p.contract_value - p.amount_paid)}
                </p>
              </div>

              <div>
                <div style={{
                  height: '3px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '99px',
                  overflow: 'hidden',
                  marginBottom: '6px',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${paidPct}%`,
                    background: 'linear-gradient(90deg, #4ade80, #86efac)',
                    borderRadius: '99px',
                  }} />
                </div>
                <p style={{ ...valueText, textAlign: 'right', fontSize: '10px' }}>{paidPct}% pago</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          {(p.start_date || p.estimated_end) && (
            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: '0 0 1.25rem', letterSpacing: '-0.01em' }}>
                Datas
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {p.start_date && (
                  <div>
                    <p style={sectionLabel}>Início</p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
                      {formatDate(p.start_date)}
                    </p>
                  </div>
                )}
                {p.estimated_end && (
                  <div>
                    <p style={sectionLabel}>Previsão de término</p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
                      {formatDate(p.estimated_end)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Support */}
          <div style={card}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
              Dúvidas?
            </h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '13px',
                color: '#4ade80',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <MessageCircle style={{ width: '14px', height: '14px' }} />
              Falar via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
