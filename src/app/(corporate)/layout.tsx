import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

export default async function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#080c14',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>

      {/* Dot grid background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {user && (
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(8,12,20,0.90)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.7) 30%, rgba(249,115,22,0.7) 70%, transparent 100%)',
          }} />

          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2rem)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <Link href="/corporate/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  src="/logo.png"
                  alt="Metalprime"
                  width={26}
                  height={26}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '3px' }}>
                <span style={{
                  fontFamily: 'var(--font-display, var(--font-sans))',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}>
                  {BRAND_NAME.split(' ')[0]}<span style={{ color: '#f97316' }}>.</span>
                </span>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  fontFamily: 'var(--font-mono, monospace)',
                }}>
                  Portal
                </span>
              </div>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <span style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
                display: 'none',
              }} className="corporate-email">
                {user.email}
              </span>
              <form action="/api/auth/signout" method="post" style={{ flexShrink: 0 }}>
                <button
                  type="submit"
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.8)',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
          <style>{`
            @media (min-width: 480px) {
              .corporate-email { display: block !important; }
            }
          `}</style>
        </header>
      )}

      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3rem) 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {children}
      </main>
    </div>
  )
}
