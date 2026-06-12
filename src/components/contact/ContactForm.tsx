'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import CTAButton from '@/components/ui/design-system/CTAButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { contactSchema, type ContactFormData } from '@/lib/validators/contact'
import { Loader2, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    }
  }

  if (submitted) {
    return (
      <div style={{ background: 'rgba(17,19,24,0.9)', border: '1px solid rgba(34,197,94,0.2)', padding: '3rem 2rem', textAlign: 'center' }}>
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">Mensagem enviada!</h3>
        <p className="text-metal">Retornaremos em até 24 horas. Obrigado pelo contato.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name" className="text-metal-light mb-2 block">Nome *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Seu nome completo"
            className="bg-white/[0.06] border-white/[0.12] focus:border-[#f97316]/60 placeholder:text-white/30"
            style={{ color: '#ffffff' }}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className="text-metal-light mb-2 block">Telefone *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="(11) 99999-9999"
            className="bg-white/[0.06] border-white/[0.12] focus:border-[#f97316]/60 placeholder:text-white/30"
            style={{ color: '#ffffff' }}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-metal-light mb-2 block">E-mail</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="seu@email.com"
          className="bg-white/[0.06] border-white/[0.12] focus:border-[#f97316]/60 placeholder:text-white/30"
          style={{ color: '#ffffff' }}
        />
      </div>

      <div>
        <Label className="text-metal-light mb-2 block">Serviço de interesse</Label>
        <Select onValueChange={(v) => setValue('service', v)}>
          <SelectTrigger
            className="bg-white/[0.06] border-white/[0.12]"
            style={{ color: '#ffffff' }}
          >
            <SelectValue placeholder="Selecione um serviço" />
          </SelectTrigger>
          <SelectContent
            style={{
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#ffffff',
            }}
          >
            <SelectItem value="portoes" style={{ color: '#ffffff' }}>Portões</SelectItem>
            <SelectItem value="grades_e_cercas" style={{ color: '#ffffff' }}>Grades e Cercas</SelectItem>
            <SelectItem value="escadas" style={{ color: '#ffffff' }}>Escadas Metálicas</SelectItem>
            <SelectItem value="corrimoes" style={{ color: '#ffffff' }}>Corrimões e Guarda-corpos</SelectItem>
            <SelectItem value="estruturas_metalicas" style={{ color: '#ffffff' }}>Estruturas Metálicas</SelectItem>
            <SelectItem value="sob_medida" style={{ color: '#ffffff' }}>Projeto Sob Medida</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message" className="text-metal-light mb-2 block">Mensagem *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Descreva brevemente o que você precisa..."
          rows={5}
          className="bg-white/[0.06] border-white/[0.12] focus:border-[#f97316]/60 placeholder:text-white/30 resize-none"
          style={{ color: '#ffffff' }}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <CTAButton
        variant="primary"
        type="submit"
        disabled={isSubmitting}
        size="lg"
        style={{ width: '100%', justifyContent: 'center', borderRadius: 0, marginTop: '0.25rem' }}
      >
        {isSubmitting ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </span>
        ) : (
          'Enviar Mensagem'
        )}
      </CTAButton>
    </form>
  )
}
