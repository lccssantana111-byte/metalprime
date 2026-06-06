import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import { SERVICE_LABELS, LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from '@/lib/constants'
import type { Lead } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, LayoutList, Columns } from 'lucide-react'
import { LeadsKanban } from '@/components/admin/leads/LeadsKanban'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string; view?: string }>
}) {
  const params = await searchParams
  const view = params.view === 'kanban' ? 'kanban' : 'list'
  const page = parseInt(params.page ?? '1')
  const statusFilter = params.status
  const limit = 20
  const offset = (page - 1) * limit

  const supabase = createAdminClient()

  // Para o Kanban, buscar todos os leads sem paginação (máx 200)
  const kanbanQuery = supabase
    .from('leads')
    .select('*')
    .not('status', 'in', '("sem_interesse")')
    .order('created_at', { ascending: false })
    .limit(200)

  // Para a lista, paginação normal
  let listQuery = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (statusFilter) listQuery = listQuery.eq('status', statusFilter)

  const [{ data: kanbanLeads }, { data: listLeads, count }] = await Promise.all([
    view === 'kanban' ? kanbanQuery : Promise.resolve({ data: [] }),
    view === 'list' ? listQuery : Promise.resolve({ data: [], count: 0 }),
  ])

  const total = count ?? 0
  const totalPages = Math.ceil(total / limit)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">CRM — Pipeline</h1>
          <p className="text-metal mt-1">
            {view === 'kanban'
              ? `${kanbanLeads?.length ?? 0} leads no pipeline`
              : `${total} leads encontrados`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle Lista / Kanban */}
          <div className="flex bg-graphite border border-metal-dark/30 rounded-lg overflow-hidden">
            <Link
              href={`/admin/leads${statusFilter ? `?status=${statusFilter}` : ''}`}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm transition-colors ${
                view === 'list'
                  ? 'bg-amber-brand text-carbon font-semibold'
                  : 'text-metal hover:text-white'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              Lista
            </Link>
            <Link
              href={`/admin/leads?view=kanban`}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm transition-colors ${
                view === 'kanban'
                  ? 'bg-amber-brand text-carbon font-semibold'
                  : 'text-metal hover:text-white'
              }`}
            >
              <Columns className="w-4 h-4" />
              Kanban
            </Link>
          </div>

          <Button asChild className="bg-amber-brand hover:bg-amber-light text-carbon font-semibold">
            <Link href="/admin/leads/novo">
              <Plus className="w-4 h-4 mr-2" />
              Novo Lead
            </Link>
          </Button>
        </div>
      </div>

      {view === 'kanban' ? (
        <LeadsKanban initialLeads={(kanbanLeads ?? []) as Lead[]} />
      ) : (
        <>
          {/* Status filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { value: '', label: 'Todos' },
              { value: 'novo', label: 'Novos' },
              { value: 'em_contato', label: 'Em Contato' },
              { value: 'proposta_enviada', label: 'Proposta Enviada' },
              { value: 'em_negociacao', label: 'Em Negociação' },
              { value: 'ganho', label: 'Ganho' },
              { value: 'perdido', label: 'Perdido' },
            ].map((f) => (
              <Link
                key={f.value}
                href={f.value ? `/admin/leads?status=${f.value}` : '/admin/leads'}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  (statusFilter ?? '') === f.value
                    ? 'bg-amber-brand text-carbon'
                    : 'bg-graphite border border-metal-dark/30 text-metal hover:text-white'
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>

          {/* Table */}
          <div className="bg-graphite border border-metal-dark/30 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-metal-dark/30">
                    <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase tracking-wider">Nome</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase tracking-wider hidden md:table-cell">Empresa</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase tracking-wider hidden md:table-cell">Serviço</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase tracking-wider hidden lg:table-cell">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-metal-dark/20">
                  {(listLeads ?? []).map((lead: Lead) => (
                    <tr key={lead.id} className="hover:bg-steel/20 transition-colors">
                      <td className="px-5 py-4">
                        <Link href={`/admin/leads/${lead.id}`} className="block">
                          <p className="text-sm font-medium text-white hover:text-amber-brand transition-colors">
                            {lead.name}
                          </p>
                          <p className="text-xs text-metal mt-0.5">{lead.phone}</p>
                        </Link>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-metal">{lead.company ?? '—'}</span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-metal">
                          {lead.service ? SERVICE_LABELS[lead.service] : '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge className={`text-xs border ${LEAD_STATUS_COLORS[lead.status] ?? ''}`} variant="outline">
                          {LEAD_STATUS_LABELS[lead.status]}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-xs text-metal-dark">{formatDateTime(lead.created_at)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(listLeads ?? []).length === 0 && (
              <div className="text-center py-16">
                <p className="text-metal mb-4">Nenhum lead encontrado.</p>
                <Button asChild size="sm" className="bg-amber-brand hover:bg-amber-light text-carbon">
                  <Link href="/admin/leads/novo">Criar primeiro lead</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-metal">Página {page} de {totalPages}</p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/leads?page=${page - 1}${statusFilter ? `&status=${statusFilter}` : ''}`}
                    className="px-4 py-2 bg-graphite border border-metal-dark/30 text-metal-light rounded-lg text-sm hover:border-amber-brand/40 transition-colors"
                  >
                    Anterior
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/leads?page=${page + 1}${statusFilter ? `&status=${statusFilter}` : ''}`}
                    className="px-4 py-2 bg-graphite border border-metal-dark/30 text-metal-light rounded-lg text-sm hover:border-amber-brand/40 transition-colors"
                  >
                    Próxima
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
