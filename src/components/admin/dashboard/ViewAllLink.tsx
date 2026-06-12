'use client'

import Link from 'next/link'

export function ViewAllLink({ href, label = 'Ver todos' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="text-[10px] font-mono tracking-widest uppercase transition-colors"
      style={{ color: '#f97316' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ea580c' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
    >
      {label}
    </Link>
  )
}
