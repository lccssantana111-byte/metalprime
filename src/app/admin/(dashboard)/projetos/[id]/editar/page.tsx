import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProjectForm } from '@/components/admin/projects/ProjectForm'
import type { Project } from '@/types'

export const dynamic = 'force-dynamic'

export default async function EditarProjetoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()

  const [{ data: project }, { data: clients }] = await Promise.all([
    supabase
      .from('projects')
      .select('*, client:clients!client_id(id, name, phone, type), milestones:project_milestones(*)')
      .eq('id', id)
      .single(),
    supabase.from('clients').select('id, name').order('name', { ascending: true }),
  ])

  if (!project) notFound()

  return (
    <div>
      <Link href={`/admin/projetos/${id}`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar ao projeto
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Editar Projeto</h1>
      <ProjectForm project={project as Project} clients={clients ?? []} />
    </div>
  )
}
