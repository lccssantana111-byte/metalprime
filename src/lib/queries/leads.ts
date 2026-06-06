import { createAdminClient } from '@/lib/supabase/admin'
import type { Lead, LeadInteraction } from '@/types'

export async function getLeads(options?: { status?: string; service?: string; page?: number }) {
  const supabase = createAdminClient()
  const page = options?.page ?? 1
  const limit = 20
  const offset = (page - 1) * limit

  let query = supabase
    .from('leads')
    .select('*, assigned_user:user_profiles!assigned_to(id, full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (options?.status) query = query.eq('status', options.status)
  if (options?.service) query = query.eq('service', options.service)

  const { data, count, error } = await query
  if (error) throw error
  return { leads: (data ?? []) as Lead[], total: count ?? 0 }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('leads')
    .select('*, assigned_user:user_profiles!assigned_to(id, full_name)')
    .eq('id', id)
    .single()
  return data as Lead | null
}

export async function getLeadInteractions(leadId: string): Promise<LeadInteraction[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('lead_interactions')
    .select('*, author:user_profiles!author_id(id, full_name, avatar_url)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: true })
  return (data ?? []) as LeadInteraction[]
}
