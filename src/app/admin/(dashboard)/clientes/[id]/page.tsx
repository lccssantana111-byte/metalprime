import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Client, Project, Quote } from '@/types'
import { CLIENT_TYPE_LABELS, PROJECT_STATUS_LABELS, QUOTE_STATUS_LABELS, SERVICE_LABELS } from '@/lib/constants'
import { formatBRL, formatDate, formatPhone } from '@/lib/utils'
import { ArrowLeft, Mail, Phone, MapPin, Building2 } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function ClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()

  const [{ data: clientData }, { data: projects }, { data: quotes }] = await Promise.all([
    supabase.from('clients').select('*').eq('id', id).single(),
    supabase.from('projects').select('id, name, status, contract_value, estimated_end').eq('client_id', id).order('created_at', { ascending: false }),
    supabase.from('quotes').select('id, service, status, estimated_value, created_at').eq('client_id', id).order('created_at', { ascending: false }).limit(5),
  ])

  if (!clientData) notFound()
  const c = clientData as Client
  const projectList = (projects ?? []) as Pick<Project, 'id' | 'name' | 'status' | 'contract_value' | 'estimated_end'>[]
  const quoteList = (quotes ?? []) as Pick<Quote, 'id' | 'service' | 'status' | 'estimated_value' | 'created_at'>[]

  const totalContractValue = projectList.reduce((acc, p) => acc + (p.contract_value ?? 0), 0)

  return (
    <div>
      <Link href="/admin/clientes" className="inline-flex items-center gap-2 text-sm text-metal hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar aos clientes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {projectList.length > 0 && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Projetos ({projectList.length})</h3>
              <div className="space-y-3">
                {projectList.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/projetos/${p.id}`}
                    className="flex items-center justify-between py-2.5 border-b border-metal-dark/20 last:border-0 hover:bg-steel/10 -mx-2 px-2 rounded transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-white hover:text-amber-brand transition-colors">{p.name}</p>
                      <p className="text-xs text-metal-dark mt-0.5">
                        {p.estimated_end ? `Prazo: ${formatDate(p.estimated_end)}` : 'Sem prazo definido'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm text-metal">{formatBRL(p.contract_value)}</span>
                      <Badge variant="outline" className="text-xs border-metal-dark/40 text-metal">
                        {PROJECT_STATUS_LABELS[p.status]}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {quoteList.length > 0 && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Orçamentos recentes</h3>
              <div className="space-y-2">
                {quoteList.map((q) => (
                  <Link
                    key={q.id}
                    href={`/admin/orcamentos/${q.id}`}
                    className="flex items-center justify-between py-2 border-b border-metal-dark/20 last:border-0 hover:bg-steel/10 -mx-2 px-2 rounded transition-colors"
                  >
                    <div>
                      <p className="text-sm text-white">{SERVICE_LABELS[q.service]}</p>
                      <p className="text-xs text-metal-dark">{formatDate(q.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {q.estimated_value && (
                        <span className="text-sm text-metal">{formatBRL(q.estimated_value)}</span>
                      )}
                      <Badge variant="outline" className="text-xs border-metal-dark/40 text-metal">
                        {QUOTE_STATUS_LABELS[q.status]}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {c.notes && (
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">Observações internas</h3>
              <p className="text-metal text-sm leading-relaxed whitespace-pre-wrap">{c.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-steel flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-metal" />
              </div>
              <div>
                <h2 className="font-semibold text-white">{c.name}</h2>
                <p className="text-xs text-metal mt-0.5">{CLIENT_TYPE_LABELS[c.type]}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-metal-dark shrink-0" />
                <span className="text-sm text-metal">{formatPhone(c.phone)}</span>
              </div>
              {c.phone_alt && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-metal-dark shrink-0" />
                  <span className="text-sm text-metal">{formatPhone(c.phone_alt)}</span>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-metal-dark shrink-0" />
                  <span className="text-sm text-metal">{c.email}</span>
                </div>
              )}
              {(c.city || c.address) && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-metal-dark shrink-0 mt-0.5" />
                  <div>
                    {c.address && <p className="text-sm text-metal">{c.address}</p>}
                    {c.city && <p className="text-xs text-metal-dark">{c.city} · {c.state}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Financeiro</h3>
            <div>
              <p className="text-xs text-metal-dark">Volume total de contratos</p>
              <p className="text-xl font-bold text-amber-brand">{formatBRL(totalContractValue)}</p>
            </div>
            <div className="mt-3">
              <p className="text-xs text-metal-dark">Total de projetos</p>
              <p className="text-lg font-semibold text-white">{projectList.length}</p>
            </div>
          </div>

          <div className="bg-graphite border border-metal-dark/30 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3">Portal corporativo</h3>
            <Badge
              variant="outline"
              className={`text-xs border ${
                c.portal_enabled
                  ? 'border-green-500/30 text-green-400'
                  : 'border-metal-dark/40 text-metal-dark'
              }`}
            >
              {c.portal_enabled ? 'Portal ativo' : 'Portal desativado'}
            </Badge>
            {c.portal_user_id && (
              <p className="text-xs text-metal-dark mt-2">Usuário vinculado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
