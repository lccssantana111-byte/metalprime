'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface Props {
  leadId: string
}

export default function LeadNoteForm({ leadId }: Props) {
  const router = useRouter()
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!note.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note, type: 'note' }),
      })
      if (!res.ok) throw new Error()
      setNote('')
      toast.success('Nota adicionada')
      router.refresh()
    } catch {
      toast.error('Erro ao adicionar nota')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-metal-dark/20 pt-5">
      <p className="text-xs font-medium text-metal-dark mb-3 uppercase tracking-wider">
        Adicionar nota
      </p>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Registre uma ligação, visita, e-mail ou qualquer interação..."
        rows={3}
        className="bg-steel/20 border-metal-dark/30 focus:border-amber-brand/40 text-white placeholder:text-metal-dark resize-none mb-3"
      />
      <Button
        type="submit"
        disabled={loading || !note.trim()}
        size="sm"
        className="bg-amber-brand hover:bg-amber-light text-carbon font-semibold disabled:opacity-40"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Adicionar nota'}
      </Button>
    </form>
  )
}
