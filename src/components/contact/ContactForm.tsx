'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
      <div className="bg-graphite border border-green-500/20 rounded-xl p-10 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-white mb-3">Mensagem enviada!</h3>
        <p className="text-metal">Retornaremos em até 24 horas. Obrigado pelo contato.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-graphite border border-metal-dark/30 rounded-xl p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name" className="text-metal-light mb-2 block">Nome *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Seu nome completo"
            className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className="text-metal-light mb-2 block">Telefone *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="(11) 99999-9999"
            className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
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
          className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark"
        />
      </div>

      <div>
        <Label className="text-metal-light mb-2 block">Serviço de interesse</Label>
        <Select onValueChange={(v) => setValue('service', v)}>
          <SelectTrigger className="bg-steel/30 border-metal-dark/40 text-white">
            <SelectValue placeholder="Selecione um serviço" />
          </SelectTrigger>
          <SelectContent className="bg-graphite border-metal-dark/40">
            <SelectItem value="portoes">Portões</SelectItem>
            <SelectItem value="grades_e_cercas">Grades e Cercas</SelectItem>
            <SelectItem value="escadas">Escadas Metálicas</SelectItem>
            <SelectItem value="corrimoes">Corrimões e Guarda-corpos</SelectItem>
            <SelectItem value="estruturas_metalicas">Estruturas Metálicas</SelectItem>
            <SelectItem value="sob_medida">Projeto Sob Medida</SelectItem>
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
          className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-white placeholder:text-metal-dark resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-bold py-4 h-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Enviando...
          </>
        ) : (
          'Enviar Mensagem'
        )}
      </Button>
    </form>
  )
}
