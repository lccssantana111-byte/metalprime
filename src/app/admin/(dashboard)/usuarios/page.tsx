import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UsuariosClient } from './UsuariosClient'

export const dynamic = 'force-dynamic'

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
    return { ...p, email: authUser?.email ?? '—', last_sign_in: authUser?.last_sign_in_at ?? null }
  })

  return <UsuariosClient users={users} currentUserId={user.id} />
}
