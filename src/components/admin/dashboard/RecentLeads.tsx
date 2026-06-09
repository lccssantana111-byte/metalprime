import Link from 'next/link'
import { formatPhone, timeAgo } from '@/lib/utils'
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, SERVICE_LABELS } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import type { Lead } from '@/types'

interface RecentLeadsProps {
  leads: Lead[]
}

export function RecentLeads({ leads }: RecentLeadsProps) {
  if (leads.length === 0) {
    return <p className="text-sm text-slate-500 text-center py-6">Nenhum lead ainda.</p>
  }

  return (
    <div className="divide-y divide-metal-dark/20">
      {leads.map((lead) => (
        <Link
          key={lead.id}
          href={`/admin/leads/${lead.id}`}
          className="flex items-center justify-between py-3 hover:bg-slate-50 -mx-2 px-2 rounded transition-colors"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate hover:text-amber-brand transition-colors">
              {lead.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-400">{formatPhone(lead.phone)}</span>
              {lead.service && (
                <span className="text-xs text-slate-400">· {SERVICE_LABELS[lead.service]}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-3">
            <Badge
              variant="outline"
              className={`text-[10px] border hidden sm:inline-flex ${LEAD_STATUS_COLORS[lead.status] ?? ''}`}
            >
              {LEAD_STATUS_LABELS[lead.status]}
            </Badge>
            <span className="text-xs text-slate-400">{timeAgo(lead.created_at)}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
