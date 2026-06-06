export type ServiceType =
  | 'portoes'
  | 'grades_e_cercas'
  | 'escadas'
  | 'corrimoes'
  | 'estruturas_metalicas'
  | 'sob_medida'

export type LeadStatus =
  | 'novo'
  | 'em_contato'
  | 'proposta_enviada'
  | 'em_negociacao'
  | 'ganho'
  | 'perdido'
  | 'sem_interesse'

export type QuoteStatus =
  | 'pendente'
  | 'em_analise'
  | 'proposta_enviada'
  | 'aprovado'
  | 'recusado'
  | 'expirado'

export type ProjectStatus =
  | 'planejamento'
  | 'medicao'
  | 'producao'
  | 'instalacao'
  | 'concluido'
  | 'pausado'
  | 'cancelado'

export type ClientType = 'pessoa_fisica' | 'condominio' | 'construtora' | 'empresa'
export type UserRole = 'admin' | 'comercial' | 'viewer'
export type InteractionType = 'note' | 'call' | 'whatsapp' | 'email' | 'visit' | 'status_change'

export interface UserProfile {
  id: string
  full_name: string
  role: UserRole
  phone: string | null
  avatar_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  type: ClientType
  name: string
  document: string | null
  email: string | null
  phone: string
  phone_alt: string | null
  address: string | null
  city: string | null
  state: string
  cep: string | null
  notes: string | null
  portal_user_id: string | null
  portal_enabled: boolean
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  client_id: string | null
  name: string
  phone: string
  email: string | null
  client_type: ClientType
  service: ServiceType | null
  source: string
  message: string | null
  status: LeadStatus
  company: string | null
  city: string | null
  notes: string | null
  assigned_to: string | null
  converted_at: string | null
  lost_reason: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  created_at: string
  updated_at: string
  assigned_user?: Pick<UserProfile, 'id' | 'full_name'>
}

export interface LeadInteraction {
  id: string
  lead_id: string
  author_id: string | null
  type: InteractionType
  content: string
  metadata: Record<string, unknown>
  created_at: string
  author?: Pick<UserProfile, 'id' | 'full_name' | 'avatar_url'>
}

export interface QuoteSpecs {
  portoes?: { width: string; height: string; material: string; has_motor: boolean }
  grades_e_cercas?: { width: string; height: string; style: string }
  escadas?: { width: string; steps: number; style: string }
  corrimoes?: { length: string; material: string }
  estruturas_metalicas?: { area: string; type: string }
  sob_medida?: { description: string }
}

export interface Quote {
  id: string
  lead_id: string | null
  client_id: string | null
  name: string
  phone: string
  email: string | null
  service: ServiceType
  description: string | null
  specs: QuoteSpecs
  address: string | null
  city: string | null
  reference_images: string[]
  estimated_value: number | null
  final_value: number | null
  status: QuoteStatus
  assigned_to: string | null
  valid_until: string | null
  notes: string | null
  proposal_url: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  quote_id: string | null
  client_id: string
  name: string
  description: string | null
  service: ServiceType
  status: ProjectStatus
  start_date: string | null
  estimated_end: string | null
  actual_end: string | null
  contract_value: number
  amount_paid: number
  assigned_to: string | null
  address: string | null
  city: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
  client?: Pick<Client, 'id' | 'name' | 'phone' | 'type'>
  milestones?: ProjectMilestone[]
}

export interface ProjectMilestone {
  id: string
  project_id: string
  title: string
  description: string | null
  due_date: string | null
  completed_at: string | null
  sort_order: number
  created_at: string
}

export interface PortfolioItem {
  id: string
  project_id: string | null
  slug: string
  title: string
  short_desc: string | null
  description: string | null
  service: ServiceType
  client_name: string | null
  city: string | null
  year: number | null
  featured: boolean
  published: boolean
  cover_image: string
  images: string[]
  seo_title: string | null
  seo_description: string | null
  sort_order: number
  view_count: number
  created_at: string
  updated_at: string
}

export interface ServiceFeature {
  title: string
  description: string
  icon: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface Service {
  id: string
  slug: ServiceType
  name: string
  tagline: string | null
  description: string | null
  hero_image: string | null
  features: ServiceFeature[]
  faq: ServiceFaq[]
  seo_title: string | null
  seo_description: string | null
  sort_order: number
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_role: string | null
  content: string
  rating: number
  service: ServiceType | null
  avatar_url: string | null
  published: boolean
  sort_order: number
  created_at: string
}

export interface SiteSettings {
  company_name: string
  company_phone: string
  whatsapp_number: string
  company_email: string
  company_address: string
  company_tagline: string
  google_maps_url: string
  social_instagram: string
  social_facebook: string
  hero_video_url: string | null
}

export interface QuoteSubmitPayload {
  services: ServiceType[]
  specs: QuoteSpecs
  description?: string
  reference_image_paths?: string[]
  name: string
  phone: string
  email?: string
  cep: string
  address: string
  city: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
}

export interface DashboardMetrics {
  leads_today: number
  leads_this_month: number
  leads_prev_month: number
  leads_by_status: Array<{ status: LeadStatus; count: number }>
  leads_by_service: Array<{ service: ServiceType; count: number }>
  leads_30d: Array<{ date: string; count: number }>
  recent_leads: Lead[]
  open_quotes: number
  active_projects: number
  revenue_this_month: number
  revenue_ytd: number
  conversion_rate: number
  avg_ticket: number
  stale_leads: number
  unassigned_leads: number
  stale_lead_days: number
}
