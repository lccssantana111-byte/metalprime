import { getDashboardMetrics } from '@/lib/queries/metrics'
import { formatBRL } from '@/lib/utils'
import {
  Users, FileText, FolderOpen, TrendingUp, Target, BarChart3,
  TrendingDown, Minus, AlertTriangle, UserX,
} from 'lucide-react'
import Link from 'next/link'
import { LeadsLineChart } from '@/components/admin/dashboard/LeadsLineChart'
import { ConversionFunnel } from '@/components/admin/dashboard/ConversionFunnel'
import { ServicesPieChart } from '@/components/admin/dashboard/ServicesPieChart'
import { RecentLeads } from '@/components/admin/dashboard/RecentLeads'

export const dynamic = 'force-dynamic'

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return null
  const diff = current - previous
  const pct = Math.round((diff / previous) * 100)
  if (diff === 0)
    return <span className="inline-flex items-center gap-0.5 text-xs text-metal-dark"><Minus className="w-3 h-3" />{pct}%</span>
  if (diff > 0)
    return <span className="inline-flex items-center gap-0.5 text-xs text-green-400"><TrendingUp className="w-3 h-3" />+{pct}%</span>
  return <span className="inline-flex items-center gap-0.5 text-xs text-red-400"><TrendingDown className="w-3 h-3" />{pct}%</span>
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics().catch(() => null)

  const leads30dTotal = metrics?.leads_30d?.reduce((s, d) => s + d.count, 0) ?? 0
  const stale = metrics?.stale_leads ?? 0
  const unassigned = metrics?.unassigned_leads ?? 0
  const staleDays = metrics?.stale_lead_days ?? 3

  const kpis = [
    {
      icon: Users,
      label: 'Leads hoje',
      value: metrics?.leads_today ?? 0,
      sub: `${metrics?.leads_this_month ?? 0} este mês`,
      trend: <Trend current={metrics?.leads_this_month ?? 0} previous={metrics?.leads_prev_month ?? 0} />,
      href: '/admin/leads',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: FileText,
      label: 'Orçamentos abertos',
      value: metrics?.open_quotes ?? 0,
      sub: 'Aguardando análise',
      trend: null,
      href: '/admin/orcamentos',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
    },
    {
      icon: FolderOpen,
      label: 'Projetos em andamento',
      value: metrics?.active_projects ?? 0,
      sub: 'Em execução',
      trend: null,
      href: '/admin/projetos',
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/20',
    },
    {
      icon: TrendingUp,
      label: 'Receita este mês',
      value: formatBRL(metrics?.revenue_this_month ?? 0),
      sub: `${formatBRL(metrics?.revenue_ytd ?? 0)} no ano`,
      trend: null,
      href: '/admin/projetos',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Target,
      label: 'Taxa de conversão',
      value: `${metrics?.conversion_rate ?? 0}%`,
      sub: 'Leads → ganho',
      trend: null,
      href: '/admin/leads',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: BarChart3,
      label: 'Leads 30 dias',
      value: leads30dTotal,
      sub: 'Últimos 30 dias',
      trend: null,
      href: '/admin/leads',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
  ]

  const hasAlerts = stale > 0 || unassigned > 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-metal mt-1">Visão geral da operação comercial</p>
      </div>

      {/* Alertas operacionais */}
      {hasAlerts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {stale > 0 && (
            <Link href="/admin/leads?status=novo" className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {stale} lead{stale > 1 ? 's' : ''} sem resposta
                </p>
                <p className="text-xs text-orange-300/70">
                  Sem atualização há mais de {staleDays} dias — requer ação
                </p>
              </div>
            </Link>
          )}
          {unassigned > 0 && (
            <Link href="/admin/leads" className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                <UserX className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {unassigned} lead{unassigned > 1 ? 's' : ''} sem responsável
                </p>
                <p className="text-xs text-yellow-300/70">Atribua um vendedor para garantir o follow-up</p>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href}>
            <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6 hover:border-amber-brand/30 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${kpi.bg}`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                {kpi.trend}
              </div>
              <div className="font-display text-3xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-sm font-medium text-metal-light">{kpi.label}</div>
              <div className="text-xs text-metal-dark mt-1">{kpi.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Gráfico de linha 30 dias + Leads recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-graphite border border-metal-dark/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Leads — últimos 30 dias</h3>
            <span className="text-xs text-metal-dark">{leads30dTotal} total</span>
          </div>
          {metrics?.leads_30d && metrics.leads_30d.length > 0 ? (
            <LeadsLineChart data={metrics.leads_30d} />
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-metal">Sem dados</div>
          )}
        </div>

        <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Leads recentes</h3>
            <Link href="/admin/leads" className="text-xs text-amber-brand hover:text-amber-light transition-colors">
              Ver todos
            </Link>
          </div>
          <RecentLeads leads={metrics?.recent_leads ?? []} />
        </div>
      </div>

      {/* Funil de conversão + Distribuição por serviço */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Funil de conversão</h3>
          {metrics?.leads_by_status && metrics.leads_by_status.length > 0 ? (
            <ConversionFunnel data={metrics.leads_by_status as Parameters<typeof ConversionFunnel>[0]['data']} />
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-metal">Sem dados</div>
          )}
        </div>

        <div className="bg-graphite border border-metal-dark/30 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Leads por serviço</h3>
          {metrics?.leads_by_service && metrics.leads_by_service.length > 0 ? (
            <ServicesPieChart data={metrics.leads_by_service as Parameters<typeof ServicesPieChart>[0]['data']} />
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-metal">Sem dados</div>
          )}
        </div>
      </div>
    </div>
  )
}
