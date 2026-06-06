import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

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
  const body = await request.json()
  const { milestones, ...projectData } = body

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (milestones && Array.isArray(milestones)) {
    await supabase.from('project_milestones').delete().eq('project_id', id)
    if (milestones.length > 0) {
      await supabase.from('project_milestones').insert(
        milestones.map((m: { title: string; due_date?: string; completed_at?: string }) => ({
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
