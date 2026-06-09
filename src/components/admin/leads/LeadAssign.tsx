'use client'

import { useState } from 'react'
import { UserCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  full_name: string
}

interface Props {
  leadId: string
  assignedTo: string | null
  users: User[]
}

export function LeadAssign({ leadId, assignedTo, users }: Props) {
  const [selected, setSelected] = useState(assignedTo ?? '')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function assign(userId: string) {
    setSelected(userId)
    setLoading(true)
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: userId || null }),
      })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <UserCheck className="w-4 h-4 text-slate-400" />
        <span className="text-xs text-slate-400">Responsável</span>
        {loading && <Loader2 className="w-3 h-3 text-slate-400 animate-spin" />}
      </div>
      <select
        value={selected}
        onChange={(e) => assign(e.target.value)}
        disabled={loading}
        className="w-full bg-slate-100 border border-slate-200 text-sm text-foreground rounded-lg px-3 py-2 focus:outline-none focus:border-amber-brand/50 disabled:opacity-50"
      >
        <option value="">— Sem responsável —</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.full_name}
          </option>
        ))}
      </select>
    </div>
  )
}
