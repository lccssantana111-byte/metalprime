import { createClient } from '@/lib/supabase/server'
import type { Service, ServiceType } from '@/types'

export async function getAllServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
  return (data ?? []) as Service[]
}

export async function getServiceBySlug(slug: ServiceType): Promise<Service | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').eq('slug', slug).single()
  return data as Service | null
}
