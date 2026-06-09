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
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#f8fafc' }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="w-full max-w-[360px] relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
            style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="#0f172a" strokeWidth="1.5" fill="none" />
              <path d="M14 7L21 11V17L14 21L7 17V11L14 7Z" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1" />
              <circle cx="14" cy="14" r="2.5" fill="#f97316" />
            </svg>
          </div>
          <h1 className="font-display text-[22px] font-black tracking-tight" style={{ color: '#0f172a' }}>
            {BRAND_NAME.split(' ')[0]}
            <span style={{ color: '#f97316' }}>.</span>
          </h1>
          <p className="text-[11px] font-mono tracking-[0.22em] uppercase mt-1" style={{ color: '#94a3b8' }}>
            Área Administrativa
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(15,23,42,0.07)' }}>

          {/* Top orange rule */}
          <div className="h-0.5 w-12 rounded-full mb-6" style={{ background: '#f97316' }} />

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2"
                style={{ color: '#94a3b8' }}
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
                className="h-11 font-mono text-[13px]"
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2"
                style={{ color: '#94a3b8' }}
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
                className="h-11 font-mono text-[13px]"
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                }}
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2.5 text-[13px] px-4 py-3 rounded-lg"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold text-[13px] tracking-widest uppercase h-11 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              style={{ background: '#0f172a', color: '#ffffff', letterSpacing: '0.12em' }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#1e293b' }}
              onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#0f172a' }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] font-mono mt-5" style={{ color: '#cbd5e1' }}>
          {BRAND_NAME} · Sistema interno
        </p>
      </div>
    </div>
  )
}
