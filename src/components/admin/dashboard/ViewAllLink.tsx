'use client'

import Link from 'next/link'

export function ViewAllLink({ href, label = 'Ver todos' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="text-[10px] font-mono tracking-widest uppercase transition-colors"
      style={{ color: '#c8860a' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e8a020' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#c8860a' }}
    >
      {label}
    </Link>
  )
}
