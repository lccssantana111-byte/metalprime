import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { formatDateTime, formatBRL } from '@/lib/utils'
import { SERVICE_LABELS, QUOTE_STATUS_LABELS } from '@/lib/constants'
import type { Quote } from '@/types'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function AdminOrcamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1')
  const statusFilter = params.status
  const limit = 20
  const offset = (page - 1) * limit

  const supabase = createAdminClient()
  let query = supabase
    .from('quotes')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (statusFilter) query = query.eq('status', statusFilter)

  const { data: quotes, count } = await query
  const total = count ?? 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Orçamentos</h1>
        <p className="text-slate-500 mt-1">{total} orçamentos</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: '', label: 'Todos' },
          { value: 'pendente', label: 'Pendente' },
          { value: 'em_analise', label: 'Em Análise' },
          { value: 'proposta_enviada', label: 'Proposta Enviada' },
          { value: 'aprovado', label: 'Aprovado' },
          { value: 'recusado', label: 'Recusado' },
        ].map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/admin/orcamentos?status=${f.value}` : '/admin/orcamentos'}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (statusFilter ?? '') === f.value
                ? 'bg-amber-brand text-carbon'
                : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Serviço</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Valor Est.</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(quotes ?? []).map((quote: Quote) => (
                <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/orcamentos/${quote.id}`} className="block">
                      <p className="text-sm font-medium text-foreground hover:text-amber-brand transition-colors">
                        {quote.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{quote.phone}</p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-slate-500">{SERVICE_LABELS[quote.service]}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="outline" className="text-xs border border-slate-200 text-slate-500">
                      {QUOTE_STATUS_LABELS[quote.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-500">
                      {quote.estimated_value ? formatBRL(quote.estimated_value) : '—'}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-slate-400">{formatDateTime(quote.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(quotes ?? []).length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Nenhum orçamento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
