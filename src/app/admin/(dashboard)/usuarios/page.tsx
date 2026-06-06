import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { UserCog, ShieldCheck, Briefcase, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

const ROLE_CONFIG: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  admin: {
    label: 'Admin',
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    className: 'border-amber-brand/40 text-amber-brand',
  },
  comercial: {
    label: 'Comercial',
    icon: <Briefcase className="w-3.5 h-3.5" />,
    className: 'border-blue-500/30 text-blue-300',
  },
  viewer: {
    label: 'Visualizador',
    icon: <Eye className="w-3.5 h-3.5" />,
    className: 'border-metal-dark/40 text-metal-dark',
  },
}

export default async function AdminUsuariosPage() {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) redirect('/admin/login')

  const supabase = createAdminClient()

  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('id, full_name, role, is_active, created_at')
    .order('created_at', { ascending: false })

  const { data: authUsers } = await supabase.auth.admin.listUsers()

  const users = (profiles ?? []).map((p) => {
    const authUser = authUsers?.users?.find((u) => u.id === p.id)
    return { ...p, email: authUser?.email ?? '—', last_sign_in: authUser?.last_sign_in_at }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Usuários</h1>
          <p className="text-metal mt-1">{users.length} usuário{users.length !== 1 ? 's' : ''} com acesso ao painel</p>
        </div>
      </div>

      <div className="bg-graphite border border-metal-dark/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-metal-dark/30">
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Nome</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden md:table-cell">E-mail</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase">Perfil</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Último acesso</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-metal-dark uppercase hidden lg:table-cell">Desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-metal-dark/20">
              {users.map((u) => {
                const role = ROLE_CONFIG[u.role] ?? ROLE_CONFIG.viewer
                return (
                  <tr key={u.id} className="hover:bg-steel/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-steel flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-metal-light uppercase">
                            {(u.full_name ?? u.email)[0]}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-white">{u.full_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm text-metal">{u.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="outline" className={`text-xs border inline-flex items-center gap-1 ${role.className}`}>
                        {role.icon}
                        {role.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <Badge
                        variant="outline"
                        className={`text-xs border ${
                          u.is_active
                            ? 'border-green-500/30 text-green-400'
                            : 'border-metal-dark/40 text-metal-dark'
                        }`}
                      >
                        {u.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-metal-dark">
                        {u.last_sign_in ? formatDate(u.last_sign_in) : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-metal-dark">{formatDate(u.created_at)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="text-center py-16">
            <UserCog className="w-10 h-10 text-metal-dark mx-auto mb-3" />
            <p className="text-metal">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
