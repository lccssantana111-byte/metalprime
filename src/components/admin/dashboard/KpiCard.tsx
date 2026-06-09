'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Props {
  label: string
  value: string | number
  sub: string
  trend?: { current: number; previous: number } | null
  href: string
  primary: boolean
}

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return null
  const diff = current - previous
  const pct = Math.round((diff / previous) * 100)
  const base = 'inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums'
  if (diff === 0) return <span className={base} style={{ color: '#94a3b8' }}><Minus className="w-3 h-3" />0%</span>
  if (diff > 0) return <span className={base} style={{ color: '#16a34a' }}><TrendingUp className="w-3 h-3" />+{pct}%</span>
  return <span className={base} style={{ color: '#dc2626' }}><TrendingDown className="w-3 h-3" />{pct}%</span>
}

export function KpiCard({ label, value, sub, trend, href, primary }: Props) {
  return (
    <Link href={href} className="group block">
      <div
        className="rounded-xl p-5 transition-all duration-200 h-full"
        style={{
          background: primary ? '#fff7ed' : '#ffffff',
          border: primary ? '1px solid #fed7aa' : '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = primary ? '#fb923c' : '#cbd5e1'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(15,23,42,0.08)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = primary ? '#fed7aa' : '#e2e8f0'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(15,23,42,0.04)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] font-semibold font-mono tracking-[0.15em] uppercase"
            style={{ color: primary ? '#ea580c' : '#94a3b8' }}
          >
            {label}
          </span>
          {trend && <Trend current={trend.current} previous={trend.previous} />}
        </div>
        <div className="h-px mb-3" style={{ background: primary ? '#fed7aa' : '#f1f5f9' }} />
        <div
          className="font-display font-black leading-none mb-1.5"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#0f172a' }}
        >
          {value}
        </div>
        <p className="text-[11px]" style={{ color: '#94a3b8' }}>{sub}</p>
      </div>
    </Link>
  )
}
