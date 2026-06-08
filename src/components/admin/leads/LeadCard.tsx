import Link from 'next/link'
import { Phone, Building2, MapPin, Calendar } from 'lucide-react'
import { SERVICE_LABELS } from '@/lib/constants'
import { formatPhone, timeAgo } from '@/lib/utils'
import type { Lead } from '@/types'

interface LeadCardProps {
  lead: Lead
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Link href={`/admin/leads/${lead.id}`} className="block group">
      <div className="bg-carbon border border-metal-dark/30 rounded-lg p-3.5 hover:border-amber-brand/40 transition-colors cursor-pointer">
        <p className="text-sm font-medium text-foreground group-hover:text-amber-brand transition-colors truncate mb-1">
          {lead.name}
        </p>

        {lead.company && (
          <div className="flex items-center gap-1.5 mb-1">
            <Building2 className="w-3 h-3 text-metal-dark shrink-0" />
            <span className="text-xs text-metal truncate">{lead.company}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 mb-1">
          <Phone className="w-3 h-3 text-metal-dark shrink-0" />
          <span className="text-xs text-metal">{formatPhone(lead.phone)}</span>
        </div>

        {lead.city && (
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-3 h-3 text-metal-dark shrink-0" />
            <span className="text-xs text-metal truncate">{lead.city}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-metal-dark/20">
          {lead.service ? (
            <span className="text-[10px] bg-amber-brand/10 text-amber-brand px-1.5 py-0.5 rounded font-medium truncate max-w-[70%]">
              {SERVICE_LABELS[lead.service]}
            </span>
          ) : (
            <span className="text-[10px] text-metal-dark">Serviço não definido</span>
          )}
          <div className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3 text-metal-dark" />
            <span className="text-[10px] text-metal-dark">{timeAgo(lead.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
