import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'
import { SITE_URL } from '@/lib/constants'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const admin = createAdminClient()

  const { data: client, error: clientError } = await admin
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (clientError || !client) {
    return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 })
  }

  const email = (body.email as string | undefined)?.trim() || client.email
  if (!email) {
    return NextResponse.json({ error: 'Informe um e-mail para convidar este cliente.' }, { status: 400 })
  }

  const redirectTo = `${SITE_URL}/api/auth/callback?next=/corporate/dashboard`

  let userId: string | null = null
  let emailSent = false

  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo })

  if (invited?.user) {
    userId = invited.user.id
    emailSent = true
  } else if (inviteError) {
    // User already exists in auth — look them up instead of failing.
    const { data: list, error: listError } = await admin.auth.admin.listUsers()
    const existing = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (!existing) {
      return NextResponse.json({ error: listError?.message ?? inviteError.message }, { status: 500 })
    }
    if (!existing.email_confirmed_at) {
      // Convite anterior nunca foi aceito — apaga o usuário "fantasma" e reconvida
      // pra disparar um e-mail novo (inviteUserByEmail não reenvia pra quem já existe).
      await admin.auth.admin.deleteUser(existing.id)
      const { data: reinvited, error: reinviteError } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo })
      if (!reinvited?.user) {
        return NextResponse.json({ error: reinviteError?.message ?? 'Não foi possível reenviar o convite.' }, { status: 500 })
      }
      userId = reinvited.user.id
      emailSent = true
    } else {
      // Já confirmado/ativo — só vincula, sem novo e-mail (o cliente já tem acesso).
      userId = existing.id
      emailSent = false
    }
  }

  if (!userId) {
    return NextResponse.json({ error: 'Não foi possível criar o acesso ao portal.' }, { status: 500 })
  }

  const { data: updated, error: updateError } = await admin
    .from('clients')
    .update({ email, portal_user_id: userId, portal_enabled: true })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ client: updated, emailSent }, { status: 200 })
}
