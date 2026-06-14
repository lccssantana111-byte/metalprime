import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { BRAND_NAME, COMPANY_TAGLINE } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? BRAND_NAME
  const type = searchParams.get('type') ?? 'default'
  const subtitle = searchParams.get('subtitle') ?? COMPANY_TAGLINE

  const typeLabels: Record<string, string> = {
    service: 'Serviço',
    portfolio: 'Portfólio',
    default: 'Engenharia Metálica',
  }

  const response = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #0A0C0F 0%, #1C2B3A 60%, #0A0C0F 100%)',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative amber line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#C8860A',
          }}
        />
        {/* Type badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(200, 134, 10, 0.15)',
            border: '1px solid rgba(200, 134, 10, 0.4)',
            borderRadius: '8px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}
        >
          <span style={{ color: '#C8860A', fontSize: '14px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {typeLabels[type] ?? typeLabels.default}
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: title.length > 30 ? '52px' : '64px',
            fontWeight: '800',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '16px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: '#8C97A0',
            marginBottom: '48px',
            maxWidth: '700px',
          }}
        >
          {subtitle}
        </div>

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#C8860A',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#0A0C0F', fontSize: '20px', fontWeight: '900' }}>M</span>
          </div>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>{BRAND_NAME}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
  response.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  return response
}
