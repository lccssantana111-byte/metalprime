import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

const milestoneSchema = z.object({
  title: z.string().min(1).max(200),
  due_date: z.string().optional(),
  completed_at: z.string().optional(),
})

const patchProjectSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  service: z.enum(['portoes', 'grades_e_cercas', 'escadas', 'corrimoes', 'estruturas_metalicas', 'sob_medida']).optional(),
  status: z.enum(['planejamento', 'medicao', 'producao', 'instalacao', 'concluido', 'pausado', 'cancelado']).optional(),
  description: z.string().max(5000).nullable().optional(),
  start_date: z.string().nullable().optional(),
  estimated_end: z.string().nullable().optional(),
  contract_value: z.number().positive().optional(),
  amount_paid: z.number().min(0).optional(),
  client_id: z.string().uuid().nullable().optional(),
  quote_id: z.string().uuid().nullable().optional(),
  notes: z.string().max(5000).optional(),
  milestones: z.array(milestoneSchema).max(50).optional(),
}).strict()

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*, client:clients!client_id(id, name, phone, type), milestones:project_milestones(*)')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const raw = await request.json()
  const parsed = patchProjectSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.', details: parsed.error.flatten() }, { status: 400 })
  }

  const { milestones, ...projectData } = parsed.data

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })

  if (milestones && Array.isArray(milestones)) {
    await supabase.from('project_milestones').delete().eq('project_id', id)
    if (milestones.length > 0) {
      await supabase.from('project_milestones').insert(
        milestones.map((m) => ({
          project_id: id,
          title: m.title,
          due_date: m.due_date ?? null,
          completed_at: m.completed_at ?? null,
        }))
      )
    }
  }

  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth(['admin'])
  if (isAuthError(auth)) return auth

  const { id } = await params
  const supabase = createAdminClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
