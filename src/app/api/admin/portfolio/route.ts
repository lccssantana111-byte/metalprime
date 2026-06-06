import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const auth = await requireAuth(['admin'])
  if (isAuthError(auth)) return auth

  const body = await request.json()
  const { title, slug, service, cover_image, images, ...rest } = body

  if (!title || !slug || !service || !cover_image) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('portfolio_items')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Slug já em uso.' }, { status: 409 })
  }

  const { data, error } = await supabase
    .from('portfolio_items')
    .insert({ title, slug, service, cover_image, images: images ?? [cover_image], ...rest })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
