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
    // Return HTML that redirects client-side so the browser processes
    // Set-Cookie headers before the next navigation hits the proxy.
    const safeNext = next.startsWith('/') ? next : '/corporate/dashboard'
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${safeNext}"></head><body></body></html>`
    const response = new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
    cookiesToForward.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2])
    })
    return response
  }

  return NextResponse.redirect(`${origin}/corporate/login?error=auth`)
}
