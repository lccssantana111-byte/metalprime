import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants'
import ServicesCarousel from '@/components/services/ServicesCarousel'

export const metadata: Metadata = {
  title: `Serviços de Serralheria Premium | ${BRAND_NAME}`,
  description:
    'Portões, grades, escadas metálicas, corrimões, estruturas metálicas e projetos sob medida. Especialistas em serralheria de alto padrão em São Paulo.',
}

const services = [
  {
    href: '/servicos/portoes',
    name: 'Portões',
    number: '01',
    tagline: 'Automático, manual ou de correr.',
    tags: ['Ferro', 'Alumínio', 'Inox', 'Automação'],
    image: '/servicos/Residential Garage View.png',
  },
  {
    href: '/servicos/grades-e-cercas',
    name: 'Grades e Cercas',
    number: '02',
    tagline: 'Proteção sem abrir mão do design.',
    tags: ['Janelas', 'Muros', 'Perímetro', 'Guardrails'],
    image: '/servicos/servicogradesecercas.png',
  },
  {
    href: '/servicos/escadas',
    name: 'Escadas Metálicas',
    number: '03',
    tagline: 'Do reto ao helicoidal. Projeto incluso.',
    tags: ['Retas', 'Helicoidais', 'Flutuantes', 'Com vidro'],
    image: '/imagens portfolio/Blue Spiral Staircase.png',
  },
  {
    href: '/servicos/corrimoes',
    name: 'Corrimões',
    number: '04',
    tagline: 'Conformidade ABNT. Acabamento impecável.',
    tags: ['Inox', 'Ferro', 'Alumínio', 'ABNT'],
    image: '/servicos/corrimoes.png',
  },
  {
    href: '/servicos/estruturas-metalicas',
    name: 'Estruturas Metálicas',
    number: '05',
    tagline: 'ART inclusa. Fabricação própria.',
    tags: ['Galpões', 'Coberturas', 'Mezaninos', 'ART'],
    image: '/servicos/Modern Architectural Design with Aqua Wall.png',
  },
  {
    href: '/servicos/sob-medida',
    name: 'Sob Medida',
    number: '06',
    tagline: 'Sua ideia, nossa execução precisa.',
    tags: ['Projetos únicos', 'Todos os metais', 'Com arquiteto'],
    image: '/servicos/sob-medida-carousel.png',
  },
]

export default function ServicosPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section style={{
        background: '#ffffff',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container mx-auto px-4 sm:px-8">

          {/* meta strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: '#94a3b8',
            }}>
              Serviços
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
              Metalprime
            </span>
          </div>

          {/* headline + aside */}
          <div>
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
              6 especialidades.<br />
              <span style={{ color: '#f97316' }}>Um padrão.</span>
            </h1>

          </div>


        </div>

      </section>

      {/* ── Services carousel ── */}
      <div style={{ background: '#0a0f1e' }}>
        <ServicesCarousel services={services} />
      </div>

      {/* ── Bottom CTA ── */}
      <section style={{ background: '#f4f4f0', borderTop: '1px solid #e2e8f0', padding: '6rem 0' }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div
            className="servicos-cta-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase' as const,
              color: '#0f172a',
              margin: 0,
            }}>
              Tem um projeto<br />
              <span style={{ color: '#f97316' }}>fora do padrão?</span>
            </h2>

            <div>
              <p style={{
                fontSize: '15px',
                color: '#64748b',
                maxWidth: '42ch',
                margin: '0 0 2rem',
                lineHeight: 1.75,
              }}>
                Nossa especialidade são justamente os projetos complexos. Nos diga o que você precisa e montamos um orçamento sem custo.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Link
                  href="/orcamento"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.85rem 1.75rem',
                    background: '#f97316',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    transition: 'background 0.2s',
                  }}
                  className="hover:!bg-[#f97316]"
                >
                  Orçamento Gratuito
                  <ArrowUpRight style={{ width: '14px', height: '14px' }} />
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.85rem 1.75rem',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 600,
                    fontSize: '13px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  className="hover:!border-[#0f172a] hover:!text-[#0f172a]"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .servicos-cta-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
        `}</style>
      </section>

    </div>
  )
}

