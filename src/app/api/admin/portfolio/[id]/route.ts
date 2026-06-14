import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

const patchPortfolioSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens').optional(),
  service: z.enum(['portoes', 'grades_e_cercas', 'escadas', 'corrimoes', 'estruturas_metalicas', 'sob_medida']).optional(),
  cover_image: z.string().url().optional(),
  images: z.array(z.string().url()).max(20).optional(),
  short_desc: z.string().max(500).optional(),
  description: z.string().max(5000).optional(),
  city: z.string().max(100).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  seo_title: z.string().max(200).optional(),
  seo_description: z.string().max(500).optional(),
}).strict()

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('portfolio_items').select('*').eq('id', id).single()
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const raw = await request.json()
  const parsed = patchPortfolioSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.', details: parsed.error.flatten() }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('portfolio_items')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
