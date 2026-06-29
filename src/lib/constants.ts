export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Metal Shark'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.metalshark.com.br'
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511949561353'
export const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE ?? '(11) 94956-1353'
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'serralheria172@gmail.com'
export const COMPANY_ADDRESS = `${process.env.NEXT_PUBLIC_COMPANY_ADDRESS_STREET ?? 'R. Manoel Vergueiro, 1500 - Jardim Belcito'} — ${process.env.NEXT_PUBLIC_COMPANY_ADDRESS_CITY ?? 'São Paulo'}, SP`
export const COMPANY_ADDRESS_STREET = process.env.NEXT_PUBLIC_COMPANY_ADDRESS_STREET ?? 'R. Manoel Vergueiro, 1500 - Jardim Belcito'
export const COMPANY_ADDRESS_CITY = process.env.NEXT_PUBLIC_COMPANY_ADDRESS_CITY ?? 'São Paulo'
export const COMPANY_ADDRESS_REGION = 'SP'
export const COMPANY_ADDRESS_POSTAL = process.env.NEXT_PUBLIC_COMPANY_ADDRESS_POSTAL ?? '04855-090'
export const COMPANY_GEO_LAT = parseFloat(process.env.NEXT_PUBLIC_COMPANY_GEO_LAT ?? '-23.55')
export const COMPANY_GEO_LNG = parseFloat(process.env.NEXT_PUBLIC_COMPANY_GEO_LNG ?? '-46.63')
export const COMPANY_TAGLINE = 'Serralheria de alto padrão.'

export const SERVICE_LABELS: Record<string, string> = {
  portoes: 'Portões',
  grades_e_cercas: 'Grades e Cercas',
  escadas: 'Escadas',
  corrimoes: 'Corrimões',
  estruturas_metalicas: 'Estruturas Metálicas',
  sob_medida: 'Sob Medida',
}

export const SERVICE_SLUGS: Record<string, string> = {
  portoes: 'portoes',
  grades_e_cercas: 'grades-e-cercas',
  escadas: 'escadas',
  corrimoes: 'corrimoes',
  estruturas_metalicas: 'estruturas-metalicas',
  sob_medida: 'sob-medida',
}

export const LEAD_STATUS_LABELS: Record<string, string> = {
  novo: 'Novo',
  em_contato: 'Em Contato',
  proposta_enviada: 'Proposta Enviada',
  em_negociacao: 'Em Negociação',
  ganho: 'Ganho',
  perdido: 'Perdido',
  sem_interesse: 'Sem Interesse',
}

export const LEAD_STATUS_COLORS: Record<string, string> = {
  novo: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  em_contato: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  proposta_enviada: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  em_negociacao: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  ganho: 'bg-green-500/20 text-green-300 border-green-500/30',
  perdido: 'bg-red-500/20 text-red-300 border-red-500/30',
  sem_interesse: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
}

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  planejamento: 'Planejamento',
  medicao: 'Medição',
  producao: 'Produção',
  instalacao: 'Instalação',
  concluido: 'Concluído',
  pausado: 'Pausado',
  cancelado: 'Cancelado',
}

export const QUOTE_STATUS_LABELS: Record<string, string> = {
  pendente: 'Pendente',
  em_analise: 'Em Análise',
  proposta_enviada: 'Proposta Enviada',
  aprovado: 'Aprovado',
  recusado: 'Recusado',
  expirado: 'Expirado',
}

export const CLIENT_TYPE_LABELS: Record<string, string> = {
  pessoa_fisica: 'Pessoa Física',
  condominio: 'Condomínio',
  construtora: 'Construtora',
  empresa: 'Empresa',
}
