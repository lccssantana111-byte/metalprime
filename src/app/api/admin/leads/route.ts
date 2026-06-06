import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  const { searchParams } = request.nextUrl
  const status = searchParams.get('status')
  const service = searchParams.get('service')
  const assigned = searchParams.get('assigned_to')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 20
  const offset = (page - 1) * limit

  const admin = createAdminClient()
  let query = admin
    .from('leads')
    .select('*, assigned_user:user_profiles!assigned_to(id, full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) query = query.eq('status', status)
  if (service) query = query.eq('service', service)
  if (assigned) query = assigned === 'none' ? query.is('assigned_to', null) : query.eq('assigned_to', assigned)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ leads: data, total: count })
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const body = await request.json()
  const { name, phone, email, company, city, service, client_type, notes, status, source } = body

  if (!name || !phone) {
    return NextResponse.json({ error: 'Nome e telefone são obrigatórios.' }, { status: 400 })
  }

  const cleanPhone = String(phone).replace(/\D/g, '')
  const admin = createAdminClient()

  // Deduplication
  const { data: existing } = await admin
    .from('leads')
    .select('id')
    .eq('phone', cleanPhone)
    .not('status', 'in', '("perdido","sem_interesse")')
    .limit(1)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'Já existe um lead ativo com este telefone.', lead_id: existing.id },
      { status: 409 },
    )
  }

  const { data, error } = await admin
    .from('leads')
    .insert({
      name,
      phone: cleanPhone,
      email: email || null,
      company: company || null,
      city: city || null,
      service: service || null,
      client_type: client_type ?? 'pessoa_fisica',
      notes: notes || null,
      status: status ?? 'novo',
      source: source ?? 'manual',
      message: null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lead: data }, { status: 201 })
}
