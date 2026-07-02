'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase sets the session from the URL hash on page load
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (updateError) {
      setError('Erro ao redefinir a senha. O link pode ter expirado.')
      return
    }
    setDone(true)
    setTimeout(() => router.push('/admin'), 2500)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#f8fafc' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="w-full max-w-[360px] relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src="/logo.png"
              alt="Metal Shark logo"
              width={56}
              height={56}
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </div>
          <h1 className="font-display text-[22px] font-black tracking-tight" style={{ color: '#0f172a' }}>
            {BRAND_NAME.split(' ')[0]}
            <span style={{ color: '#f97316' }}>.</span>
          </h1>
          <p className="text-[11px] font-mono tracking-[0.22em] uppercase mt-1" style={{ color: '#94a3b8' }}>
            Redefinir Senha
          </p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(15,23,42,0.07)' }}>
          <div className="h-0.5 w-12 rounded-full mb-6" style={{ background: '#f97316' }} />

          {done ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
              </div>
              <p className="text-[14px] font-semibold" style={{ color: '#0f172a' }}>Senha atualizada!</p>
              <p className="text-[13px]" style={{ color: '#64748b' }}>Redirecionando para o painel...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2"
                  style={{ color: '#94a3b8' }}
                >
                  Nova senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Mínimo 6 caracteres"
                  className="h-11 font-mono text-[13px]"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm"
                  className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2"
                  style={{ color: '#94a3b8' }}
                >
                  Confirmar senha
                </label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repita a senha"
                  className="h-11 font-mono text-[13px]"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
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
                disabled={loading || !ready}
                className="w-full font-bold text-[13px] tracking-widest uppercase h-11 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                style={{ background: '#0f172a', color: '#ffffff', letterSpacing: '0.12em' }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#1e293b' }}
                onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#0f172a' }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar nova senha'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[11px] font-mono mt-5" style={{ color: '#cbd5e1' }}>
          {BRAND_NAME} · Sistema interno
        </p>
      </div>
    </div>
  )
}
