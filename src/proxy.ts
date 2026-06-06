import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPath = pathname.startsWith('/admin')
  const isAdminLogin = pathname === '/admin/login'
  const isCorporatePath = pathname.startsWith('/corporate')
  const isCorporateLogin = pathname === '/corporate/login'

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if ((isAdminPath && !isAdminLogin) || (isCorporatePath && !isCorporateLogin)) {
      const url = request.nextUrl.clone()
      url.pathname = isAdminPath ? '/admin/login' : '/corporate/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
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

  if (isAdminPath && !isAdminLogin && !user) {
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
