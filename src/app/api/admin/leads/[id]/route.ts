import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const admin = createAdminClient()

  const [{ data: lead }, { data: interactions }] = await Promise.all([
    admin
      .from('leads')
      .select('*, assigned_user:user_profiles!assigned_to(id, full_name)')
      .eq('id', id)
      .single(),
    admin
      .from('lead_interactions')
      .select('*, author:user_profiles!author_id(id, full_name, avatar_url)')
      .eq('lead_id', id)
      .order('created_at', { ascending: true }),
  ])

  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ lead, interactions })
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const body = await request.json()
  const admin = createAdminClient()

  if (body.status) {
    const { data: current } = await admin
      .from('leads')
      .select('status')
      .eq('id', id)
      .single()

    if (current && current.status !== body.status) {
      await admin.from('lead_interactions').insert({
        lead_id: id,
        author_id: auth.userId,
        type: 'status_change',
        content: `Status alterado de "${current.status}" para "${body.status}"`,
        metadata: { old_status: current.status, new_status: body.status },
      })
    }
  }

  const { data, error } = await admin
    .from('leads')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lead: data })
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const admin = createAdminClient()
  const { error } = await admin.from('leads').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
