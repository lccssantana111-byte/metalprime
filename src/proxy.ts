import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Único e-mail que sempre atravessa o bloqueio do site (ver site_settings.site_locked).
// Mantido fixo em código (não em env) para nunca ficar trancado fora por engano.
const SITE_LOCK_BYPASS_EMAIL = 'lccs.santana111@gmail.com'

const SITE_LOCK_EXEMPT_PATHS = [
  '/suspenso',
  '/admin/login',
  '/admin/reset-password',
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPath = pathname.startsWith('/admin')
  const isAdminLogin = pathname === '/admin/login'
  const isAdminResetPassword = pathname === '/admin/reset-password'
  const isCorporatePath = pathname.startsWith('/corporate')
  const isCorporateLogin = pathname === '/corporate/login'

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request })
  }

  const forwardHeaders = new Headers(request.headers)
  forwardHeaders.set('x-pathname', pathname)
  let supabaseResponse = NextResponse.next({
    request: { headers: forwardHeaders },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: { headers: forwardHeaders },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  let user: Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'] = null

  if (!SITE_LOCK_EXEMPT_PATHS.includes(pathname)) {
    const { data: lockSetting } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'site_locked')
      .single()

    if (lockSetting?.value === true) {
      user = (await supabase.auth.getUser()).data.user

      if (user?.email !== SITE_LOCK_BYPASS_EMAIL) {
        const url = request.nextUrl.clone()
        url.pathname = '/suspenso'
        return NextResponse.rewrite(url)
      }
    }
  }

  if ((isAdminPath || isCorporatePath) && !user) {
    user = (await supabase.auth.getUser()).data.user
  }

  if (isAdminPath && !isAdminLogin && !isAdminResetPassword && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  if (isAdminLogin && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  if (isCorporatePath && !isCorporateLogin && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/corporate/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (isCorporateLogin && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/corporate/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png|robots.txt|sitemap.xml).*)'],
}
