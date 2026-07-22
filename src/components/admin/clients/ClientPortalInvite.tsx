'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2 } from 'lucide-react'

interface Props {
  clientId: string
  email: string | null
  portalEnabled: boolean
}

export function ClientPortalInvite({ clientId, email, portalEnabled }: Props) {
  const router = useRouter()
  const [value, setValue] = useState(email ?? '')
  const [loading, setLoading] = useState(false)

  async function handleInvite() {
    if (!value.trim()) {
      toast.error('Informe um e-mail válido.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erro ao convidar cliente.')
      if (data.emailSent) {
        toast.success('Convite enviado! O cliente vai receber um e-mail pra acessar o portal.')
      } else {
        toast.success('E-mail vinculado. Esse endereço já tinha acesso confirmado, então nenhum e-mail novo foi enviado.')
      }
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao convidar cliente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      {portalEnabled && (
        <div className="flex items-center gap-2 text-sm text-green-600 mb-1">
          <CheckCircle2 className="w-4 h-4" />
          Convite enviado — o cliente já pode acessar o portal com este e-mail.
        </div>
      )}
      <p className="text-xs text-slate-400">
        {portalEnabled
          ? 'E-mail não chegou? Reenvie abaixo — pode usar outro endereço se o cliente preferir.'
          : 'Convide o cliente pra acessar o portal por e-mail.'}
      </p>
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
        <Input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="email@cliente.com"
          className="bg-white border-slate-200 text-foreground text-sm h-9"
        />
      </div>
      <Button
        onClick={handleInvite}
        disabled={loading}
        size="sm"
        className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold"
      >
        {loading ? 'Enviando...' : portalEnabled ? 'Reenviar convite' : 'Convidar pro portal'}
      </Button>
    </div>
  )
}
