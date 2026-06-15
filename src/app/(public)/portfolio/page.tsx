import type { Metadata } from 'next'
import { getAllPortfolio } from '@/lib/queries/portfolio'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { BRAND_NAME, SITE_URL } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'
import { SectionHeading } from '@/components/ui/design-system'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Portfólio de Projetos | ${BRAND_NAME}`,
  description:
    'Portfólio de estruturas metálicas industriais e comerciais em São Paulo. Galpões, escadas estruturais, coberturas e portões entregues para construtoras e empresas. ART em 100% dos projetos.',
  alternates: { canonical: `${SITE_URL}/portfolio` },
  openGraph: {
    title: `Portfólio de Projetos | ${BRAND_NAME}`,
    description: 'Estruturas metálicas para construtoras e empresas em São Paulo. Galpões, escadas, coberturas e portões com ART em 100% dos projetos.',
    url: `${SITE_URL}/portfolio`,
    siteName: BRAND_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: `Portfólio de Projetos | ${BRAND_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Portfólio de Projetos | ${BRAND_NAME}`,
    description: 'Estruturas metálicas para construtoras e empresas em São Paulo. ART em 100% dos projetos.',
    images: [`${SITE_URL}/og-default.jpg`],
  },
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
    <div>
      {/* Hero */}
      <section style={{ background: '#ffffff', paddingTop: '7rem', paddingBottom: 'clamp(1.5rem, 4vw, 4rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="container mx-auto px-4 sm:px-8">

          {/* meta strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '1.75rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#94a3b8',
            }}>
              Portfólio
            </span>
            <span style={{ display: 'block', height: '1px', width: '2.5rem', background: '#e2e8f0' }} />
            <span style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: '#f97316',
            }}>
              Metal Shark
            </span>
          </div>

          {/* headline + body side by side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'end',
            gap: '3rem',
          }}
            className="portfolio-hero-grid"
          >
            <h1 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase' as const,
              color: '#0f172a',
              margin: 0,
            }}>
              Projetos<br />
              <span style={{ color: '#f97316' }}>executados.</span>
            </h1>

            <div style={{ paddingBottom: '0.5rem', maxWidth: '26ch' }}
              className="portfolio-hero-aside"
            >
              <p style={{
                fontSize: '14px',
                lineHeight: 1.65,
                color: '#64748b',
                margin: '0 0 1rem',
              }}>
                Cada estrutura entregue no prazo, com ART e documentação técnica completa — o padrão que construtoras e gestores industriais exigem de um fornecedor homologado.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: '#94a3b8',
                  fontFamily: 'var(--font-barlow-condensed)',
                }}>
                  São Paulo, SP
                </span>
              </div>
            </div>
          </div>

          {/* bottom rule */}
          <div style={{ marginTop: 'clamp(1rem, 3vw, 2.5rem)', height: '1px', background: '#e2e8f0' }} />

        </div>

      </section>

      {/* Zoom Parallax — visual showcase */}
      <ZoomParallax images={parallaxImages} />

      {/* Grid */}
      <section className="py-24" style={{ background: '#0f172a' }}>
        <div className="container mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <SectionHeading size="medium" light>
              {items.length > 0 ? `${items.length} projetos` : 'Portfólio'}
            </SectionHeading>
          </div>

          {items.length > 0 ? (
            <PortfolioGrid items={items} />
          ) : (
            <div className="py-32 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border"
                style={{ borderColor: '#e2e8f0', background: 'white' }}
              >
                <div
                  className="w-6 h-6 rotate-45 rounded-sm"
                  style={{ background: '#e2e8f0' }}
                />
              </div>
              <SectionHeading as="h2" size="medium" style={{ marginBottom: '0.75rem' }}>
                Portfólio em construção
              </SectionHeading>
              <p style={{ color: '#64748b' }}>Em breve novos projetos serão publicados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
