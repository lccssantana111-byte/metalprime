'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackWhatsAppClick } from '@/lib/gtm'

interface TrackedWhatsAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  source: string
  children: ReactNode
}

/** Anchor de WhatsApp instrumentado com dataLayer, para uso dentro de Server Components. */
export default function TrackedWhatsAppLink({ source, children, ...props }: TrackedWhatsAppLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props} onClick={() => trackWhatsAppClick(source)}>
      {children}
    </a>
  )
}
