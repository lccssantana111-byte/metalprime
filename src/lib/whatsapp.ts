import { WHATSAPP_NUMBER } from './constants'
import type { ServiceType } from '@/types'

const SERVICE_WA_NAMES: Record<ServiceType, string> = {
  portoes: 'portões',
  grades_e_cercas: 'grades e cercas',
  escadas: 'escadas metálicas',
  corrimoes: 'corrimões e guarda-corpos',
  estruturas_metalicas: 'estruturas metálicas',
  sob_medida: 'projeto sob medida',
}

export function buildWhatsAppUrl(message: string, number = WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}

export function buildQuoteWhatsAppUrl(name: string, service: ServiceType): string {
  const serviceName = SERVICE_WA_NAMES[service]
  const message = `Olá! Sou ${name} e acabei de solicitar um orçamento para *${serviceName}* pelo site. Gostaria de acompanhar minha solicitação.`
  return buildWhatsAppUrl(message)
}

export function buildLeadWhatsAppUrl(name: string, service?: ServiceType | null): string {
  const serviceText = service ? ` sobre *${SERVICE_WA_NAMES[service]}*` : ''
  const message = `Olá! Sou ${name} e enviei uma mensagem pelo site${serviceText}. Gostaria de falar com um especialista.`
  return buildWhatsAppUrl(message)
}

export function buildAdminWhatsAppUrl(clientPhone: string, clientName: string, service?: ServiceType | null): string {
  const serviceText = service ? ` — Serviço: ${SERVICE_WA_NAMES[service]}` : ''
  const message = `Olá, ${clientName}! Aqui é da equipe Metal Shark${serviceText}. Recebemos seu pedido e gostaríamos de conversar sobre seu projeto.`
  const number = clientPhone.replace(/\D/g, '')
  return buildWhatsAppUrl(message, number.startsWith('55') ? number : `55${number}`)
}
