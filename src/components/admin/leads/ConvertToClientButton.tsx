'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { UserPlus, ExternalLink } from 'lucide-react'

interface Props {
  leadId: string
  clientId: string | null
}

export function ConvertToClientButton({ leadId, clientId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (clientId) {
    return (
      <Link
        href={`/admin/clientes/${clientId}`}
        className="inline-flex items-center gap-2 text-sm text-[#ea580c] hover:text-[#c2410c] font-medium transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Ver cliente vinculado
      </Link>
    )
  }

  async function handleConvert() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/convert`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erro ao converter lead.')
      toast.success('Lead convertido em cliente!')
      router.push(`/admin/clientes/${data.client.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao converter lead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleConvert}
      disabled={loading}
      variant="outline"
      size="sm"
      className="w-full border-[#ea580c]/30 text-[#ea580c] hover:bg-[#ea580c]/5"
    >
      <UserPlus className="w-4 h-4 mr-2" />
      {loading ? 'Convertendo...' : 'Converter em cliente'}
    </Button>
  )
}
