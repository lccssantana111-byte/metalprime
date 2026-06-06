'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LEAD_STATUS_LABELS } from '@/lib/constants'
import type { LeadStatus } from '@/types'
import { Loader2 } from 'lucide-react'

const statuses: LeadStatus[] = [
  'novo',
  'em_contato',
  'proposta_enviada',
  'em_negociacao',
  'ganho',
  'perdido',
  'sem_interesse',
]

interface Props {
  leadId: string
  currentStatus: LeadStatus
}

export default function LeadStatusChanger({ leadId, currentStatus }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<LeadStatus>(currentStatus)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    if (status === currentStatus) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success('Status atualizado')
      router.refresh()
    } catch {
      toast.error('Erro ao atualizar status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
        <SelectTrigger className="bg-steel/30 border-metal-dark/40 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-graphite border-metal-dark/40">
          {statuses.map((s) => (
            <SelectItem key={s} value={s} className="text-metal-light focus:text-white">
              {LEAD_STATUS_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleSave}
        disabled={loading || status === currentStatus}
        size="sm"
        className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-semibold disabled:opacity-40"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar status'}
      </Button>
    </div>
  )
}
