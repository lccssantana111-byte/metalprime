import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Project } from '@/types'
import { SERVICE_LABELS, PROJECT_STATUS_LABELS, WHATSAPP_NUMBER } from '@/lib/constants'
import { formatBRL, formatDate } from '@/lib/utils'
import { ArrowLeft, CheckCircle, Circle, Clock } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function CorporateProjetoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/corporate/login')

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

  return (
    <div>
      <Link href="/corporate/dashboard" className="inline-flex items-center gap-2 text-sm text-metal hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        Meus projetos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-display text-2xl font-bold text-white">{p.name}</h1>
              <Badge variant="outline" className="text-xs border-metal-dark/40 text-metal shrink-0">
                {PROJECT_STATUS_LABELS[p.status]}
              </Badge>
            </div>
            <p className="text-amber-brand text-sm">{SERVICE_LABELS[p.service]}</p>
            {p.description && <p className="text-metal text-sm mt-3">{p.description}</p>}
          </div>

          {totalMilestones > 0 && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Progresso da obra</h3>
                <span className="text-sm font-medium text-amber-brand">{progressPct}%</span>
              </div>
              <div className="h-2 bg-steel rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-amber-brand rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="space-y-3">
                {p.milestones?.map((m) => (
                  <div key={m.id} className="flex items-start gap-3">
                    {m.completed_at ? (
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-metal-dark shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${m.completed_at ? 'text-metal line-through' : 'text-white'}`}>
                        {m.title}
                      </p>
                      {m.completed_at ? (
                        <p className="text-xs text-green-400/70 mt-0.5">
                          Concluído em {formatDate(m.completed_at)}
                        </p>
                      ) : m.due_date ? (
                        <p className="text-xs text-metal-dark mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
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

        <div className="space-y-4">
          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Financeiro</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-metal-dark">Valor do contrato</p>
                <p className="text-xl font-bold text-amber-brand">{formatBRL(p.contract_value)}</p>
              </div>
              <div>
                <p className="text-xs text-metal-dark">Valor pago</p>
                <p className="text-lg font-semibold text-green-400">{formatBRL(p.amount_paid)}</p>
              </div>
              <div>
                <p className="text-xs text-metal-dark">Saldo restante</p>
                <p className="text-lg font-semibold text-white">{formatBRL(p.contract_value - p.amount_paid)}</p>
              </div>
              <div className="h-1.5 bg-steel rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: `${paidPct}%` }}
                />
              </div>
              <p className="text-xs text-metal-dark text-right">{paidPct}% pago</p>
            </div>
          </div>

          {(p.start_date || p.estimated_end) && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4">Datas</h3>
              {p.start_date && (
                <div className="mb-3">
                  <p className="text-xs text-metal-dark">Início</p>
                  <p className="text-sm text-metal-light">{formatDate(p.start_date)}</p>
                </div>
              )}
              {p.estimated_end && (
                <div>
                  <p className="text-xs text-metal-dark">Previsão de término</p>
                  <p className="text-sm text-metal-light">{formatDate(p.estimated_end)}</p>
                </div>
              )}
            </div>
          )}

          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3">Dúvidas?</h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Falar com nossa equipe via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
