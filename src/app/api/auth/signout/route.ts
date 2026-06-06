import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const referer = request.headers.get('referer') ?? '/'
  const isAdmin = referer.includes('/admin')
  return NextResponse.redirect(
    new URL(isAdmin ? '/admin/login' : '/corporate/login', request.url)
  )
}
