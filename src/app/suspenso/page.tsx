import { createPublicClient } from '@/lib/supabase/public'

export const dynamic = 'force-dynamic'

export default async function SitePausedPage() {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'site_locked_message')
    .single()

  const message = (data?.value as string) || 'Site temporariamente indisponível. Para mais informações, entre em contato com a nossa equipe.'

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0f1a',
      padding: '1.5rem',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>
      <div style={{ maxWidth: '440px', textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.1)',
          border: '1px solid rgba(249,115,22,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '20px',
        }}>
          ⏸
        </div>
        <h1 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.92)',
          margin: '0 0 10px',
          letterSpacing: '-0.01em',
        }}>
          Indisponível no momento
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          {message}
        </p>
      </div>
    </div>
  )
}
