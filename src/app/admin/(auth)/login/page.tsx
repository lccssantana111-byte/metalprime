'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#060809' }}
    >
      {/* Architectural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Amber glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,134,10,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Corner marks */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="w-8 h-8 relative">
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'rgba(200,134,10,0.35)' }} />
          <div className="absolute top-0 left-0 w-px h-full" style={{ background: 'rgba(200,134,10,0.35)' }} />
        </div>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <div className="w-8 h-8 relative">
          <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: 'rgba(200,134,10,0.35)' }} />
          <div className="absolute bottom-0 right-0 w-px h-full" style={{ background: 'rgba(200,134,10,0.35)' }} />
        </div>
      </div>

      <div className="w-full max-w-[380px] relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-5">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-amber-brand rotate-45" />
              <div className="absolute inset-[3px] rotate-45" style={{ background: '#060809' }} />
              <div className="absolute inset-[6px] bg-amber-brand rotate-45" />
            </div>
          </div>
          <h1 className="font-display text-[22px] font-black text-foreground tracking-tight">
            {BRAND_NAME.split(' ')[0]}
            <span className="text-amber-brand">.</span>
          </h1>
          <p
            className="text-[10px] font-mono tracking-[0.25em] uppercase mt-1"
            style={{ color: 'rgba(0,0,0,0.20)' }}
          >
            Área Administrativa
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Top accent */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,134,10,0.5), transparent)' }}
          />

          <div className="p-7">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2"
                  style={{ color: 'rgba(0,0,0,0.35)' }}
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@metalprime.com.br"
                  className="h-11 text-foreground placeholder:text-foreground/20 font-mono text-[13px]"
                  style={{
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.09)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2"
                  style={{ color: 'rgba(0,0,0,0.35)' }}
                >
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 text-foreground font-mono text-[13px]"
                  style={{
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.09)',
                  }}
                />
              </div>

              {error && (
                <div
                  className="flex items-center gap-2.5 text-[13px] px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#fca5a5',
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full font-bold text-[13px] tracking-widest uppercase h-11 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                style={{
                  background: loading ? 'rgba(200,134,10,0.7)' : '#c8860a',
                  color: '#060809',
                  letterSpacing: '0.12em',
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLElement).style.background = '#e8a020'
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLElement).style.background = '#c8860a'
                }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
              </button>
            </form>
          </div>

          {/* Bottom accent */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.07), transparent)' }}
          />
        </div>

        <p
          className="text-center text-[11px] font-mono mt-6"
          style={{ color: 'rgba(0,0,0,0.10)' }}
        >
          {BRAND_NAME} · Sistema interno
        </p>
      </div>
    </div>
  )
}
