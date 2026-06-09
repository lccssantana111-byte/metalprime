'use client'

import Link from 'next/link'

interface Props {
  label: string
  value: string | number
  sub: string
  trend: React.ReactNode
  href: string
  primary: boolean
}

export function KpiCard({ label, value, sub, trend, href, primary }: Props) {
  return (
    <Link href={href} className="group block">
      <div
        className="rounded-xl p-5 transition-all duration-200 h-full relative overflow-hidden"
        style={{
          background: primary ? 'rgba(200,134,10,0.06)' : 'rgba(0,0,0,0.04)',
          border: primary ? '1px solid rgba(200,134,10,0.25)' : '1px solid rgba(0,0,0,0.08)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = primary ? 'rgba(200,134,10,0.5)' : 'rgba(0,0,0,0.12)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = primary ? 'rgba(200,134,10,0.25)' : 'rgba(0,0,0,0.08)'
        }}
      >
        <div className="flex items-center justify-between mb-3.5">
          <span
            className="text-[10px] font-semibold font-mono tracking-[0.15em] uppercase"
            style={{ color: primary ? 'rgba(200,134,10,0.8)' : 'rgba(0,0,0,0.25)' }}
          >
            {label}
          </span>
          {trend}
        </div>
        <div className="h-px mb-3.5" style={{ background: 'rgba(0,0,0,0.07)' }} />
        <div
          className="font-display font-black leading-none mb-2"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#fff' }}
        >
          {value}
        </div>
        <p className="text-[11px]" style={{ color: 'rgba(0,0,0,0.22)' }}>{sub}</p>
      </div>
    </Link>
  )
}
