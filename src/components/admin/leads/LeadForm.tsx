'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SERVICE_LABELS, CLIENT_TYPE_LABELS } from '@/lib/constants'
import { toast } from 'sonner'
import type { Lead } from '@/types'

interface LeadFormProps {
  lead?: Lead
}

export function LeadForm({ lead }: LeadFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const [fields, setFields] = useState({
    name: lead?.name ?? '',
    phone: lead?.phone ?? '',
    email: lead?.email ?? '',
    company: lead?.company ?? '',
    city: lead?.city ?? '',
    service: lead?.service ?? '',
    client_type: lead?.client_type ?? 'pessoa_fisica',
    notes: lead?.notes ?? '',
    status: lead?.status ?? 'novo',
    source: lead?.source ?? 'manual',
  })

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.name.trim() || !fields.phone.trim()) {
      toast.error('Nome e telefone são obrigatórios.')
      return
    }
    setSaving(true)
    const payload = {
      ...fields,
      service: fields.service || null,
      email: fields.email || null,
      company: fields.company || null,
      city: fields.city || null,
      notes: fields.notes || null,
    }
    const url = lead ? `/api/admin/leads/${lead.id}` : '/api/admin/leads'
    const method = lead ? 'PATCH' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      toast.error(err.error ?? 'Erro ao salvar lead.')
      return
    }
    const data = await res.json()
    toast.success(lead ? 'Lead atualizado.' : 'Lead criado.')
    if (!lead) {
      const id = data.lead?.id ?? data.id
      router.push(`/admin/leads/${id}`)
    }
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Dados do contato</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-slate-500 text-sm">Nome *</Label>
                <Input id="name" value={fields.name} onChange={set('name')} required
                  className="mt-1 bg-white border-slate-200 text-foreground" placeholder="Nome completo" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-slate-500 text-sm">Telefone *</Label>
                <Input id="phone" value={fields.phone} onChange={set('phone')} required
                  className="mt-1 bg-white border-slate-200 text-foreground" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-500 text-sm">E-mail</Label>
                <Input id="email" type="email" value={fields.email} onChange={set('email')}
                  className="mt-1 bg-white border-slate-200 text-foreground" placeholder="email@empresa.com" />
              </div>
              <div>
                <Label htmlFor="company" className="text-slate-500 text-sm">Empresa</Label>
                <Input id="company" value={fields.company} onChange={set('company')}
                  className="mt-1 bg-white border-slate-200 text-foreground" placeholder="Nome da empresa" />
              </div>
              <div>
                <Label htmlFor="city" className="text-slate-500 text-sm">Cidade</Label>
                <Input id="city" value={fields.city} onChange={set('city')}
                  className="mt-1 bg-white border-slate-200 text-foreground" placeholder="São Paulo - SP" />
              </div>
              <div>
                <Label htmlFor="client_type" className="text-slate-500 text-sm">Tipo de cliente</Label>
                <select id="client_type" value={fields.client_type} onChange={set('client_type')}
                  className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm">
                  {Object.entries(CLIENT_TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Interesse e Observações</h3>

            <div>
              <Label htmlFor="service" className="text-slate-500 text-sm">Tipo de serviço</Label>
              <select id="service" value={fields.service} onChange={set('service')}
                className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm">
                <option value="">Não definido</option>
                {Object.entries(SERVICE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="notes" className="text-slate-500 text-sm">Observações</Label>
              <Textarea id="notes" value={fields.notes} onChange={set('notes')} rows={4}
                className="mt-1 bg-white border-slate-200 text-foreground resize-none"
                placeholder="Anotações internas sobre este lead..." />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Pipeline</h3>

            <div>
              <Label htmlFor="status" className="text-slate-500 text-sm">Status</Label>
              <select id="status" value={fields.status} onChange={set('status')}
                className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm">
                {[
                  { v: 'novo', l: 'Novo' },
                  { v: 'em_contato', l: 'Em Contato' },
                  { v: 'proposta_enviada', l: 'Proposta Enviada' },
                  { v: 'em_negociacao', l: 'Em Negociação' },
                  { v: 'ganho', l: 'Ganho' },
                  { v: 'perdido', l: 'Perdido' },
                ].map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
              </select>
            </div>

            <div>
              <Label htmlFor="source" className="text-slate-500 text-sm">Origem</Label>
              <select id="source" value={fields.source} onChange={set('source')}
                className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm">
                {[
                  ['manual', 'Manual'],
                  ['website', 'Site'],
                  ['whatsapp', 'WhatsApp'],
                  ['indicacao', 'Indicação'],
                  ['instagram', 'Instagram'],
                  ['google', 'Google'],
                ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>

          <Button type="submit" disabled={saving}
            className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-semibold">
            {saving ? 'Salvando...' : lead ? 'Salvar alterações' : 'Criar lead'}
          </Button>

          <Button type="button" variant="outline"
            className="w-full border-slate-200 text-slate-500 hover:text-foreground"
            onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  )
}
