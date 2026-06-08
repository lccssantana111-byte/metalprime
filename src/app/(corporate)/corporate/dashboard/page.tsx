import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatBRL, formatDate } from '@/lib/utils'
import { PROJECT_STATUS_LABELS, SERVICE_LABELS } from '@/lib/constants'
import type { Project } from '@/types'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, FolderOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, string> = {
  planejamento: 'border-blue-500/30 text-blue-300',
  medicao: 'border-indigo-500/30 text-indigo-300',
  producao: 'border-yellow-500/30 text-yellow-300',
  instalacao: 'border-orange-500/30 text-orange-300',
  concluido: 'border-green-500/30 text-green-300',
  pausado: 'border-gray-500/30 text-gray-300',
  cancelado: 'border-red-500/30 text-red-300',
}

export default async function CorporateDashboardPage() {
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/corporate/login')

  const supabase = createAdminClient()
  const { data: clientData } = await supabase
    .from('clients')
    .select('id, name, type')
    .eq('portal_user_id', user.id)
    .single()

  if (!clientData) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="w-12 h-12 text-metal-dark mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Conta não associada</h2>
        <p className="text-metal text-sm max-w-sm mx-auto">
          Seu acesso ainda não foi vinculado a uma conta de cliente. Entre em contato com nossa equipe.
        </p>
      </div>
    )
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*, milestones:project_milestones(*)')
    .eq('client_id', clientData.id)
    .order('created_at', { ascending: false })

  const list = (projects ?? []) as Project[]
  const active = list.filter((p) => !['concluido', 'cancelado'].includes(p.status))
  const concluded = list.filter((p) => p.status === 'concluido')

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Olá, {clientData.name}</h1>
        <p className="text-metal mt-1">
          {active.length} projeto{active.length !== 1 ? 's' : ''} em andamento · {concluded.length} concluído{concluded.length !== 1 ? 's' : ''}
        </p>
      </div>

      {active.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Em andamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      {concluded.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Concluídos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concluded.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      {list.length === 0 && (
        <div className="text-center py-20 bg-graphite border border-metal-dark/30 rounded-xl">
          <FolderOpen className="w-12 h-12 text-metal-dark mx-auto mb-4" />
          <p className="text-metal">Nenhum projeto encontrado.</p>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const done = p.milestones?.filter((m) => m.completed_at).length ?? 0
  const total = p.milestones?.length ?? 0
  const progress = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <Link
      href={`/corporate/projetos/${p.id}`}
      className="group bg-graphite border border-metal-dark/30 rounded-xl p-5 hover:border-amber-brand/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-medium text-foreground group-hover:text-amber-brand transition-colors">{p.name}</p>
          <p className="text-xs text-metal mt-0.5">{SERVICE_LABELS[p.service]}</p>
        </div>
        <Badge variant="outline" className={`text-xs border shrink-0 ${STATUS_COLORS[p.status] ?? ''}`}>
          {PROJECT_STATUS_LABELS[p.status]}
        </Badge>
      </div>

      {total > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-metal-dark mb-1.5">
            <span>Progresso</span>
            <span>{done}/{total} marcos</span>
          </div>
          <div className="h-1.5 bg-steel rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-brand rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-metal-dark">
          {p.estimated_end ? `Previsão: ${formatDate(p.estimated_end)}` : 'Prazo a definir'}
        </span>
        <ArrowRight className="w-4 h-4 text-metal-dark group-hover:text-amber-brand transition-colors" />
      </div>
    </Link>
  )
}
