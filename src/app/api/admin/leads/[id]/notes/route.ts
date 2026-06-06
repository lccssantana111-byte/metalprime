import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const body = await request.json()

  if (!body.content) {
    return NextResponse.json({ error: 'Conteúdo obrigatório.' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('lead_interactions')
    .insert({
      lead_id: id,
      author_id: auth.userId,
      type: body.type ?? 'note',
      content: body.content,
      metadata: body.metadata ?? {},
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ interaction: data }, { status: 201 })
}
