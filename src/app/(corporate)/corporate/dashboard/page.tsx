import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import type { Project } from '@/types'
import ProjectCard from '../../_components/ProjectCard'
import { getWhatsAppNumber } from '@/lib/queries/settings'

export const dynamic = 'force-dynamic'

export default async function CorporateDashboardPage() {
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/corporate/login')
  const WHATSAPP_NUMBER = await getWhatsAppNumber()

  const supabase = createAdminClient()
  const { data: clientData } = await supabase
    .from('clients')
    .select('id, name, type')
    .eq('portal_user_id', user.id)
    .single()

  if (!clientData) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'rgba(249,115,22,0.08)',
          border: '1px solid rgba(249,115,22,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '24px',
        }}>
          ⚠
        </div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
          Conta não associada
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', maxWidth: '340px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Seu acesso ainda não foi vinculado a uma conta. Entre em contato com nossa equipe.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#ffffff',
            background: '#f97316',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Falar com a equipe
        </a>
      </div>
    )
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*, milestones:project_milestones(*)')
    .eq('client_id', clientData.id)
    .order('created_at', { ascending: false })

  const list = (projects ?? []) as Project[]
  const active = list.filter((p) => !['concluido', 'cancelado'].includes(p.status))
  const concluded = list.filter((p) => p.status === 'concluido')

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{
          fontSize: '11px',
          fontFamily: 'var(--font-mono, monospace)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#f97316',
          margin: '0 0 12px',
        }}>
          Olá, {clientData.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 style={{
            fontFamily: 'var(--font-display, var(--font-sans))',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: 0,
          }}>
            Seus projetos
          </h1>
          {list.length > 0 && (
            <div style={{ display: 'flex', gap: '12px', paddingBottom: '4px' }}>
              {active.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-mono, monospace)',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
                  {active.length} em andamento
                </div>
              )}
              {concluded.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-mono, monospace)',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  {concluded.length} concluído{concluded.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Active projects */}
      {active.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1rem',
          }}>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}>
              Em andamento
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
          }}>
            {active.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      )}

      {/* Concluded projects */}
      {concluded.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1rem',
          }}>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}>
              Concluídos
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
          }}>
            {concluded.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      )}

      {/* Empty state */}
      {list.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '5rem 2rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '20px',
          marginTop: '1rem',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(249,115,22,0.07)',
            border: '1px solid rgba(249,115,22,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '28px',
          }}>
            📋
          </div>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}>
            Nenhum projeto ainda
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.3)',
            maxWidth: '320px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}>
            Seus projetos aparecerão aqui assim que forem cadastrados pela nossa equipe.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              padding: '11px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
            }}
          >
            Solicitar orçamento
          </a>
        </div>
      )}
    </div>
  )
}
