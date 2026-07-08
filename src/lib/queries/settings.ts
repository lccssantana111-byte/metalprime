import { unstable_cache } from 'next/cache'
import { createPublicClient } from '@/lib/supabase/public'
import { WHATSAPP_NUMBER as WHATSAPP_NUMBER_FALLBACK } from '@/lib/constants'

export const getWhatsAppNumber = unstable_cache(
  async () => {
    const supabase = createPublicClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'whatsapp_number')
      .single()
    const value = data?.value as string | undefined
    return value || WHATSAPP_NUMBER_FALLBACK
  },
  ['site-settings-whatsapp-number'],
  { tags: ['site-settings'], revalidate: 300 },
)
