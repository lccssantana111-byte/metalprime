import { getDashboardMetrics } from '@/lib/queries/metrics'
import { formatBRL } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, UserX } from 'lucide-react'
import { LeadsLineChart } from '@/components/admin/dashboard/LeadsLineChart'
import { ConversionFunnel } from '@/components/admin/dashboard/ConversionFunnel'
import { ServicesPieChart } from '@/components/admin/dashboard/ServicesPieChart'
import { RecentLeads } from '@/components/admin/dashboard/RecentLeads'
import { AlertCard } from '@/components/admin/dashboard/AlertCard'
import { KpiCard } from '@/components/admin/dashboard/KpiCard'
import { ViewAllLink } from '@/components/admin/dashboard/ViewAllLink'

export const dynamic = 'force-dynamic'

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return null
  const diff = current - previous
  const pct = Math.round((diff / previous) * 100)
  const base = 'inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums'
  if (diff === 0) return <span className={base} style={{ color: '#94a3b8' }}><Minus className="w-3 h-3" />0%</span>
  if (diff > 0) return <span className={`${base}`} style={{ color: '#16a34a' }}><TrendingUp className="w-3 h-3" />+{pct}%</span>
  return <span className={`${base}`} style={{ color: '#dc2626' }}><TrendingDown className="w-3 h-3" />{pct}%</span>
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics().catch(() => null)

  const leads30dTotal = metrics?.leads_30d?.reduce((s, d) => s + d.count, 0) ?? 0
  const stale = metrics?.stale_leads ?? 0
  const unassigned = metrics?.unassigned_leads ?? 0
  const staleDays = metrics?.stale_lead_days ?? 3

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const dateLabel = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  const kpis = [
    {
      label: 'Leads hoje',
      value: metrics?.leads_today ?? 0,
      sub: `${metrics?.leads_this_month ?? 0} este mês`,
      trend: <Trend current={metrics?.leads_this_month ?? 0} previous={metrics?.leads_prev_month ?? 0} />,
      href: '/admin/leads',
      primary: true,
    },
    {
      label: 'Orçamentos abertos',
      value: metrics?.open_quotes ?? 0,
      sub: 'Aguardando análise',
      trend: null,
      href: '/admin/orcamentos',
      primary: false,
    },
    {
      label: 'Projetos ativos',
      value: metrics?.active_projects ?? 0,
      sub: 'Em execução',
      trend: null,
      href: '/admin/projetos',
      primary: false,
    },
    {
      label: 'Receita do mês',
      value: formatBRL(metrics?.revenue_this_month ?? 0),
      sub: `${formatBRL(metrics?.revenue_ytd ?? 0)} no ano`,
      trend: null,
      href: '/admin/projetos',
      primary: false,
    },
    {
      label: 'Conversão',
      value: `${metrics?.conversion_rate ?? 0}%`,
      sub: 'Leads → ganho',
      trend: null,
      href: '/admin/leads',
      primary: false,
    },
    {
      label: 'Leads 30 dias',
      value: leads30dTotal,
      sub: 'Últimos 30 dias',
      trend: null,
      href: '/admin/leads',
      primary: false,
    },
  ]

  const hasAlerts = stale > 0 || unassigned > 0

  return (
    <div className="max-w-[1400px]">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8">
        <div>
          <p className="text-[11px] font-mono tracking-[0.15em] uppercase mb-1" style={{ color: '#94a3b8' }}>
            {greeting}
          </p>
          <h1 className="font-display font-black text-[2rem] text-foreground leading-none">
            Dashboard
          </h1>
        </div>
        <p className="text-[12px] font-mono capitalize" style={{ color: '#94a3b8' }}>
          {dateLabel}
        </p>
      </div>

      {/* Alertas operacionais */}
      {hasAlerts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {stale > 0 && (
            <AlertCard
              href="/admin/leads?status=novo"
              bg="#fff7ed"
              border="#fed7aa"
              borderHover="#fb923c"
              iconBg="#ffedd5"
              Icon={AlertTriangle}
              iconColor="text-orange-500"
              title={`${stale} lead${stale > 1 ? 's' : ''} sem resposta`}
              sub={`Sem atualização há +${staleDays} dias`}
              subColor="#ea580c"
            />
          )}
          {unassigned > 0 && (
            <AlertCard
              href="/admin/leads"
              bg="#fefce8"
              border="#fde68a"
              borderHover="#fbbf24"
              iconBg="#fef9c3"
              Icon={UserX}
              iconColor="text-yellow-600"
              title={`${unassigned} lead${unassigned > 1 ? 's' : ''} sem responsável`}
              sub="Atribua um vendedor para garantir follow-up"
              subColor="#ca8a04"
            />
          )}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Charts — 2/3 + 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 mb-2.5">
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: '#94a3b8' }}>
                Tendência
              </p>
              <h3 className="font-display font-semibold text-[14px] text-foreground">
                Leads — últimos 30 dias
              </h3>
            </div>
            <span className="font-mono text-[12px] tabular-nums" style={{ color: '#94a3b8' }}>
              {leads30dTotal} total
            </span>
          </div>
          {metrics?.leads_30d && metrics.leads_30d.length > 0 ? (
            <LeadsLineChart data={metrics.leads_30d} />
          ) : (
            <EmptyState label="Nenhum lead nos últimos 30 dias" />
          )}
        </div>

        <div
          className="rounded-xl p-5"
          style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: '#94a3b8' }}>
                Recentes
              </p>
              <h3 className="font-display font-semibold text-[14px] text-foreground">Leads recentes</h3>
            </div>
            <ViewAllLink href="/admin/leads" />
          </div>
          <RecentLeads leads={metrics?.recent_leads ?? []} />
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        <div
          className="rounded-xl p-5"
          style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
        >
          <div className="mb-5">
            <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: '#94a3b8' }}>
              Pipeline
            </p>
            <h3 className="font-display font-semibold text-[14px] text-foreground">Funil de conversão</h3>
          </div>
          {metrics?.leads_by_status && metrics.leads_by_status.length > 0 ? (
            <ConversionFunnel data={metrics.leads_by_status as Parameters<typeof ConversionFunnel>[0]['data']} />
          ) : (
            <EmptyState label="Nenhum dado disponível" />
          )}
        </div>

        <div
          className="rounded-xl p-5"
          style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
        >
          <div className="mb-5">
            <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: '#94a3b8' }}>
              Distribuição
            </p>
            <h3 className="font-display font-semibold text-[14px] text-foreground">Leads por serviço</h3>
          </div>
          {metrics?.leads_by_service && metrics.leads_by_service.length > 0 ? (
            <ServicesPieChart data={metrics.leads_by_service as Parameters<typeof ServicesPieChart>[0]['data']} />
          ) : (
            <EmptyState label="Nenhum dado disponível" />
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="h-[180px] flex flex-col items-center justify-center gap-2">
      <div className="w-6 h-px" style={{ background: '#e2e8f0' }} />
      <p className="text-[12px] font-mono" style={{ color: '#94a3b8' }}>
        {label}
      </p>
    </div>
  )
}
