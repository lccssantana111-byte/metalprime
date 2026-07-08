'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { WHATSAPP_NUMBER as WHATSAPP_NUMBER_FALLBACK } from '@/lib/constants'

const WhatsAppNumberContext = createContext<string>(WHATSAPP_NUMBER_FALLBACK)

export function WhatsAppNumberProvider({ number, children }: { number: string; children: ReactNode }) {
  return (
    <WhatsAppNumberContext.Provider value={number}>
      {children}
    </WhatsAppNumberContext.Provider>
  )
}

/** Número de WhatsApp vindo do banco (site_settings), com fallback para o env/constante. */
export function useWhatsAppNumber() {
  return useContext(WhatsAppNumberContext)
}
