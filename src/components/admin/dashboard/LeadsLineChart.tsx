'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface DataPoint {
  date: string
  count: number
}

interface LeadsLineChartProps {
  data: DataPoint[]
}

export function LeadsLineChart({ data }: LeadsLineChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: format(parseISO(d.date), 'd MMM', { locale: ptBR }),
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={formatted} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C8860A" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#C8860A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A3038" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: '#8C97A0', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          interval={6}
        />
        <YAxis
          tick={{ fill: '#8C97A0', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{ background: '#1E2328', border: '1px solid #2A3038', borderRadius: 8 }}
          labelStyle={{ color: '#8C97A0', fontSize: 11 }}
          itemStyle={{ color: '#C8860A', fontSize: 12 }}
          formatter={(value) => [value ?? 0, 'Leads']}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#C8860A"
          strokeWidth={2}
          fill="url(#leadGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#C8860A' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
