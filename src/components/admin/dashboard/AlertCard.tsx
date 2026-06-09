'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Props {
  href: string
  bg: string
  border: string
  borderHover: string
  iconBg: string
  Icon: LucideIcon
  iconColor: string
  title: string
  sub: string
  subColor: string
}

export function AlertCard({ href, bg, border, borderHover, iconBg, Icon, iconColor, title, sub, subColor }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl p-3.5 transition-all group"
      style={{ background: bg, border: `1px solid ${border}` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = borderHover }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = border }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: iconBg }}>
        <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-foreground">{title}</p>
        <p className="text-[11px]" style={{ color: subColor }}>{sub}</p>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 ml-auto shrink-0 text-current opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}
