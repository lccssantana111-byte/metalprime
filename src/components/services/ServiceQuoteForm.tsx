'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'

interface Props {
  serviceName: string
  serviceSlug?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ServiceQuoteForm({ serviceName, serviceSlug }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function formatPhone(value: string) {
    return value.replace(/\D/g, '').slice(0, 11)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const cleanPhone = form.phone.replace(/\D/g, '')

    if (cleanPhone.length < 10) {
      setErrorMsg('Telefone inválido. Use DDD + número.')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: cleanPhone,
          email: form.email.trim() || undefined,
          service: serviceSlug || serviceName,
          message: form.message.trim() || `Interesse em ${serviceName}`,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erro ao enviar.')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <section
      ref={ref}
      className="py-28 sm:py-36 overflow-hidden"
      style={{ background: '#0c0e11', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Orçamento rápido
            </span>
            <h2
              className="font-display font-black leading-[0.88] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
            >
              Receba uma<br />
              <span style={{ color: '#c4a040' }}>proposta</span>
            </h2>
            <p className="text-[14px] leading-[1.8] mb-10" style={{ color: 'rgba(180,188,198,0.4)' }}>
              Preencha os dados abaixo e nossa equipe entra em contato em até 24 horas com uma proposta personalizada.
            </p>

            <ul className="space-y-4">
              {[
                'Visita técnica gratuita',
                'Orçamento sem compromisso',
                'ART inclusa em todos os projetos',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(196,160,64,0.1)', border: '1px solid rgba(196,160,64,0.25)' }}
                  >
                    <Check className="w-3 h-3" style={{ color: '#c4a040' }} />
                  </div>
                  <span className="text-[13px]" style={{ color: 'rgba(180,188,198,0.5)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-[11px] font-mono mb-3" style={{ color: 'rgba(180,188,198,0.2)' }}>
                Prefere falar agora?
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${serviceName.toLowerCase()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-mono transition-colors"
                style={{ color: 'rgba(180,188,198,0.35)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.35)' }}
              >
                Falar pelo WhatsApp →
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <div
                className="p-10 sm:p-14 flex flex-col items-start"
                style={{ background: '#13161b', border: '1px solid rgba(196,160,64,0.15)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-8"
                  style={{ background: 'rgba(196,160,64,0.1)', border: '1px solid rgba(196,160,64,0.3)' }}
                >
                  <Check className="w-5 h-5" style={{ color: '#c4a040' }} />
                </div>
                <h3 className="font-display font-bold text-[1.5rem] mb-4" style={{ color: '#f0f1f2' }}>
                  Solicitação recebida
                </h3>
                <p className="text-[14px] leading-[1.8] mb-8" style={{ color: 'rgba(180,188,198,0.5)' }}>
                  Nossa equipe vai analisar sua solicitação e entrar em contato em até 24 horas.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Acabei de preencher o formulário de ${serviceName.toLowerCase()}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200"
                  style={{ background: '#c4a040', color: '#050608' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
                >
                  Confirmar pelo WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-12 space-y-6"
                style={{ background: '#13161b', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {/* Service badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2"
                  style={{ background: 'rgba(196,160,64,0.07)', border: '1px solid rgba(196,160,64,0.18)' }}
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#c4a040' }}>
                    Serviço selecionado
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: 'rgba(240,241,242,0.5)' }}>
                    {serviceName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(180,188,198,0.35)' }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 text-[14px] outline-none transition-colors"
                      style={{
                        background: '#0c0e11',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#f0f1f2',
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,160,64,0.4)' }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(180,188,198,0.35)' }}>
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(e) => setForm(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
                      required
                      placeholder="11 99999-9999"
                      className="w-full px-4 py-3 text-[14px] outline-none transition-colors"
                      style={{
                        background: '#0c0e11',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#f0f1f2',
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,160,64,0.4)' }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(180,188,198,0.35)' }}>
                    E-mail <span style={{ color: 'rgba(180,188,198,0.2)' }}>(opcional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 text-[14px] outline-none transition-colors"
                    style={{
                      background: '#0c0e11',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#f0f1f2',
                    }}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,160,64,0.4)' }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(180,188,198,0.35)' }}>
                    Descreva o projeto <span style={{ color: 'rgba(180,188,198,0.2)' }}>(opcional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tipo de portão, medidas aproximadas, local da instalação..."
                    rows={4}
                    className="w-full px-4 py-3 text-[14px] outline-none transition-colors resize-none"
                    style={{
                      background: '#0c0e11',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#f0f1f2',
                    }}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,160,64,0.4)' }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                  />
                </div>

                {status === 'error' && errorMsg && (
                  <p className="text-[12px] font-mono" style={{ color: '#c0392b' }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex items-center gap-3 font-bold text-[13px] tracking-[0.1em] uppercase px-10 py-[18px] transition-all duration-200 disabled:opacity-50"
                  style={{ background: '#c4a040', color: '#050608' }}
                  onMouseEnter={(e) => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
                >
                  {status === 'loading' ? 'Enviando...' : 'Solicitar Orçamento'}
                  {status !== 'loading' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>

                <p className="text-[11px] font-mono" style={{ color: 'rgba(180,188,198,0.2)' }}>
                  Seus dados são usados apenas para retorno de contato. Sem spam.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
