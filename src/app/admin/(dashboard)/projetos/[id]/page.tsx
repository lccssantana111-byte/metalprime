import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Project } from '@/types'
import { SERVICE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/constants'
import { formatBRL, formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function ProjetoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*, client:clients!client_id(id, name, phone, type), milestones:project_milestones(*)')
    .eq('id', id)
    .single()
  if (!project) notFound()
  const p = project as Project

  return (
    <div>
      <Link href="/admin/projetos" className="inline-flex items-center gap-2 text-sm text-metal hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar
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

          {p.milestones && p.milestones.length > 0 && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Marcos do projeto</h3>
              <div className="space-y-3">
                {p.milestones.map((m) => (
                  <div key={m.id} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 ${
                      m.completed_at ? 'bg-green-400 border-green-400' : 'border-metal-dark'
                    }`} />
                    <div>
                      <p className={`text-sm font-medium ${m.completed_at ? 'text-metal line-through' : 'text-white'}`}>
                        {m.title}
                      </p>
                      {m.due_date && (
                        <p className="text-xs text-metal-dark">Prazo: {formatDate(m.due_date)}</p>
                      )}
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
                <p className="text-xs text-metal-dark">Valor recebido</p>
                <p className="text-lg font-semibold text-green-400">{formatBRL(p.amount_paid)}</p>
              </div>
              <div>
                <p className="text-xs text-metal-dark">Saldo</p>
                <p className="text-lg font-semibold text-white">
                  {formatBRL(p.contract_value - p.amount_paid)}
                </p>
              </div>
            </div>
          </div>

          {p.client && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4">Cliente</h3>
              <p className="text-sm font-medium text-white">{p.client.name}</p>
              <p className="text-xs text-metal mt-1">{p.client.phone}</p>
              <p className="text-xs text-metal capitalize mt-0.5">{p.client.type}</p>
            </div>
          )}

          {(p.start_date || p.estimated_end) && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4">Datas</h3>
              {p.start_date && (
                <div className="mb-2">
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
        </div>
      </div>
    </div>
  )
}
