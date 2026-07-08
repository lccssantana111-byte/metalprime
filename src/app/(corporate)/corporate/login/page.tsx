'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'
import { useWhatsAppNumber } from '@/components/providers/WhatsAppNumberProvider'

export default function CorporateLoginPage() {
  const WHATSAPP_NUMBER = useWhatsAppNumber()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/api/auth/callback?next=/corporate/dashboard`,
      },
    })
    setLoading(false)
    if (error) {
      toast.error('Erro ao enviar link. Tente novamente.')
    } else {
      setSent(true)
    }
  }

  return (
    <div style={{
      flex: 1,
      minHeight: '100dvh',
      background: '#0a0f1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '500px',
        background: 'radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Top edge accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 40%, rgba(249,115,22,0.5) 60%, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1.5rem',
          }}>
            <img
              src="/logo.png"
              alt="Metal Shark logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain', display: 'block' }}
            />
            <span style={{
              fontFamily: 'var(--font-display, var(--font-sans))',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.95)',
              letterSpacing: '-0.01em',
            }}>
              {BRAND_NAME.split(' ')[0]}
              <span style={{ color: '#f97316' }}>.</span>
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display, var(--font-sans))',
            fontSize: 'clamp(1.6rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: 0,
          }}>
            Portal Corporativo
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.45)',
            marginTop: '8px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono, monospace)',
          }}>
            Acesso exclusivo para clientes
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 50%, transparent)',
          }} />

          <div style={{ padding: '2rem' }}>
            {!sent ? (
              <>
                <h2 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  margin: '0 0 6px',
                  letterSpacing: '-0.01em',
                }}>
                  Entrar com e-mail
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                  margin: '0 0 1.75rem',
                }}>
                  Insira seu e-mail cadastrado e enviaremos um link de acesso direto — sem senha.
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono, monospace)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: '8px',
                    }}>
                      E-mail corporativo
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="seuemail@empresa.com.br"
                      required
                      autoComplete="email"
                      style={{
                        width: '100%',
                        height: '46px',
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${focused ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.10)'}`,
                        borderRadius: '10px',
                        padding: '0 14px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.9)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      width: '100%',
                      height: '46px',
                      background: loading
                        ? 'rgba(249,115,22,0.5)'
                        : hovered
                          ? '#ea580c'
                          : '#f97316',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      transform: hovered && !loading ? 'translateY(-1px)' : 'translateY(0)',
                      boxShadow: hovered && !loading
                        ? '0 8px 32px rgba(249,115,22,0.45)'
                        : '0 4px 20px rgba(249,115,22,0.3)',
                      fontFamily: 'inherit',
                    }}
                  >
                    {loading ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Mail style={{ width: '15px', height: '15px' }} />
                        Receber link de acesso
                        <ArrowRight style={{ width: '15px', height: '15px' }} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <CheckCircle style={{ width: '24px', height: '24px', color: '#4ade80' }} />
                </div>
                <h2 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  margin: '0 0 8px',
                }}>
                  Link enviado
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  Verifique sua caixa de entrada em{' '}
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{email}</span>{' '}
                  e clique no link para acessar.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: '1.25rem',
                    fontSize: '13px',
                    color: '#f97316',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    fontFamily: 'inherit',
                  }}
                >
                  Usar outro e-mail
                </button>
              </div>
            )}
          </div>

          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)',
          }} />
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
          marginTop: '1.5rem',
        }}>
          Problemas para acessar?{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#f97316',
              textDecoration: 'none',
            }}
          >
            Fale com a nossa equipe
          </a>
        </p>
      </div>
    </div>
  )
}
