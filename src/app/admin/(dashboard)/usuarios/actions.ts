'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function convidarUsuario(formData: FormData) {
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) return { error: 'Não autenticado.' }

  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'Sem permissão.' }

  const nome = (formData.get('nome') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const role = formData.get('role') as string

  if (!nome || !email || !role) return { error: 'Preencha todos os campos.' }
  if (!['admin', 'comercial', 'viewer'].includes(role)) return { error: 'Perfil inválido.' }

  // inviteUserByEmail creates the user AND sends an email with a link to set password
  const { data: newUser, error: createError } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { full_name: nome },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`,
  })

  if (createError) {
    if (createError.message.includes('already been registered')) {
      return { error: 'Este e-mail já está cadastrado.' }
    }
    return { error: createError.message }
  }

  await supabase
    .from('user_profiles')
    .update({ role, full_name: nome })
    .eq('id', newUser.user.id)

  revalidatePath('/admin/usuarios')
  return { success: true }
}

export async function removerUsuario(userId: string) {
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) return { error: 'Não autenticado.' }
  if (user.id === userId) return { error: 'Você não pode remover sua própria conta.' }

  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'Sem permissão.' }

  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) return { error: error.message }

  revalidatePath('/admin/usuarios')
  return { success: true }
}
