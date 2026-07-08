import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

export async function GET() {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  const supabase = createAdminClient()
  const { data } = await supabase.from('site_settings').select('key, value')
  const settings = Object.fromEntries((data ?? []).map((r: { key: string; value: string }) => [r.key, r.value]))
  return NextResponse.json(settings)
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(['admin'])
  if (isAuthError(auth)) return auth

  const { settings } = await request.json() as { settings: { key: string; value: string }[] }
  if (!Array.isArray(settings)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('site_settings')
    .upsert(settings, { onConflict: 'key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidateTag('site-settings', 'default')
  return NextResponse.json({ ok: true })
}
