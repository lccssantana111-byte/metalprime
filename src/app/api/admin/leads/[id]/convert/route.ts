import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

export async function POST(_: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const admin = createAdminClient()

  const { data: lead, error: leadError } = await admin
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (leadError || !lead) {
    return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 })
  }

  if (lead.client_id) {
    return NextResponse.json(
      { error: 'Este lead já foi convertido em cliente.', client_id: lead.client_id },
      { status: 409 },
    )
  }

  const { data: client, error: clientError } = await admin
    .from('clients')
    .insert({
      type: lead.client_type,
      name: lead.company ? `${lead.name} (${lead.company})` : lead.name,
      email: lead.email,
      phone: lead.phone,
      city: lead.city,
      notes: lead.notes,
    })
    .select()
    .single()

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 500 })
  }

  const { error: updateError } = await admin
    .from('leads')
    .update({ client_id: client.id, converted_at: new Date().toISOString() })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  await admin.from('lead_interactions').insert({
    lead_id: id,
    author_id: auth.userId,
    type: 'note',
    content: `Lead convertido em cliente (${client.name}).`,
  })

  return NextResponse.json({ client }, { status: 201 })
}
