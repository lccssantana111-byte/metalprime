'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    async function run() {
      const supabase = createClient()
      const search = new URLSearchParams(window.location.search)
      const next = search.get('next') ?? '/corporate/dashboard'
      const safeNext = next.startsWith('/') ? next : '/corporate/dashboard'

      // Supabase's hosted /auth/v1/verify redirect appends tokens after `#`,
      // which never reaches a server route — has to be read client-side here.
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      const accessToken = hash.get('access_token')
      const refreshToken = hash.get('refresh_token')

      let sessionEstablished = false

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        sessionEstablished = !error
      }

      if (!sessionEstablished) {
        const code = search.get('code')
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          sessionEstablished = !error
        }
      }

      if (!sessionEstablished) {
        const tokenHash = search.get('token_hash')
        const type = search.get('type')
        if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as 'email' | 'recovery' | 'invite' | 'email_change',
          })
          sessionEstablished = !error
        }
      }

      router.replace(sessionEstablished ? safeNext : '/corporate/login?error=auth')
    }

    run()
  }, [router])

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0f1a',
      color: 'rgba(255,255,255,0.5)',
      fontSize: '14px',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>
      Entrando...
    </div>
  )
}
