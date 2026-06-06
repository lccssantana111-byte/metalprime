'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
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
    <div className="min-h-screen bg-carbon flex items-center justify-center px-4 relative overflow-hidden">

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,134,10,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,134,10,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-brand/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-brand/20" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border border-amber-brand/30 rotate-45" />
              <div className="absolute inset-0 border border-amber-brand/10 rotate-45 scale-[1.3]" />
              <div className="absolute inset-2.5 bg-amber-brand rotate-45" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">
            {BRAND_NAME.split(' ')[0]}
            <span className="text-amber-brand">.</span>
          </h1>
          <p className="text-metal-dark text-xs uppercase tracking-[0.2em] mt-1">Área Administrativa</p>
        </div>

        {/* Card */}
        <div className="bg-graphite border border-metal-dark/40 rounded-2xl overflow-hidden">
          {/* Top stripe */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-brand/40 to-transparent" />

          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-amber-brand" />
              </div>
              <p className="text-sm text-metal-light font-medium">Acesso restrito</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-metal-light text-xs uppercase tracking-wider">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-carbon/60 border-metal-dark/50 focus:border-amber-brand/60 text-white h-11 placeholder:text-metal-dark"
                  placeholder="admin@metalprime.com.br"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-metal-light text-xs uppercase tracking-wider">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="bg-carbon/60 border-metal-dark/50 focus:border-amber-brand/60 text-white h-11"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-bold h-11 text-sm tracking-wide transition-all duration-200"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar no painel'}
              </Button>
            </form>
          </div>

          {/* Bottom stripe */}
          <div className="h-px bg-gradient-to-r from-transparent via-metal-dark/40 to-transparent" />
        </div>

        <p className="text-center text-xs text-metal-dark mt-6">
          {BRAND_NAME} · Sistema interno
        </p>
      </div>
    </div>
  )
}
