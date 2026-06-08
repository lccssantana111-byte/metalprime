import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProjectForm } from '@/components/admin/projects/ProjectForm'

export const dynamic = 'force-dynamic'

export default async function NovoProjetoPage() {
  const supabase = createAdminClient()
  const { data: clients } = await supabase
    .from('clients')
    .select('id, name')
    .order('name', { ascending: true })

  return (
    <div>
      <Link href="/admin/projetos" className="inline-flex items-center gap-2 text-sm text-metal hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar aos projetos
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Novo Projeto</h1>
      <ProjectForm clients={clients ?? []} />
    </div>
  )
}
