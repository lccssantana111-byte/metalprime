'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SERVICE_LABELS } from '@/lib/constants'
import type { ServiceType } from '@/types'

const COLORS = ['#C8860A', '#3B82F6', '#22C55E', '#A855F7', '#F97316', '#EAB308']

interface ServiceItem {
  service: ServiceType
  count: number
}

interface ServicesPieChartProps {
  data: ServiceItem[]
}

export function ServicesPieChart({ data }: ServicesPieChartProps) {
  const chartData = data.map((d) => ({
    name: SERVICE_LABELS[d.service] ?? d.service,
    value: d.count,
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#1E2328', border: '1px solid #2A3038', borderRadius: 8 }}
          itemStyle={{ color: '#fff', fontSize: 11 }}
          formatter={(value) => [value ?? 0, 'Leads']}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span style={{ color: '#8C97A0', fontSize: 11 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
