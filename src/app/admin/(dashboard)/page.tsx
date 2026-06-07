import { getDashboardMetrics } from '@/lib/queries/metrics'
import { formatBRL } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, UserX, ArrowUpRight } from 'lucide-react'
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
  const base = 'inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums'
  if (diff === 0) return <span className={base} style={{ color: 'rgba(255,255,255,0.3)' }}><Minus className="w-3 h-3" />0%</span>
  if (diff > 0) return <span className={`${base} text-emerald-400`}><TrendingUp className="w-3 h-3" />+{pct}%</span>
  return <span className={`${base} text-red-400`}><TrendingDown className="w-3 h-3" />{pct}%</span>
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics().catch(() => null)

  const leads30dTotal = metrics?.leads_30d?.reduce((s, d) => s + d.count, 0) ?? 0
  const stale = metrics?.stale_leads ?? 0
  const unassigned = metrics?.unassigned_leads ?? 0
  const staleDays = metrics?.stale_lead_days ?? 3

  // Greeting
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
          <p className="text-[11px] font-mono tracking-[0.15em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {greeting}
          </p>
          <h1 className="font-display font-black text-[2rem] text-white leading-none">
            Dashboard
          </h1>
        </div>
        <p className="text-[12px] font-mono capitalize" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {dateLabel}
        </p>
      </div>

      {/* Alertas operacionais */}
      {hasAlerts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {stale > 0 && (
            <Link
              href="/admin/leads?status=novo"
              className="flex items-center gap-3 rounded-xl p-3.5 transition-all group"
              style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.2)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(251,146,60,0.4)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(251,146,60,0.2)' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(251,146,60,0.12)' }}>
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white">
                  {stale} lead{stale > 1 ? 's' : ''} sem resposta
                </p>
                <p className="text-[11px]" style={{ color: 'rgba(251,146,60,0.6)' }}>
                  Sem atualização há +{staleDays} dias
                </p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 ml-auto shrink-0 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
          {unassigned > 0 && (
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 rounded-xl p-3.5 transition-all group"
              style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.18)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,204,21,0.35)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,204,21,0.18)' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(250,204,21,0.1)' }}>
                <UserX className="w-3.5 h-3.5 text-yellow-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white">
                  {unassigned} lead{unassigned > 1 ? 's' : ''} sem responsável
                </p>
                <p className="text-[11px]" style={{ color: 'rgba(250,204,21,0.55)' }}>
                  Atribua um vendedor para garantir follow-up
                </p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 ml-auto shrink-0 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="group block">
            <div
              className="rounded-xl p-5 transition-all duration-200 h-full relative overflow-hidden"
              style={{
                background: kpi.primary ? 'rgba(200,134,10,0.06)' : 'rgba(255,255,255,0.025)',
                border: kpi.primary
                  ? '1px solid rgba(200,134,10,0.25)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = kpi.primary ? 'rgba(200,134,10,0.5)' : 'rgba(255,255,255,0.12)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = kpi.primary ? 'rgba(200,134,10,0.25)' : 'rgba(255,255,255,0.06)'
              }}
            >
              {/* Label row */}
              <div className="flex items-center justify-between mb-3.5">
                <span
                  className="text-[10px] font-semibold font-mono tracking-[0.15em] uppercase"
                  style={{ color: kpi.primary ? 'rgba(200,134,10,0.8)' : 'rgba(255,255,255,0.3)' }}
                >
                  {kpi.label}
                </span>
                {kpi.trend}
              </div>

              {/* Divider */}
              <div className="h-px mb-3.5" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* Value */}
              <div
                className="font-display font-black leading-none mb-2 transition-colors duration-150"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  color: '#fff',
                }}
              >
                {kpi.value}
              </div>

              {/* Sub */}
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {kpi.sub}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts — 2/3 + 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 mb-2.5">
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Tendência
              </p>
              <h3 className="font-display font-semibold text-[14px] text-white">
                Leads — últimos 30 dias
              </h3>
            </div>
            <span className="font-mono text-[12px] tabular-nums" style={{ color: 'rgba(255,255,255,0.25)' }}>
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
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Recentes
              </p>
              <h3 className="font-display font-semibold text-[14px] text-white">Leads recentes</h3>
            </div>
            <Link
              href="/admin/leads"
              className="text-[10px] font-mono tracking-widest uppercase transition-colors"
              style={{ color: '#c8860a' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e8a020' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#c8860a' }}
            >
              Ver todos
            </Link>
          </div>
          <RecentLeads leads={metrics?.recent_leads ?? []} />
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="mb-5">
            <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Pipeline
            </p>
            <h3 className="font-display font-semibold text-[14px] text-white">Funil de conversão</h3>
          </div>
          {metrics?.leads_by_status && metrics.leads_by_status.length > 0 ? (
            <ConversionFunnel data={metrics.leads_by_status as Parameters<typeof ConversionFunnel>[0]['data']} />
          ) : (
            <EmptyState label="Nenhum dado disponível" />
          )}
        </div>

        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="mb-5">
            <p className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Distribuição
            </p>
            <h3 className="font-display font-semibold text-[14px] text-white">Leads por serviço</h3>
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
      <div className="w-6 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
      <p className="text-[12px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {label}
      </p>
    </div>
  )
}
