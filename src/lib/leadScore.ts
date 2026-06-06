import type { Lead } from '@/types'

// Points by service (higher ticket = higher score)
const SERVICE_SCORE: Record<string, number> = {
  estruturas_metalicas: 30,
  portoes: 25,
  escadas: 20,
  sob_medida: 20,
  corrimoes: 15,
  grades_e_cercas: 10,
}

// Points by client type
const CLIENT_TYPE_SCORE: Record<string, number> = {
  construtora: 30,
  condominio: 25,
  empresa: 20,
  pessoa_fisica: 10,
}

// Points by source
const SOURCE_SCORE: Record<string, number> = {
  indicacao: 20,
  website: 10,
  instagram: 8,
  facebook: 8,
  google: 10,
  manual: 5,
}

export interface LeadScore {
  total: number
  label: 'Quente' | 'Morno' | 'Frio'
  color: string
  breakdown: { factor: string; points: number }[]
}

export function scoreLeadOf(lead: Pick<Lead, 'service' | 'client_type' | 'source' | 'email' | 'company'>): LeadScore {
  const breakdown: { factor: string; points: number }[] = []

  const servicePoints = SERVICE_SCORE[lead.service ?? ''] ?? 5
  breakdown.push({ factor: 'Serviço', points: servicePoints })

  const clientPoints = CLIENT_TYPE_SCORE[lead.client_type ?? ''] ?? 5
  breakdown.push({ factor: 'Tipo de cliente', points: clientPoints })

  const sourcePoints = SOURCE_SCORE[lead.source ?? ''] ?? 5
  breakdown.push({ factor: 'Origem', points: sourcePoints })

  if (lead.email) breakdown.push({ factor: 'E-mail fornecido', points: 10 })
  if (lead.company) breakdown.push({ factor: 'Empresa informada', points: 5 })

  const total = breakdown.reduce((s, b) => s + b.points, 0)

  let label: LeadScore['label']
  let color: string
  if (total >= 60) { label = 'Quente'; color = 'text-red-400 border-red-400/30 bg-red-400/10' }
  else if (total >= 35) { label = 'Morno'; color = 'text-orange-400 border-orange-400/30 bg-orange-400/10' }
  else { label = 'Frio'; color = 'text-blue-400 border-blue-400/30 bg-blue-400/10' }

  return { total, label, color, breakdown }
}
