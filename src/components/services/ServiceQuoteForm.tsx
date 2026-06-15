'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Phone, MessageSquare } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { SectionLabel, SectionHeading, CTAButton, COLORS, TYPOGRAPHY, SPACING } from '@/components/ui/design-system'
import { springEase, fadeUp, staggerContainer } from '@/lib/animations'

interface Props {
  serviceName: string
  serviceSlug?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const GUARANTEES = [
  { label: 'Visita técnica gratuita', sub: 'Engenheiro no local, sem custo' },
  { label: 'Orçamento em 24 horas', sub: 'Resposta garantida no dia seguinte' },
  { label: 'ART inclusa', sub: '100% dos projetos estruturais' },
]

export default function ServiceQuoteForm({ serviceName, serviceSlug }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [activeGuarantee, setActiveGuarantee] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGuarantee(prev => (prev + 1) % GUARANTEES.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

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

  function inputStyle(name: string): React.CSSProperties {
    const focused = focusedField === name
    return {
      width: '100%',
      padding: '14px 16px',
      fontFamily: TYPOGRAPHY.families.body,
      fontSize: '14px',
      lineHeight: 1.5,
      color: '#ffffff',
      background: focused ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${focused ? COLORS.brand.orange : 'rgba(255,255,255,0.1)'}`,
      outline: 'none',
      transition: 'border-color 0.2s, background 0.2s',
      borderRadius: 0,
      boxSizing: 'border-box' as const,
    }
  }

  return (
    <section
      ref={ref}
      style={{
        background: COLORS.bg.dark,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
        padding: `${SPACING.section.paddingYLg} 0`,
      }}
    >
      {/* Background accent — radial glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: `0 ${SPACING.container.paddingX}`,
        position: 'relative',
        zIndex: 1,
      }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}
        >

          {/* ── Left column ──────────────────────────────────── */}
          <motion.div
            className="lg:col-span-5"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
              <SectionLabel label="Orçamento rápido" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <SectionHeading size="large" light style={{ marginBottom: '1.5rem' }}>
                Receba uma<br />
                <span style={{ color: COLORS.brand.orange }}>proposta</span>
              </SectionHeading>
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: TYPOGRAPHY.families.body,
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '3rem',
                maxWidth: '40ch',
              }}
            >
              Nossa equipe entra em contato em até 24 horas com uma proposta personalizada para {serviceName.toLowerCase()}.
            </motion.p>

            {/* Guarantees */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {GUARANTEES.map((g, i) => (
                <div
                  key={g.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.25rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Orange circle with check */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: i === activeGuarantee ? COLORS.brand.orange : 'rgba(249,115,22,0.12)',
                    border: `1px solid ${i === activeGuarantee ? COLORS.brand.orange : COLORS.brand.dimBorder}`,
                    transition: 'background 0.4s, border-color 0.4s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Check style={{ width: '14px', height: '14px', color: i === activeGuarantee ? '#ffffff' : COLORS.brand.orange, transition: 'color 0.4s' }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: TYPOGRAPHY.families.body,
                      fontWeight: 600,
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.85)',
                      marginBottom: '2px',
                    }}>
                      {g.label}
                    </div>
                    <div style={{
                      fontFamily: TYPOGRAPHY.families.mono,
                      fontSize: '10px',
                      letterSpacing: '0.06em',
                      color: 'rgba(255,255,255,0.3)',
                    }}>
                      {g.sub}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* WhatsApp shortcut */}
            <motion.div variants={fadeUp} style={{ marginTop: '2rem' }}>
              <p style={{
                fontFamily: TYPOGRAPHY.families.mono,
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
                marginBottom: '0.75rem',
              }}>
                Prefere falar agora?
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${serviceName.toLowerCase()}.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: TYPOGRAPHY.families.mono,
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = COLORS.brand.orange }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
              >
                <MessageSquare style={{ width: '13px', height: '13px' }} />
                Falar pelo WhatsApp →
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right column — form ───────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: springEase }}
          >
            {status === 'success' ? (

              /* ── Success state ──────────────────────────────── */
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: springEase }}
                style={{
                  padding: 'clamp(2.5rem, 5vw, 4rem)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 0,
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: COLORS.brand.orange,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                }}>
                  <Check style={{ width: '22px', height: '22px', color: '#ffffff' }} />
                </div>

                {/* Orange top bar */}
                <div style={{ width: '40px', height: '3px', background: COLORS.brand.orange, marginBottom: '1.5rem' }} />

                <h3 style={{
                  fontFamily: TYPOGRAPHY.families.heading,
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 0.92,
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                  color: '#ffffff',
                  marginBottom: '1rem',
                }}>
                  Solicitação<br />
                  <span style={{ color: COLORS.brand.orange }}>recebida.</span>
                </h3>
                <p style={{
                  fontFamily: TYPOGRAPHY.families.body,
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: '2.5rem',
                  maxWidth: '38ch',
                }}>
                  Nossa equipe vai analisar sua solicitação e entrar em contato em até 24 horas com uma proposta detalhada.
                </p>
                <CTAButton
                  variant="primary"
                  hrefExternal={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Acabei de preencher o formulário de ${serviceName.toLowerCase()}.`}
                  icon={<ArrowRight style={{ width: '14px', height: '14px' }} />}
                >
                  Confirmar pelo WhatsApp
                </CTAButton>
              </motion.div>

            ) : (

              /* ── Form ───────────────────────────────────────── */
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Orange top bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${COLORS.brand.orange} 0%, #fbbf24 50%, ${COLORS.brand.orange} 100%)`,
                }} />

                <div style={{ padding: 'clamp(2rem, 4vw, 3rem)', paddingTop: 'calc(clamp(2rem, 4vw, 3rem) + 4px)' }}>

                  {/* Service badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: COLORS.brand.dim,
                    border: `1px solid ${COLORS.brand.dimBorder}`,
                    padding: '6px 14px',
                    marginBottom: '2rem',
                  }}>
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: COLORS.brand.orange,
                    }} />
                    <span style={{
                      fontFamily: TYPOGRAPHY.families.mono,
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: COLORS.brand.orange,
                    }}>
                      {serviceName}
                    </span>
                  </div>

                  {/* Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Name + Phone row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1rem' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: TYPOGRAPHY.families.mono,
                          fontSize: '9px',
                          letterSpacing: '0.35em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.3)',
                          marginBottom: '8px',
                        }}>
                          Nome <span style={{ color: COLORS.brand.orange }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          minLength={2}
                          placeholder="Seu nome completo"
                          style={inputStyle('name')}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: TYPOGRAPHY.families.mono,
                          fontSize: '9px',
                          letterSpacing: '0.35em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.3)',
                          marginBottom: '8px',
                        }}>
                          WhatsApp <span style={{ color: COLORS.brand.orange }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={(e) => setForm(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
                          required
                          placeholder="11 99999-9999"
                          style={inputStyle('phone')}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: TYPOGRAPHY.families.mono,
                        fontSize: '9px',
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        marginBottom: '8px',
                      }}>
                        E-mail <span style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'normal' }}>— opcional</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        style={inputStyle('email')}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: TYPOGRAPHY.families.mono,
                        fontSize: '9px',
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        marginBottom: '8px',
                      }}>
                        Descreva o projeto <span style={{ color: 'rgba(255,255,255,0.2)' }}>— opcional</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={`Tipo de ${serviceName.toLowerCase()}, medidas aproximadas, local de instalação...`}
                        rows={4}
                        style={{ ...inputStyle('message'), resize: 'none' }}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && errorMsg && (
                      <p style={{
                        fontFamily: TYPOGRAPHY.families.mono,
                        fontSize: '11px',
                        letterSpacing: '0.05em',
                        color: '#f87171',
                        padding: '10px 14px',
                        background: 'rgba(248,113,113,0.08)',
                        border: '1px solid rgba(248,113,113,0.2)',
                      }}>
                        {errorMsg}
                      </p>
                    )}

                    {/* Submit row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <CTAButton
                        variant="primary"
                        type="submit"
                        disabled={status === 'loading'}
                        iconCircle
                        icon={status === 'loading'
                          ? <span style={{ width: '14px', height: '14px', display: 'block', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
                          : <ArrowRight style={{ width: '14px', height: '14px' }} />
                        }
                      >
                        {status === 'loading' ? 'Enviando...' : 'Solicitar Orçamento'}
                      </CTAButton>

                      <p style={{
                        fontFamily: TYPOGRAPHY.families.mono,
                        fontSize: '9px',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.50)',
                        maxWidth: '28ch',
                        lineHeight: 1.6,
                      }}>
                        Seus dados são usados apenas para retorno de contato.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
