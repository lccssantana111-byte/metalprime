import { createAdminClient } from '@/lib/supabase/admin'
import type { DashboardMetrics } from '@/types'

// Leads inactive for more than this many days trigger an alert
const STALE_LEAD_DAYS = 3

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = createAdminClient()
  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
  const startOfYear = new Date(today.getFullYear(), 0, 1).toISOString()
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const startOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString()
  const staleCutoff = new Date(today.getTime() - STALE_LEAD_DAYS * 24 * 60 * 60 * 1000).toISOString()

  const [
    { count: leadsToday },
    { count: leadsThisMonth },
    { count: leadsPrevMonth },
    { data: leadsByStatus },
    { data: leadsByService },
    { data: leads30d },
    { data: recentLeads },
    { count: openQuotes },
    { count: activeProjects },
    { data: revenueMonth },
    { data: revenueYear },
    { count: wonLeads },
    { count: staleLeads },
    { count: unassignedLeads },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', startOfDay),
    supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfPrevMonth)
      .lt('created_at', startOfMonth),
    supabase.from('leads').select('status').then(({ data }) => ({
      data: Object.entries(
        (data ?? []).reduce<Record<string, number>>((acc, l) => {
          acc[l.status] = (acc[l.status] ?? 0) + 1
          return acc
        }, {}),
      ).map(([status, count]) => ({ status, count })),
    })),
    supabase.from('leads').select('service').then(({ data }) => ({
      data: Object.entries(
        (data ?? []).reduce<Record<string, number>>((acc, l) => {
          if (l.service) acc[l.service] = (acc[l.service] ?? 0) + 1
          return acc
        }, {}),
      ).map(([service, count]) => ({ service, count })),
    })),
    supabase
      .from('leads')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo)
      .then(({ data }) => ({
        data: Array.from({ length: 30 }, (_, i) => {
          const d = new Date(today.getTime() - (29 - i) * 24 * 60 * 60 * 1000)
          const dateStr = d.toISOString().slice(0, 10)
          const count = (data ?? []).filter((l) => l.created_at.slice(0, 10) === dateStr).length
          return { date: dateStr, count }
        }),
      })),
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pendente', 'em_analise']),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .in('status', ['planejamento', 'medicao', 'producao', 'instalacao']),
    supabase
      .from('projects')
      .select('contract_value')
      .gte('created_at', startOfMonth)
      .eq('status', 'concluido')
      .then(({ data }) => ({
        data: [{ total: (data ?? []).reduce((s, p) => s + (p.contract_value ?? 0), 0) }],
      })),
    supabase
      .from('projects')
      .select('contract_value')
      .gte('created_at', startOfYear)
      .eq('status', 'concluido')
      .then(({ data }) => ({
        data: [{ total: (data ?? []).reduce((s, p) => s + (p.contract_value ?? 0), 0) }],
      })),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'ganho'),
    // Leads with no interaction for STALE_LEAD_DAYS and still in active pipeline stages
    supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .in('status', ['novo', 'em_contato', 'proposta_enviada', 'em_negociacao'])
      .lt('updated_at', staleCutoff),
    // Active leads with no assigned user
    supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .in('status', ['novo', 'em_contato', 'proposta_enviada', 'em_negociacao'])
      .is('assigned_to', null),
  ])

  const totalLeads = leadsThisMonth ?? 0
  const conversionRate = totalLeads > 0 ? ((wonLeads ?? 0) / totalLeads) * 100 : 0

  return {
    leads_today: leadsToday ?? 0,
    leads_this_month: leadsThisMonth ?? 0,
    leads_prev_month: leadsPrevMonth ?? 0,
    leads_by_status: (leadsByStatus ?? []) as DashboardMetrics['leads_by_status'],
    leads_by_service: (leadsByService ?? []) as DashboardMetrics['leads_by_service'],
    leads_30d: leads30d ?? [],
    recent_leads: (recentLeads ?? []) as DashboardMetrics['recent_leads'],
    open_quotes: openQuotes ?? 0,
    active_projects: activeProjects ?? 0,
    revenue_this_month: (revenueMonth?.[0] as { total: number })?.total ?? 0,
    revenue_ytd: (revenueYear?.[0] as { total: number })?.total ?? 0,
    conversion_rate: Math.round(conversionRate * 10) / 10,
    avg_ticket: 0,
    stale_leads: staleLeads ?? 0,
    unassigned_leads: unassignedLeads ?? 0,
    stale_lead_days: STALE_LEAD_DAYS,
  }
}
