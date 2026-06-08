'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft, Loader2 } from 'lucide-react'
import type { WizardState } from './QuoteWizard'

interface Props {
  data: WizardState
  onChange: (data: Partial<WizardState>) => void
  onNext: () => void
  onBack: () => void
}

async function fetchCep(cep: string) {
  const clean = cep.replace(/\D/g, '')
  if (clean.length !== 8) return null
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
    const json = await res.json()
    if (json.erro) return null
    return { address: json.logradouro || '', city: json.localidade || '', state: json.uf || '' }
  } catch {
    return null
  }
}

export default function QuoteStep3Contact({ data, onChange, onNext, onBack }: Props) {
  const [cepLoading, setCepLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleCepBlur(cep: string) {
    setCepLoading(true)
    const result = await fetchCep(cep)
    if (result) {
      onChange({ address: result.address, city: result.city, state: result.state })
    }
    setCepLoading(false)
  }

  function validate() {
    const errs: Record<string, string> = {}
    if (!data.name || data.name.length < 2) errs.name = 'Nome obrigatório'
    if (!data.phone || data.phone.replace(/\D/g, '').length < 10) errs.phone = 'Telefone inválido'
    if (!data.cep || data.cep.replace(/\D/g, '').length !== 8) errs.cep = 'CEP inválido'
    if (!data.city) errs.city = 'Cidade obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleNext() {
    if (validate()) onNext()
  }

  return (
    <div className="bg-graphite border border-metal-dark/30 rounded-2xl p-8">
      <h2 className="font-display text-2xl font-bold text-white mb-2">Como entramos em contato</h2>
      <p className="text-metal text-sm mb-8">Retornamos em até 24h com a proposta</p>

      <div className="space-y-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name" className="text-metal-light mb-2 block">Nome completo *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Seu nome"
              className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="phone" className="text-metal-light mb-2 block">Telefone / WhatsApp *</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value.replace(/\D/g, '') })}
              placeholder="(11) 99999-9999"
              className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-metal-light mb-2 block">E-mail (opcional)</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="seu@email.com"
            className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cep" className="text-metal-light mb-2 block">CEP *</Label>
            <div className="relative">
              <Input
                id="cep"
                value={data.cep}
                onChange={(e) => onChange({ cep: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                onBlur={(e) => handleCepBlur(e.target.value)}
                placeholder="00000-000"
                className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
              />
              {cepLoading && (
                <Loader2 className="w-4 h-4 animate-spin text-amber-brand absolute right-3 top-3" />
              )}
            </div>
            {errors.cep && <p className="text-red-400 text-xs mt-1">{errors.cep}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="city" className="text-metal-light mb-2 block">Cidade *</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="São Paulo"
              className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
            />
            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-metal-light mb-2 block">Endereço (opcional)</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Rua, número, bairro"
            className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-metal-dark/50 text-metal-light hover:bg-steel/30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-amber-brand hover:bg-amber-light text-carbon font-bold"
        >
          Revisar pedido
        </Button>
      </div>
    </div>
  )
}
