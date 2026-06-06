'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

export default function CorporateLoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/corporate/dashboard`,
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
    <div className="min-h-screen bg-carbon flex items-center justify-center p-4 relative overflow-hidden">

      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(200,134,10,0.8) 0px,
            rgba(200,134,10,0.8) 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 flex flex-col gap-1.5">
        <div className="w-8 h-px bg-amber-brand/30" />
        <div className="w-px h-8 bg-amber-brand/30" />
      </div>
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1.5">
        <div className="w-px h-8 bg-amber-brand/30 self-end" />
        <div className="w-8 h-px bg-amber-brand/30" />
      </div>

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-amber-brand/4 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 border border-amber-brand/20 rotate-45" />
              <div className="w-4 h-4 bg-amber-brand" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>
            <span className="font-display font-bold text-white text-lg">
              {BRAND_NAME.split(' ')[0]}
              <span className="text-amber-brand">.</span>
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Portal Corporativo</h1>
          <p className="text-metal text-sm mt-2">Acesso exclusivo para clientes</p>
        </div>

        {/* Card */}
        <div className="bg-graphite border border-metal-dark/40 rounded-2xl overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-brand/40 to-transparent" />

          <div className="p-8">
            {!sent ? (
              <>
                <h2 className="text-lg font-semibold text-white mb-1">Entrar com e-mail</h2>
                <p className="text-metal text-sm mb-6 leading-relaxed">
                  Insira seu e-mail cadastrado e enviaremos um link de acesso direto — sem senha.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-metal-light text-xs uppercase tracking-wider">
                      E-mail corporativo
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@empresa.com.br"
                      required
                      autoComplete="email"
                      className="bg-carbon/60 border-metal-dark/50 focus:border-amber-brand/60 text-white h-11 placeholder:text-metal-dark"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-bold h-11 text-sm tracking-wide group"
                  >
                    {loading ? (
                      'Enviando...'
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Receber link de acesso
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">Link enviado!</h2>
                <p className="text-metal text-sm leading-relaxed">
                  Verifique sua caixa de entrada em{' '}
                  <span className="text-white font-medium">{email}</span>{' '}
                  e clique no link para acessar o portal.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-amber-brand hover:text-amber-light mt-5 underline underline-offset-4"
                >
                  Usar outro e-mail
                </button>
              </div>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-metal-dark/40 to-transparent" />
        </div>

        <p className="text-center text-xs text-metal-dark mt-6">
          Problemas para acessar?{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-brand hover:text-amber-light transition-colors"
          >
            Fale com a nossa equipe
          </a>
        </p>
      </div>
    </div>
  )
}
