import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { contactSchema } from '@/lib/validators/contact'
import { rateLimit, getRateLimitKey } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  const { allowed } = await rateLimit(getRateLimitKey(request), 10, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json({ error: 'Muitas tentativas. Aguarde alguns minutos.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 422 })
  }

  const { name, phone, email, service, message } = result.data
  const cleanPhone = phone.replace(/\D/g, '')

  try {
    const supabase = createAdminClient()

    // Deduplication: if an active lead with this phone exists, just log a note
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('phone', cleanPhone)
      .not('status', 'in', '("perdido","sem_interesse")')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existing) {
      await supabase.from('lead_interactions').insert({
        lead_id: existing.id,
        type: 'note',
        content: `Nova mensagem via formulário de contato: ${message}`,
        metadata: { source: 'contact_form' },
      })
      return NextResponse.json({ ok: true, lead_id: existing.id })
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        phone: cleanPhone,
        email: email || null,
        service: service || null,
        source: 'website',
        message,
        status: 'novo',
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ ok: true, lead_id: data.id })
  } catch (err) {
    console.error('[api/contact] insert error:', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
