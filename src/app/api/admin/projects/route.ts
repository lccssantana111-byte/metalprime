import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, isAuthError } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const auth = await requireAuth(['admin', 'comercial', 'viewer'])
  if (isAuthError(auth)) return auth

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const clientId = searchParams.get('client_id')

  const supabase = createAdminClient()
  let query = supabase
    .from('projects')
    .select('*, client:clients!client_id(id, name)')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)
  if (clientId) query = query.eq('client_id', clientId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(['admin', 'comercial'])
  if (isAuthError(auth)) return auth

  const body = await request.json()
  const { milestones, ...projectData } = body

  const supabase = createAdminClient()
  const { data: project, error } = await supabase
    .from('projects')
    .insert(projectData)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (milestones && Array.isArray(milestones) && milestones.length > 0) {
    await supabase.from('project_milestones').insert(
      milestones.map((m: { title: string; due_date?: string }) => ({
        project_id: project.id,
        title: m.title,
        due_date: m.due_date ?? null,
      }))
    )
  }

  return NextResponse.json(project, { status: 201 })
}
