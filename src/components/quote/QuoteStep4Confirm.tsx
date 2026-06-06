'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, Edit2 } from 'lucide-react'
import { SERVICE_LABELS } from '@/lib/constants'
import { toast } from 'sonner'
import type { WizardState } from './QuoteWizard'

interface Props {
  state: WizardState
  onEdit: (step: number) => void
  onSuccess: (quoteId: string, leadId: string) => void
  onBack: () => void
}

export default function QuoteStep4Confirm({ state, onEdit, onSuccess, onBack }: Props) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: state.services,
          specs: state.specs,
          description: state.description,
          reference_image_paths: state.reference_image_paths,
          name: state.name,
          phone: state.phone,
          email: state.email || undefined,
          cep: state.cep,
          address: state.address,
          city: state.city,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      onSuccess(json.quote_id, json.lead_id)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar orçamento.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const rows = [
    {
      label: 'Serviços',
      value: state.services.map((s) => SERVICE_LABELS[s] ?? s).join(', '),
      step: 1,
    },
    { label: 'Descrição', value: state.description, step: 2 },
    { label: 'Nome', value: state.name, step: 3 },
    { label: 'Telefone', value: state.phone, step: 3 },
    { label: 'E-mail', value: state.email || '—', step: 3 },
    { label: 'Cidade', value: state.city, step: 3 },
    { label: 'CEP', value: state.cep, step: 3 },
  ]

  return (
    <div className="bg-graphite border border-metal-dark/30 rounded-2xl p-8">
      <h2 className="font-display text-2xl font-bold text-white mb-2">Revise seu pedido</h2>
      <p className="text-metal text-sm mb-8">Confirme as informações antes de enviar</p>

      <div className="space-y-3 mb-8">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 py-3 border-b border-metal-dark/20 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs text-metal-dark mb-0.5">{row.label}</p>
              <p className="text-sm text-metal-light truncate">{row.value || '—'}</p>
            </div>
            <button
              onClick={() => onEdit(row.step)}
              className="text-amber-brand/60 hover:text-amber-brand transition-colors shrink-0"
              aria-label={`Editar ${row.label}`}
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-steel/20 border border-amber-brand/20 rounded-xl p-4 mb-8">
        <p className="text-sm text-metal-light">
          Ao enviar, nossa equipe analisará seu pedido e retornará em até <strong className="text-white">24 horas</strong> com o orçamento detalhado.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-metal-dark/50 text-metal-light hover:bg-steel/30"
          disabled={submitting}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 bg-amber-brand hover:bg-amber-light text-carbon font-bold py-4 h-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Enviando...
            </>
          ) : (
            'Confirmar e Enviar Orçamento'
          )}
        </Button>
      </div>
    </div>
  )
}
