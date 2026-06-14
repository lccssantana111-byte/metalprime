import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

const patchQuoteSchema = z.object({
  status: z.enum(['pendente', 'em_analise', 'proposta_enviada', 'aprovado', 'recusado', 'expirado']).optional(),
  estimated_value: z.number().positive().optional(),
  final_value: z.number().positive().optional(),
  notes: z.string().max(5000).optional(),
  valid_until: z.string().optional(),
}).strict()

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const raw = await request.json()
  const parsed = patchQuoteSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.', details: parsed.error.flatten() }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('quotes')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  return NextResponse.json(data)
}
