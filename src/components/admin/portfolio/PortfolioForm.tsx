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
import { Switch } from '@/components/ui/switch'
import { ImageUploader } from './ImageUploader'
import { SERVICE_LABELS } from '@/lib/constants'
import { slugify } from '@/lib/utils'
import type { PortfolioItem } from '@/types'
import { toast } from 'sonner'

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífens'),
  service: z.string().min(1),
  client_name: z.string().optional(),
  city: z.string().optional(),
  year: z.string().regex(/^(\d{4})?$/, 'Ano inválido').optional(),
  short_desc: z.string().max(160).optional(),
  description: z.string().optional(),
  seo_title: z.string().max(70).optional(),
  seo_description: z.string().max(160).optional(),
  featured: z.boolean(),
  published: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface PortfolioFormProps {
  item?: PortfolioItem
}

export function PortfolioForm({ item }: PortfolioFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(item?.images ?? [])
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title ?? '',
      slug: item?.slug ?? '',
      service: item?.service ?? '',
      client_name: item?.client_name ?? '',
      city: item?.city ?? '',
      year: item?.year ? String(item.year) : '',
      short_desc: item?.short_desc ?? '',
      description: item?.description ?? '',
      seo_title: item?.seo_title ?? '',
      seo_description: item?.seo_description ?? '',
      featured: item?.featured ?? false,
      published: item?.published ?? false,
    },
  })

  const title = watch('title')

  const onSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      toast.error('Adicione ao menos uma imagem.')
      return
    }
    setSaving(true)
    const payload = {
      ...data,
      year: data.year === '' ? null : data.year,
      cover_image: images[0],
      images,
    }
    const url = item ? `/api/admin/portfolio/${item.id}` : '/api/admin/portfolio'
    const method = item ? 'PATCH' : 'POST'
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
    toast.success(item ? 'Item atualizado.' : 'Item criado.')
    router.push('/admin/portfolio')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as Parameters<typeof handleSubmit>[0])} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Informações</h3>

            <div>
              <Label htmlFor="title" className="text-slate-500 text-sm">Título *</Label>
              <Input
                id="title"
                {...register('title')}
                className="mt-1 bg-white border-slate-200 text-foreground"
                placeholder="Ex: Portão deslizante em aço inox"
                onBlur={(e) => {
                  if (!item) setValue('slug', slugify(e.target.value))
                }}
              />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="slug" className="text-slate-500 text-sm">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                className="mt-1 bg-white border-slate-200 text-foreground font-mono text-sm"
                placeholder="portao-deslizante-aco-inox"
              />
              {errors.slug && <p className="text-xs text-red-400 mt-1">{errors.slug.message}</p>}
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
                <Label htmlFor="year" className="text-slate-500 text-sm">Ano</Label>
                <Input
                  id="year"
                  type="number"
                  {...register('year')}
                  className="mt-1 bg-white border-slate-200 text-foreground"
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name" className="text-slate-500 text-sm">Cliente</Label>
                <Input
                  id="client_name"
                  {...register('client_name')}
                  className="mt-1 bg-white border-slate-200 text-foreground"
                  placeholder="Nome do cliente"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-slate-500 text-sm">Cidade</Label>
                <Input
                  id="city"
                  {...register('city')}
                  className="mt-1 bg-white border-slate-200 text-foreground"
                  placeholder="São Paulo - SP"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="short_desc" className="text-slate-500 text-sm">Descrição curta (max 160 caracteres)</Label>
              <Input
                id="short_desc"
                {...register('short_desc')}
                className="mt-1 bg-white border-slate-200 text-foreground"
                placeholder="Breve descrição para cards e preview"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-slate-500 text-sm">Descrição completa</Label>
              <Textarea
                id="description"
                {...register('description')}
                rows={5}
                className="mt-1 bg-white border-slate-200 text-foreground resize-none"
                placeholder="Detalhes do projeto, materiais utilizados, desafios..."
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground">SEO</h3>
            <div>
              <Label htmlFor="seo_title" className="text-slate-500 text-sm">Título SEO (max 70)</Label>
              <Input
                id="seo_title"
                {...register('seo_title')}
                className="mt-1 bg-white border-slate-200 text-foreground"
                placeholder={title || 'Título para Google'}
              />
            </div>
            <div>
              <Label htmlFor="seo_description" className="text-slate-500 text-sm">Meta description (max 160)</Label>
              <Textarea
                id="seo_description"
                {...register('seo_description')}
                rows={2}
                className="mt-1 bg-white border-slate-200 text-foreground resize-none"
                placeholder="Descrição exibida no Google"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <ImageUploader
              value={images}
              onChange={setImages}
              label="Imagens do projeto *"
              maxFiles={12}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
            <h3 className="font-semibold text-foreground">Publicação</h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Publicado</p>
                <p className="text-xs text-slate-400">Visível no portfólio público</p>
              </div>
              <Switch
                checked={watch('published')}
                onCheckedChange={(v) => setValue('published', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Destaque</p>
                <p className="text-xs text-slate-400">Aparece na homepage</p>
              </div>
              <Switch
                checked={watch('featured')}
                onCheckedChange={(v) => setValue('featured', v)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-semibold"
          >
            {saving ? 'Salvando...' : item ? 'Salvar alterações' : 'Criar item'}
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
