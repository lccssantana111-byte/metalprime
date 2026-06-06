'use client'

import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { LEAD_STATUS_LABELS } from '@/lib/constants'
import type { LeadStatus } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  novo: '#3B82F6',
  em_contato: '#EAB308',
  proposta_enviada: '#A855F7',
  em_negociacao: '#F97316',
  ganho: '#22C55E',
  perdido: '#EF4444',
  sem_interesse: '#6B7280',
}

interface FunnelItem {
  status: LeadStatus
  count: number
}

interface ConversionFunnelProps {
  data: FunnelItem[]
}

export function ConversionFunnel({ data }: ConversionFunnelProps) {
  const PIPELINE_ORDER: LeadStatus[] = ['novo', 'em_contato', 'proposta_enviada', 'em_negociacao', 'ganho', 'perdido']
  const sorted = PIPELINE_ORDER
    .map((s) => ({ status: s, count: data.find((d) => d.status === s)?.count ?? 0 }))
    .filter((d) => d.count > 0)
    .map((d) => ({ ...d, label: LEAD_STATUS_LABELS[d.status] }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
        <XAxis type="number" tick={{ fill: '#8C97A0', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fill: '#8C97A0', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip
          contentStyle={{ background: '#1E2328', border: '1px solid #2A3038', borderRadius: 8 }}
          labelStyle={{ color: '#fff', fontSize: 11 }}
          itemStyle={{ color: '#8C97A0', fontSize: 12 }}
          formatter={(value) => [value ?? 0, 'Leads']}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {sorted.map((entry) => (
            <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? '#8C97A0'} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
