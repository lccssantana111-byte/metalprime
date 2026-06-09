import type { Metadata } from 'next'
import { getAllPortfolio } from '@/lib/queries/portfolio'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { BRAND_NAME } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'
import { ZoomParallax } from '@/components/ui/zoom-parallax'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Portfólio | ${BRAND_NAME}`,
  description:
    'Conheça nossos projetos de serralheria premium: portões, escadas, grades e estruturas metálicas em São Paulo.',
}

const parallaxImages = [
  { src: PHOTOS.hero,                          alt: 'Estrutura metálica de grande porte' },
  { src: PHOTOS.services.portoes,              alt: 'Portão automático instalado' },
  { src: PHOTOS.services.escadas,              alt: 'Escada metálica moderna' },
  { src: PHOTOS.services.grades_e_cercas,      alt: 'Grades e cercas de segurança' },
  { src: PHOTOS.services.estruturas_metalicas, alt: 'Estrutura metálica industrial' },
  { src: PHOTOS.services.corrimoes,            alt: 'Corrimão em inox' },
  { src: PHOTOS.services.sob_medida,           alt: 'Projeto sob medida em metal' },
]

export default async function PortfolioPage() {
  const items = await getAllPortfolio().catch(() => [])

  return (
    <div style={{ background: '#0c1220', colorScheme: 'dark' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#0c1220',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
          borderBottom: '3px solid #f97316',
          padding: 'clamp(7rem, 14vw, 10rem) 0 clamp(4rem, 8vw, 6rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)', position: 'relative', zIndex: 1 }}>

          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '24px', height: '1px', background: '#f97316' }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase' as const,
              color: '#f97316',
            }}>
              [ PORTFÓLIO ]
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontWeight: 900,
            lineHeight: 0.9,
            fontSize: 'clamp(4.5rem, 10vw, 10rem)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.01em',
            margin: '0 0 2.5rem',
          }}>
            <span style={{ display: 'block', color: 'white' }}>OBRAS</span>
            <span style={{ display: 'block', color: 'white' }}>QUE FALAM.</span>
            <span style={{ display: 'block', color: '#f97316' }}>POR SI</span>
          </h1>

          {/* Sub-row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' as const }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(148,163,184,0.8)',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: 0,
            }}>
              Cada obra entregue no prazo, com ART e com o padrão que nossos clientes reconhecem como diferencial.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(148,163,184,0.4)',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  PROJETOS PUBLICADOS
                </span>
                <span style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  color: '#f97316',
                  lineHeight: 1,
                }}>
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZoomParallax ─────────────────────────────────────────── */}
      <div style={{ background: '#080d14' }}>
        <ZoomParallax images={parallaxImages} />
      </div>

      {/* ── Portfolio grid ───────────────────────────────────────── */}
      <section style={{
        background: '#0c1220',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
        padding: '5rem 0 7rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>

          <div style={{ marginBottom: '3.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase' as const,
              color: '#f97316',
              display: 'block',
              marginBottom: '1rem',
            }}>
              [ FILTRAR POR CATEGORIA ]
            </span>
            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              textTransform: 'uppercase' as const,
              color: 'white',
              margin: 0,
              letterSpacing: '0.02em',
            }}>
              {items.length > 0 ? (
                <>{String(items.length).padStart(2, '0')} <span style={{ color: 'rgba(148,163,184,0.3)' }}>PROJETOS</span></>
              ) : 'PORTFÓLIO'}
            </h2>
          </div>

          {items.length > 0 ? (
            <PortfolioGrid items={items} />
          ) : (
            <div style={{ textAlign: 'center', padding: '8rem 0' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '1px solid rgba(249,115,22,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <div style={{ width: '16px', height: '16px', background: 'rgba(249,115,22,0.3)', transform: 'rotate(45deg)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'white',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                Portfólio em construção
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(148,163,184,0.5)', letterSpacing: '0.1em' }}>
                Em breve novos projetos serão publicados.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
