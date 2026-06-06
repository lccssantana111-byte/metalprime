import { createAdminClient } from '@/lib/supabase/admin'
import { ConfiguracoesForm } from './ConfiguracoesForm'

export const dynamic = 'force-dynamic'

export default async function ConfiguracoesPage() {
  const supabase = createAdminClient()
  const { data: rows } = await supabase.from('site_settings').select('key, value')
  const settings = Object.fromEntries((rows ?? []).map((r: { key: string; value: string }) => [r.key, r.value]))

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Configurações</h1>
        <p className="text-metal mt-1">Informações da empresa e redes sociais</p>
      </div>
      <ConfiguracoesForm settings={settings} />
    </div>
  )
}
