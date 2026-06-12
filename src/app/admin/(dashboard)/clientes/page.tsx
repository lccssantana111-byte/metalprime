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
          <h1 className="font-display text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-slate-500 mt-1">{count ?? 0} clientes</p>
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
                ? 'bg-[#f97316] text-white'
                : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {f.icon}
            {f.label}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Tipo</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Contato</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Cidade</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Portal</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/clientes/${client.id}`} className="block">
                      <p className="text-sm font-medium text-slate-800 hover:text-[#ea580c] transition-colors">
                        {client.name}
                      </p>
                      {client.document && (
                        <p className="text-xs text-slate-400 mt-0.5">{client.document}</p>
                      )}
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                      {TYPE_ICONS[client.type]}
                      {CLIENT_TYPE_LABELS[client.type]}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm text-slate-600">{client.phone}</p>
                    {client.email && <p className="text-xs text-slate-400 mt-0.5">{client.email}</p>}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-500">{client.city ? `${client.city} · ${client.state}` : '—'}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <Badge
                      variant="outline"
                      className={`text-xs border ${
                        client.portal_enabled
                          ? 'border-green-500/40 text-green-600 bg-green-50'
                          : 'border-slate-200 text-slate-400 bg-slate-50'
                      }`}
                    >
                      {client.portal_enabled ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-slate-400">{formatDate(client.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
