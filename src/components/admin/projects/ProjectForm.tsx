'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SERVICE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/constants'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Project } from '@/types'

const schema = z.object({
  name: z.string().min(3),
  service: z.string().min(1),
  status: z.string().min(1),
  description: z.string().optional(),
  contract_value: z.string().optional(),
  amount_paid: z.string().optional(),
  start_date: z.string().optional(),
  estimated_end: z.string().optional(),
  client_id: z.string().optional(),
  quote_id: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Milestone {
  title: string
  due_date: string
  completed_at: string | null
}

interface ProjectFormProps {
  project?: Project
  clients?: { id: string; name: string }[]
}

export function ProjectForm({ project, clients = [] }: ProjectFormProps) {
  const router = useRouter()
  const [milestones, setMilestones] = useState<Milestone[]>(
    project?.milestones?.map((m) => ({ title: m.title, due_date: m.due_date ?? '', completed_at: m.completed_at ?? null })) ?? []
  )
  const [newMilestone, setNewMilestone] = useState('')
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: project?.name ?? '',
      service: project?.service ?? '',
      status: project?.status ?? 'planejamento',
      description: project?.description ?? '',
      contract_value: String(project?.contract_value ?? 0),
      amount_paid: String(project?.amount_paid ?? 0),
      start_date: project?.start_date ?? '',
      estimated_end: project?.estimated_end ?? '',
      client_id: project?.client_id ?? '',
      quote_id: project?.quote_id ?? '',
    },
  })

  const addMilestone = () => {
    const t = newMilestone.trim()
    if (!t) return
    setMilestones((prev) => [...prev, { title: t, due_date: '', completed_at: null }])
    setNewMilestone('')
  }

  const removeMilestone = (i: number) => {
    setMilestones((prev) => prev.filter((_, idx) => idx !== i))
  }

  const updateMilestoneDate = (i: number, date: string) => {
    setMilestones((prev) => prev.map((m, idx) => (idx === i ? { ...m, due_date: date } : m)))
  }

  const toggleMilestoneCompleted = (i: number) => {
    setMilestones((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, completed_at: m.completed_at ? null : new Date().toISOString() } : m))
    )
  }

  const onSubmit = async (data: FormValues) => {
    setSaving(true)
    const payload = {
      ...data,
      contract_value: parseFloat(data.contract_value ?? '0') || 0,
      amount_paid: parseFloat(data.amount_paid ?? '0') || 0,
      client_id: data.client_id || null,
      quote_id: data.quote_id || null,
      start_date: data.start_date || null,
      estimated_end: data.estimated_end || null,
      milestones: milestones.filter((m) => m.title.trim()),
    }
    const url = project ? `/api/admin/projects/${project.id}` : '/api/admin/projects'
    const method = project ? 'PATCH' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      toast.error(err.error ?? 'Erro ao salvar.')
      return
    }
    toast.success(project ? 'Projeto atualizado.' : 'Projeto criado.')
    router.push('/admin/projetos')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as Parameters<typeof handleSubmit>[0])} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Dados do projeto</h3>

            <div>
              <Label htmlFor="name" className="text-slate-500 text-sm">Nome do projeto *</Label>
              <Input
                id="name"
                {...register('name')}
                className="mt-1 bg-white border-slate-200 text-foreground"
                placeholder="Ex: Portão deslizante Condomínio ABC"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service" className="text-slate-500 text-sm">Serviço *</Label>
                <select
                  id="service"
                  {...register('service')}
                  className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Selecione</option>
                  {Object.entries(SERVICE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                {errors.service && <p className="text-xs text-red-400 mt-1">{errors.service.message}</p>}
              </div>
              <div>
                <Label htmlFor="status" className="text-slate-500 text-sm">Status *</Label>
                <select
                  id="status"
                  {...register('status')}
                  className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm"
                >
                  {Object.entries(PROJECT_STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {clients.length > 0 && (
              <div>
                <Label htmlFor="client_id" className="text-slate-500 text-sm">Cliente</Label>
                <select
                  id="client_id"
                  {...register('client_id')}
                  className="mt-1 w-full bg-white border border-slate-200 text-foreground rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Sem cliente vinculado</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <Label htmlFor="description" className="text-slate-500 text-sm">Descrição</Label>
              <Textarea
                id="description"
                {...register('description')}
                rows={3}
                className="mt-1 bg-white border-slate-200 text-foreground resize-none"
                placeholder="Detalhes do projeto, especificações técnicas..."
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Marcos do projeto</h3>

            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!m.completed_at}
                    onChange={() => toggleMilestoneCompleted(i)}
                    title="Marcar como concluído"
                    className="w-4 h-4 shrink-0 accent-[#f97316]"
                  />
                  <div className="flex-1 flex items-center gap-2">
                    <span className={`text-sm flex-1 ${m.completed_at ? 'text-slate-400 line-through' : 'text-foreground'}`}>
                      {m.title}
                    </span>
                    <Input
                      type="date"
                      value={m.due_date}
                      onChange={(e) => updateMilestoneDate(i, e.target.value)}
                      className="w-40 bg-white border-slate-200 text-foreground text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMilestone(i)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
                placeholder="Novo marco (ex: Medição no local)"
                className="bg-white border-slate-200 text-foreground"
              />
              <Button
                type="button"
                onClick={addMilestone}
                variant="outline"
                className="border-slate-200 text-slate-500 hover:text-foreground shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Financeiro</h3>
            <div>
              <Label htmlFor="contract_value" className="text-slate-500 text-sm">Valor do contrato (R$)</Label>
              <Input
                id="contract_value"
                type="number"
                step="0.01"
                {...register('contract_value')}
                className="mt-1 bg-white border-slate-200 text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="amount_paid" className="text-slate-500 text-sm">Valor recebido (R$)</Label>
              <Input
                id="amount_paid"
                type="number"
                step="0.01"
                {...register('amount_paid')}
                className="mt-1 bg-white border-slate-200 text-foreground"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Datas</h3>
            <div>
              <Label htmlFor="start_date" className="text-slate-500 text-sm">Início</Label>
              <Input
                id="start_date"
                type="date"
                {...register('start_date')}
                className="mt-1 bg-white border-slate-200 text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="estimated_end" className="text-slate-500 text-sm">Previsão de término</Label>
              <Input
                id="estimated_end"
                type="date"
                {...register('estimated_end')}
                className="mt-1 bg-white border-slate-200 text-foreground"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold"
          >
            {saving ? 'Salvando...' : project ? 'Salvar alterações' : 'Criar projeto'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-slate-200 text-slate-500 hover:text-foreground"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  )
}
