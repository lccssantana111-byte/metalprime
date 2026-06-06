import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import type { UserRole } from '@/types'

interface AuthResult {
  userId: string
  role: UserRole
}

/**
 * Verifies the request has a valid session AND the user has one of the
 * required roles. Returns { userId, role } on success, or a 401/403
 * NextResponse that the route handler should return immediately.
 */
export async function requireAuth(
  allowedRoles: UserRole[] = ['admin', 'comercial', 'viewer'],
): Promise<AuthResult | NextResponse> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
  }

  // Fetch role from user_profiles (uses admin client to bypass RLS)
  const admin = createAdminClient()
  const { data: profile } = await admin
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  const role: UserRole = (profile?.role as UserRole) ?? 'viewer'

  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: 'Sem permissão.' }, { status: 403 })
  }

  return { userId: user.id, role }
}

export function isAuthError(v: unknown): v is NextResponse {
  return v instanceof NextResponse
}
