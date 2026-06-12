import { createClient } from '@/lib/supabase/server'
import type { PortfolioItem } from '@/types'

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(6)
  return (data ?? []) as PortfolioItem[]
}

export async function getAllPortfolio(service?: string): Promise<PortfolioItem[]> {
  const supabase = await createClient()
  let query = supabase
    .from('portfolio_items')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (service && service !== 'todos') {
    query = query.eq('service', service)
  }

  const { data } = await query
  return (data ?? []) as PortfolioItem[]
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data as PortfolioItem | null
}

export async function getPortfolioSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portfolio_items')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((d) => d.slug)
}
