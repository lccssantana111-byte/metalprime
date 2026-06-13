import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/corporate/dashboard'

  const cookieStore = await cookies()
  const cookiesToForward: { name: string; value: string; options: Record<string, unknown> }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (incoming) => {
          incoming.forEach(({ name, value, options }) => {
            cookiesToForward.push({ name, value, options })
          })
        },
      },
    }
  )

  let sessionEstablished = false

  console.log('[callback] code:', code, 'token_hash:', !!token_hash, 'type:', type, 'next:', next)

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('[callback] exchangeCode error:', error)
    if (!error) sessionEstablished = true
  }

  if (!sessionEstablished && token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'email' | 'recovery' | 'invite' | 'email_change',
    })
    console.log('[callback] verifyOtp error:', error, 'cookies to forward:', cookiesToForward.length)
    if (!error) sessionEstablished = true
  }

  console.log('[callback] sessionEstablished:', sessionEstablished)

  if (sessionEstablished) {
    const safeNext = next.startsWith('/') ? next : '/corporate/dashboard'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin
    const response = NextResponse.redirect(`${siteUrl}${safeNext}`)
    cookiesToForward.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2])
    })
    return response
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin
  return NextResponse.redirect(`${siteUrl}/corporate/login?error=auth`)
}
