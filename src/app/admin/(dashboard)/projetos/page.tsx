import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { formatBRL, formatDate } from '@/lib/utils'
import { SERVICE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/constants'
import type { Project } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, string> = {
  planejamento: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  medicao: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  producao: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  instalacao: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  concluido: 'bg-green-500/20 text-green-300 border-green-500/30',
  pausado: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  cancelado: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default async function AdminProjetosPage() {
  const supabase = createAdminClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*, client:clients!client_id(id, name, type)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Projetos</h1>
          <p className="text-metal mt-1">{(projects ?? []).length} projetos</p>
        </div>
        <Button asChild className="bg-amber-brand hover:bg-amber-light text-carbon font-semibold">
          <Link href="/admin/projetos/novo">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Link>
        </Button>
      </div>

      <div className="bg-graphite border border-metal-dark/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-metal-dark/30">
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Projeto</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden md:table-cell">Cliente</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Status</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Valor</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Prazo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-metal-dark/20">
              {(projects ?? []).map((project: Project) => (
                <tr key={project.id} className="hover:bg-steel/20 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/projetos/${project.id}`} className="block">
                      <p className="text-sm font-medium text-foreground hover:text-amber-brand transition-colors">
                        {project.name}
                      </p>
                      <p className="text-xs text-metal mt-0.5">{SERVICE_LABELS[project.service]}</p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-metal">{project.client?.name ?? '—'}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={`text-xs border ${STATUS_COLORS[project.status] ?? ''}`}
                    >
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-metal">{formatBRL(project.contract_value)}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-metal-dark">
                      {project.estimated_end ? formatDate(project.estimated_end) : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(projects ?? []).length === 0 && (
          <div className="text-center py-16">
            <p className="text-metal">Nenhum projeto cadastrado.</p>
            <Button asChild size="sm" className="mt-4 bg-amber-brand hover:bg-amber-light text-carbon">
              <Link href="/admin/projetos/novo">Criar primeiro projeto</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
