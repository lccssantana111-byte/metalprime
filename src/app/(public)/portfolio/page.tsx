import type { Metadata } from 'next'
import { getAllPortfolio } from '@/lib/queries/portfolio'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { BRAND_NAME } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'

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
    <div>
      {/* Hero */}
      <section className="pt-36 pb-28 bg-white relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px" style={{ background: '#f97316' }} />
            <span
              className="font-mono text-[10px] tracking-[0.4em] uppercase"
              style={{ color: '#94a3b8' }}
            >
              Nossos projetos
            </span>
          </div>

          <h1
            className="font-display font-black leading-[0.9] mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              letterSpacing: '-0.03em',
              color: '#0f172a',
            }}
          >
            Projetos{' '}
            <span style={{ color: '#f97316' }}>
              executados.
            </span>
          </h1>

          <p
            className="max-w-lg leading-relaxed"
            style={{ fontSize: '1.1rem', color: '#64748b' }}
          >
            Cada obra foi entregue no prazo, com ART e com o padrão que nossos
            clientes reconhecem como diferencial.
          </p>
        </div>
      </section>

      {/* Zoom Parallax — visual showcase */}
      <ZoomParallax images={parallaxImages} />

      {/* Grid */}
      <section className="py-24" style={{ background: '#f8fafc' }}>
        <div className="container mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <span
              className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4"
              style={{ color: '#94a3b8' }}
            >
              Filtrar por categoria
            </span>
            <h2
              className="font-display font-black"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#0f172a', letterSpacing: '-0.02em' }}
            >
              {items.length > 0 ? `${items.length} projetos` : 'Portfólio'}
            </h2>
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
              <h2
                className="font-display font-bold text-2xl mb-3"
                style={{ color: '#0f172a' }}
              >
                Portfólio em construção
              </h2>
              <p style={{ color: '#64748b' }}>Em breve novos projetos serão publicados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
