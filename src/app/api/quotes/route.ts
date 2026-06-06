import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { quoteSchema } from '@/lib/validators/quote'
import { rateLimit, getRateLimitKey } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  const { allowed } = await rateLimit(getRateLimitKey(request), 5, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json({ error: 'Muitas tentativas. Aguarde alguns minutos.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const result = quoteSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos.', details: result.error.flatten() }, { status: 422 })
  }

  const {
    services,
    specs,
    description,
    reference_image_paths,
    name,
    phone,
    email,
    cep,
    address,
    city,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
  } = result.data

  const primaryService = services[0]
  const cleanPhone = phone.replace(/\D/g, '')

  try {
    const supabase = createAdminClient()

    // Deduplication: check if a lead with this phone already exists
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('phone', cleanPhone)
      .not('status', 'in', '("perdido","sem_interesse")')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existing) {
      // Update UTM on existing lead and create a new quote linked to it
      await supabase
        .from('leads')
        .update({
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
          service: primaryService,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          lead_id: existing.id,
          name,
          phone: cleanPhone,
          email: email || null,
          service: primaryService,
          description: description || null,
          specs: {
            services,
            ...(typeof specs === 'object' && specs !== null ? specs : {}),
          },
          address: `${address}, ${city} — CEP ${cep}`,
          city,
          reference_images: reference_image_paths ?? [],
          status: 'pendente',
        })
        .select('id')
        .single()

      if (quoteError) throw quoteError

      return NextResponse.json({ ok: true, lead_id: existing.id, quote_id: quote.id })
    }

    // New lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        phone: cleanPhone,
        email: email || null,
        service: primaryService,
        source: 'website',
        message: description || null,
        status: 'novo',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
      })
      .select('id')
      .single()

    if (leadError) throw leadError

    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        lead_id: lead.id,
        name,
        phone: cleanPhone,
        email: email || null,
        service: primaryService,
        description: description || null,
        specs: {
          services,
          ...(typeof specs === 'object' && specs !== null ? specs : {}),
        },
        address: `${address}, ${city} — CEP ${cep}`,
        city,
        reference_images: reference_image_paths ?? [],
        status: 'pendente',
      })
      .select('id')
      .single()

    if (quoteError) throw quoteError

    return NextResponse.json({ ok: true, lead_id: lead.id, quote_id: quote.id })
  } catch (err) {
    console.error('[api/quotes] insert error:', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
