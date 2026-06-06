import { getDashboardMetrics } from '@/lib/queries/metrics'
import { formatBRL } from '@/lib/utils'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  UserX,
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
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] text-metal-dark font-mono">
        <Minus className="w-3 h-3" />
        {pct}%
      </span>
    )
  if (diff > 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] text-green-400 font-mono">
        <TrendingUp className="w-3 h-3" />+{pct}%
      </span>
    )
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] text-red-400 font-mono">
      <TrendingDown className="w-3 h-3" />
      {pct}%
    </span>
  )
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics().catch(() => null)

  const leads30dTotal = metrics?.leads_30d?.reduce((s, d) => s + d.count, 0) ?? 0
  const stale = metrics?.stale_leads ?? 0
  const unassigned = metrics?.unassigned_leads ?? 0
  const staleDays = metrics?.stale_lead_days ?? 3

  const kpis = [
    {
      label: 'Leads hoje',
      value: metrics?.leads_today ?? 0,
      sub: `${metrics?.leads_this_month ?? 0} este mês`,
      trend: <Trend current={metrics?.leads_this_month ?? 0} previous={metrics?.leads_prev_month ?? 0} />,
      href: '/admin/leads',
      accent: true,
    },
    {
      label: 'Orçamentos abertos',
      value: metrics?.open_quotes ?? 0,
      sub: 'Aguardando análise',
      trend: null,
      href: '/admin/orcamentos',
      accent: false,
    },
    {
      label: 'Projetos em andamento',
      value: metrics?.active_projects ?? 0,
      sub: 'Em execução',
      trend: null,
      href: '/admin/projetos',
      accent: false,
    },
    {
      label: 'Receita este mês',
      value: formatBRL(metrics?.revenue_this_month ?? 0),
      sub: `${formatBRL(metrics?.revenue_ytd ?? 0)} no ano`,
      trend: null,
      href: '/admin/projetos',
      accent: false,
    },
    {
      label: 'Taxa de conversão',
      value: `${metrics?.conversion_rate ?? 0}%`,
      sub: 'Leads → ganho',
      trend: null,
      href: '/admin/leads',
      accent: false,
    },
    {
      label: 'Leads 30 dias',
      value: leads30dTotal,
      sub: 'Últimos 30 dias',
      trend: null,
      href: '/admin/leads',
      accent: false,
    },
  ]

  const hasAlerts = stale > 0 || unassigned > 0

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-brand mb-1">
            Visão Geral
          </p>
          <h1 className="font-display text-3xl font-black text-white leading-none">Dashboard</h1>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-metal-dark">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Alertas operacionais */}
      {hasAlerts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {stale > 0 && (
            <Link
              href="/admin/leads?status=novo"
              className="flex items-center gap-3 bg-orange-500/8 border border-orange-500/25 rounded-xl p-4 hover:border-orange-500/45 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {stale} lead{stale > 1 ? 's' : ''} sem resposta
                </p>
                <p className="text-xs text-orange-300/60">
                  Sem atualização há mais de {staleDays} dias
                </p>
              </div>
            </Link>
          )}
          {unassigned > 0 && (
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 bg-yellow-500/8 border border-yellow-500/25 rounded-xl p-4 hover:border-yellow-500/45 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center shrink-0">
                <UserX className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {unassigned} lead{unassigned > 1 ? 's' : ''} sem responsável
                </p>
                <p className="text-xs text-yellow-300/60">Atribua um vendedor para garantir o follow-up</p>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="group block">
            <div
              className={`
                relative bg-graphite border border-metal-dark/25 rounded-xl p-5
                hover:border-amber-brand/25 transition-all duration-200
                overflow-hidden
              `}
            >
              {/* Accent bar */}
              {kpi.accent && (
                <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-amber-brand rounded-r-full" />
              )}

              {/* Top row: label + trend */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-metal-dark">
                  {kpi.label}
                </span>
                {kpi.trend}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/4 mb-3" />

              {/* Value */}
              <div className="font-display text-[2rem] font-black text-white leading-none mb-1.5 group-hover:text-amber-light transition-colors duration-200">
                {kpi.value}
              </div>

              {/* Sub */}
              <p className="text-[11px] text-metal-dark">{kpi.sub}</p>

              {/* Corner decoration */}
              <div className="absolute bottom-3 right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 right-0 w-2 h-px bg-amber-brand/40" />
                <div className="absolute bottom-0 right-0 w-px h-2 bg-amber-brand/40" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-graphite border border-metal-dark/25 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-metal-dark mb-0.5">
                Tendência
              </p>
              <h3 className="font-display font-semibold text-white text-sm">Leads — últimos 30 dias</h3>
            </div>
            <span className="font-mono text-xs text-metal-dark tabular-nums">{leads30dTotal} total</span>
          </div>
          {metrics?.leads_30d && metrics.leads_30d.length > 0 ? (
            <LeadsLineChart data={metrics.leads_30d} />
          ) : (
            <EmptyChart />
          )}
        </div>

        <div className="bg-graphite border border-metal-dark/25 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-metal-dark mb-0.5">
                Recentes
              </p>
              <h3 className="font-display font-semibold text-white text-sm">Leads recentes</h3>
            </div>
            <Link href="/admin/leads" className="text-[10px] text-amber-brand hover:text-amber-light transition-colors tracking-widest uppercase">
              Ver todos
            </Link>
          </div>
          <RecentLeads leads={metrics?.recent_leads ?? []} />
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-graphite border border-metal-dark/25 rounded-xl p-5">
          <div className="mb-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-metal-dark mb-0.5">
              Pipeline
            </p>
            <h3 className="font-display font-semibold text-white text-sm">Funil de conversão</h3>
          </div>
          {metrics?.leads_by_status && metrics.leads_by_status.length > 0 ? (
            <ConversionFunnel data={metrics.leads_by_status as Parameters<typeof ConversionFunnel>[0]['data']} />
          ) : (
            <EmptyChart />
          )}
        </div>

        <div className="bg-graphite border border-metal-dark/25 rounded-xl p-5">
          <div className="mb-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-metal-dark mb-0.5">
              Distribuição
            </p>
            <h3 className="font-display font-semibold text-white text-sm">Leads por serviço</h3>
          </div>
          {metrics?.leads_by_service && metrics.leads_by_service.length > 0 ? (
            <ServicesPieChart data={metrics.leads_by_service as Parameters<typeof ServicesPieChart>[0]['data']} />
          ) : (
            <EmptyChart />
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="h-[180px] flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-px bg-metal-dark/50" />
      <p className="text-xs text-metal-dark">Sem dados ainda</p>
    </div>
  )
}
