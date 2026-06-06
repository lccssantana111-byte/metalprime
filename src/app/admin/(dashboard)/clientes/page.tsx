import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { CLIENT_TYPE_LABELS } from '@/lib/constants'
import type { Client } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Building2, User, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  pessoa_fisica: <User className="w-3.5 h-3.5" />,
  condominio: <Building2 className="w-3.5 h-3.5" />,
  construtora: <Building2 className="w-3.5 h-3.5" />,
  empresa: <Building2 className="w-3.5 h-3.5" />,
}

export default async function AdminClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>
}) {
  const params = await searchParams
  const supabase = createAdminClient()

  let query = supabase
    .from('clients')
    .select('*', { count: 'exact' })
    .order('name', { ascending: true })

  if (params.type) query = query.eq('type', params.type)
  if (params.q) query = query.ilike('name', `%${params.q}%`)

  const { data: clients, count } = await query
  const list = (clients ?? []) as Client[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Clientes</h1>
          <p className="text-metal mt-1">{count ?? 0} clientes</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: '', label: 'Todos', icon: <Users className="w-3.5 h-3.5" /> },
          { value: 'pessoa_fisica', label: 'Pessoa Física', icon: <User className="w-3.5 h-3.5" /> },
          { value: 'condominio', label: 'Condomínio', icon: <Building2 className="w-3.5 h-3.5" /> },
          { value: 'construtora', label: 'Construtora', icon: <Building2 className="w-3.5 h-3.5" /> },
          { value: 'empresa', label: 'Empresa', icon: <Building2 className="w-3.5 h-3.5" /> },
        ].map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/admin/clientes?type=${f.value}` : '/admin/clientes'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (params.type ?? '') === f.value
                ? 'bg-amber-brand text-carbon'
                : 'bg-graphite border border-metal-dark/30 text-metal hover:text-white'
            }`}
          >
            {f.icon}
            {f.label}
          </Link>
        ))}
      </div>

      <div className="bg-graphite border border-metal-dark/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-metal-dark/30">
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Nome</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden md:table-cell">Tipo</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden md:table-cell">Contato</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Cidade</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Portal</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-metal-dark/20">
              {list.map((client) => (
                <tr key={client.id} className="hover:bg-steel/20 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/clientes/${client.id}`} className="block">
                      <p className="text-sm font-medium text-white hover:text-amber-brand transition-colors">
                        {client.name}
                      </p>
                      {client.document && (
                        <p className="text-xs text-metal-dark mt-0.5">{client.document}</p>
                      )}
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 text-sm text-metal">
                      {TYPE_ICONS[client.type]}
                      {CLIENT_TYPE_LABELS[client.type]}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm text-metal">{client.phone}</p>
                    {client.email && <p className="text-xs text-metal-dark mt-0.5">{client.email}</p>}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-metal">{client.city ? `${client.city} · ${client.state}` : '—'}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <Badge
                      variant="outline"
                      className={`text-xs border ${
                        client.portal_enabled
                          ? 'border-green-500/30 text-green-400'
                          : 'border-metal-dark/40 text-metal-dark'
                      }`}
                    >
                      {client.portal_enabled ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-metal-dark">{formatDate(client.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <div className="text-center py-16">
            <p className="text-metal">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
