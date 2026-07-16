import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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

  const {
    data: { user },
  } = await supabase.auth.getUser()

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
  matcher: ['/admin/:path*', '/corporate/:path*'],
}
