import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Lead, LeadInteraction } from '@/types'
import {
  SERVICE_LABELS,
  LEAD_STATUS_LABELS,
  LEAD_STATUS_COLORS,
} from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { formatDateTime, formatPhone } from '@/lib/utils'
import { buildAdminWhatsAppUrl } from '@/lib/whatsapp'
import { scoreLeadOf } from '@/lib/leadScore'
import Link from 'next/link'
import { ArrowLeft, Phone, Building2, MapPin, Flame } from 'lucide-react'
import LeadStatusChanger from '@/components/admin/leads/LeadStatusChanger'
import LeadNoteForm from '@/components/admin/leads/LeadNoteForm'
import { LeadAssign } from '@/components/admin/leads/LeadAssign'
import { WhatsAppTemplates } from '@/components/admin/leads/WhatsAppTemplates'

export const dynamic = 'force-dynamic'

const INTERACTION_TYPE_LABELS: Record<string, string> = {
  note: 'Nota',
  call: 'Ligação',
  whatsapp: 'WhatsApp',
  email: 'E-mail',
  visit: 'Visita',
  status_change: 'Mudança de status',
}

const INTERACTION_COLORS: Record<string, string> = {
  note: 'bg-metal-dark',
  call: 'bg-blue-500',
  whatsapp: 'bg-[#25D366]',
  email: 'bg-purple-500',
  visit: 'bg-[#f97316]',
  status_change: 'bg-orange-400',
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()

  const [{ data: lead }, { data: interactions }, { data: staffUsers }] = await Promise.all([
    supabase.from('leads').select('*').eq('id', id).single(),
    supabase
      .from('lead_interactions')
      .select('*, author:user_profiles!author_id(id, full_name, avatar_url)')
      .eq('lead_id', id)
      .order('created_at', { ascending: true }),
    supabase
      .from('user_profiles')
      .select('id, full_name')
      .eq('is_active', true)
      .in('role', ['admin', 'comercial']),
  ])

  if (!lead) notFound()

  const typedLead = lead as Lead
  const waUrl = buildAdminWhatsAppUrl(typedLead.phone, typedLead.name, typedLead.service)
  const score = scoreLeadOf(typedLead)
  const clientPhone = typedLead.phone.replace(/\D/g, '')
  const whatsappNumber = clientPhone.startsWith('55') ? clientPhone : `55${clientPhone}`

  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(typedLead.updated_at).getTime()) / (1000 * 60 * 60 * 24),
  )
  const isStale = ['novo', 'em_contato', 'proposta_enviada', 'em_negociacao'].includes(typedLead.status) && daysSinceUpdate >= 3

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para leads
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display text-3xl font-bold text-foreground">{typedLead.name}</h1>
              {/* Lead score badge */}
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${score.color}`}>
                <Flame className="w-3 h-3" />
                {score.label} · {score.total}pts
              </span>
            </div>
            <p className="text-slate-500">
              {formatPhone(typedLead.phone)}
              {typedLead.email && ` · ${typedLead.email}`}
              {typedLead.company && (
                <span className="inline-flex items-center gap-1 ml-2">
                  <Building2 className="w-3 h-3" />
                  {typedLead.company}
                </span>
              )}
              {typedLead.city && (
                <span className="inline-flex items-center gap-1 ml-2">
                  <MapPin className="w-3 h-3" />
                  {typedLead.city}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-lg text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Abrir WhatsApp
            </a>
          </div>
        </div>

        {/* Stale alert */}
        {isStale && (
          <div className="mt-4 flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-3 text-sm text-orange-300">
            <span className="font-semibold">⚠️ Lead inativo</span>
            <span>— sem atualização há {daysSinceUpdate} dias. Hora de fazer contato!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead details panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Informações</h3>
            <div className="space-y-3">
              {[
                { label: 'Serviço', value: typedLead.service ? SERVICE_LABELS[typedLead.service] : '—' },
                { label: 'Tipo de cliente', value: typedLead.client_type?.replace(/_/g, ' ') ?? '—' },
                { label: 'Origem', value: typedLead.source },
                { label: 'Recebido em', value: formatDateTime(typedLead.created_at) },
                { label: 'Atualizado em', value: formatDateTime(typedLead.updated_at) },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-slate-400">{row.label}</p>
                  <p className="text-sm text-slate-600 capitalize">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Score breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ea580c]" />
              Lead Score — {score.total}pts
            </h3>
            <div className="space-y-1.5">
              {score.breakdown.map((b) => (
                <div key={b.factor} className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{b.factor}</span>
                  <span className="text-slate-600 font-medium">+{b.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Status</h3>
            <Badge
              className={`text-xs border mb-4 ${LEAD_STATUS_COLORS[typedLead.status] ?? ''}`}
              variant="outline"
            >
              {LEAD_STATUS_LABELS[typedLead.status]}
            </Badge>
            <LeadStatusChanger leadId={id} currentStatus={typedLead.status} />
          </div>

          {/* Assignment */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <LeadAssign
              leadId={id}
              assignedTo={typedLead.assigned_to}
              users={(staffUsers ?? []) as { id: string; full_name: string }[]}
            />
          </div>

          {/* Message / Notes */}
          {(typedLead.message || typedLead.notes) && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              {typedLead.message && (
                <div>
                  <h3 className="text-xs text-slate-400 mb-1">Mensagem original</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{typedLead.message}</p>
                </div>
              )}
              {typedLead.notes && (
                <div>
                  <h3 className="text-xs text-slate-400 mb-1">Observações</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{typedLead.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* WhatsApp templates */}
          <WhatsAppTemplates
            name={typedLead.name}
            phone={typedLead.phone}
            service={typedLead.service}
            status={typedLead.status}
            whatsappNumber={whatsappNumber}
          />
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-5">
              Timeline de interações
              <span className="ml-2 text-xs text-slate-400 font-normal">
                ({(interactions ?? []).length} registro{(interactions ?? []).length !== 1 ? 's' : ''})
              </span>
            </h3>

            {(interactions ?? []).length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">Nenhuma interação registrada.</p>
            ) : (
              <div className="space-y-4 mb-6 relative">
                <div className="absolute left-[3px] top-3 bottom-3 w-px bg-metal-dark/30" />
                {(interactions as LeadInteraction[]).map((interaction) => (
                  <div key={interaction.id} className="flex gap-4 relative">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 z-10 ${INTERACTION_COLORS[interaction.type] ?? 'bg-metal-dark'}`} />
                    <div className="flex-1 min-w-0 pb-4 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold text-[#ea580c]">
                          {INTERACTION_TYPE_LABELS[interaction.type] ?? interaction.type}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDateTime(interaction.created_at)}
                        </span>
                        {interaction.author && (
                          <span className="text-xs text-slate-400">
                            — {(interaction.author as { full_name: string }).full_name}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{interaction.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <LeadNoteForm leadId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}
