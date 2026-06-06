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
        <h1 className="font-display text-3xl font-bold text-white">Orçamentos</h1>
        <p className="text-metal mt-1">{total} orçamentos</p>
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
                : 'bg-graphite border border-metal-dark/30 text-metal hover:text-white'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="bg-graphite border border-metal-dark/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-metal-dark/30">
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Cliente</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden md:table-cell">Serviço</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Status</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Valor Est.</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-metal-dark/20">
              {(quotes ?? []).map((quote: Quote) => (
                <tr key={quote.id} className="hover:bg-steel/20 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/orcamentos/${quote.id}`} className="block">
                      <p className="text-sm font-medium text-white hover:text-amber-brand transition-colors">
                        {quote.name}
                      </p>
                      <p className="text-xs text-metal mt-0.5">{quote.phone}</p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-metal">{SERVICE_LABELS[quote.service]}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="outline" className="text-xs border border-metal-dark/40 text-metal">
                      {QUOTE_STATUS_LABELS[quote.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-metal">
                      {quote.estimated_value ? formatBRL(quote.estimated_value) : '—'}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-metal-dark">{formatDateTime(quote.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(quotes ?? []).length === 0 && (
          <div className="text-center py-16">
            <p className="text-metal">Nenhum orçamento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
