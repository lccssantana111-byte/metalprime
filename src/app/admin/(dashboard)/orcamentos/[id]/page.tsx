import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Quote } from '@/types'
import { SERVICE_LABELS, QUOTE_STATUS_LABELS } from '@/lib/constants'
import { formatDateTime, formatBRL } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function OrcamentoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: quote } = await supabase.from('quotes').select('*').eq('id', id).single()
  if (!quote) notFound()
  const q = quote as Quote

  return (
    <div>
      <Link href="/admin/orcamentos" className="inline-flex items-center gap-2 text-sm text-metal hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Orçamento — {SERVICE_LABELS[q.service]}
            </h1>
            <p className="text-metal text-sm">{formatDateTime(q.created_at)}</p>
          </div>

          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Dados do cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nome', value: q.name },
                { label: 'Telefone', value: q.phone },
                { label: 'E-mail', value: q.email ?? '—' },
                { label: 'Cidade', value: q.city ?? '—' },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-metal-dark">{row.label}</p>
                  <p className="text-sm text-metal-light">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          {q.description && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Descrição do projeto</h3>
              <p className="text-metal text-sm leading-relaxed">{q.description}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Status</h3>
            <Badge variant="outline" className="text-xs border-metal-dark/40 text-metal">
              {QUOTE_STATUS_LABELS[q.status]}
            </Badge>
          </div>

          {(q.estimated_value || q.final_value) && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Valores</h3>
              {q.estimated_value && (
                <div className="mb-2">
                  <p className="text-xs text-metal-dark">Valor Estimado</p>
                  <p className="text-lg font-bold text-amber-brand">{formatBRL(q.estimated_value)}</p>
                </div>
              )}
              {q.final_value && (
                <div>
                  <p className="text-xs text-metal-dark">Valor Final</p>
                  <p className="text-lg font-bold text-green-400">{formatBRL(q.final_value)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
