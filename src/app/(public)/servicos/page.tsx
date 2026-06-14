import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BRAND_NAME, WHATSAPP_NUMBER, SITE_URL } from '@/lib/constants'
import ServicesCarousel from '@/components/services/ServicesCarousel'

export const metadata: Metadata = {
  title: `Estruturas Metálicas Industriais e Comerciais | ${BRAND_NAME}`,
  description:
    'Estruturas metálicas industriais, galpões, coberturas, escadas e portões para construtoras e empresas em São Paulo. Fabricação própria, ART inclusa, entrega no prazo.',
  alternates: { canonical: `${SITE_URL}/servicos` },
  openGraph: {
    title: `Estruturas Metálicas Industriais e Comerciais | ${BRAND_NAME}`,
    description: 'Estruturas metálicas industriais, galpões, coberturas, escadas e portões para construtoras e empresas em São Paulo. Fabricação própria, ART inclusa, entrega no prazo.',
    url: `${SITE_URL}/servicos`,
    siteName: BRAND_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: `Serviços | ${BRAND_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Estruturas Metálicas Industriais e Comerciais | ${BRAND_NAME}`,
    description: 'Galpões, coberturas, escadas, portões e projetos sob medida para construtoras e empresas em São Paulo.',
    images: [`${SITE_URL}/og-default.jpg`],
  },
}

const services = [
  {
    href: '/servicos/portoes',
    name: 'Portões',
    number: '01',
    tagline: 'Industriais, comerciais e condominiais. ART inclusa.',
    tags: ['Ferro', 'Alumínio', 'Inox', 'Automação'],
    image: '/servicos/Residential Garage View.png',
  },
  {
    href: '/servicos/grades-e-cercas',
    name: 'Grades e Cercas',
    number: '02',
    tagline: 'Segurança perimetral industrial e comercial.',
    tags: ['Janelas', 'Muros', 'Perímetro', 'Guardrails'],
    image: '/servicos/servicogradesecercas.png',
  },
  {
    href: '/servicos/escadas',
    name: 'Escadas Metálicas',
    number: '03',
    tagline: 'Estruturais, flutuantes ou helicoidais. ART inclusa.',
    tags: ['Retas', 'Helicoidais', 'Flutuantes', 'Com vidro'],
    image: '/imagens portfolio/Blue Spiral Staircase.png',
  },
  {
    href: '/servicos/corrimoes',
    name: 'Corrimões',
    number: '04',
    tagline: 'Conformidade NR e ABNT. Inox, ferro ou alumínio.',
    tags: ['Inox', 'Ferro', 'Alumínio', 'ABNT'],
    image: '/servicos/corrimoes.png',
  },
  {
    href: '/servicos/estruturas-metalicas',
    name: 'Estruturas Metálicas',
    number: '05',
    tagline: 'Galpões, coberturas e mezaninos. Equipe própria.',
    tags: ['Galpões', 'Coberturas', 'Mezaninos', 'ART'],
    image: '/servicos/Modern Architectural Design with Aqua Wall.png',
  },
  {
    href: '/servicos/sob-medida',
    name: 'Sob Medida',
    number: '06',
    tagline: 'Projeto executivo em DWG ou PDF. Executamos.',
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
              Metal Shark
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
      <section style={{ background: '#f4f4f0', borderTop: '1px solid #e2e8f0', padding: 'clamp(3rem, 7vw, 6rem) 0' }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-center text-center sm:text-left">
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
              Projeto complexo<br />
              <span style={{ color: '#f97316' }}>ou fora do padrão?</span>
            </h2>

            <div>
              <p style={{
                fontSize: '15px',
                color: '#64748b',
                maxWidth: '42ch',
                margin: '0 auto 2rem',
                lineHeight: 1.75,
              }}>
                Nossa especialidade são justamente os projetos que outros fornecedores recusam. Envie o escopo técnico e nossa equipe de engenharia retorna com uma proposta estruturada.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start" style={{ gap: '10px' }}>
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

      </section>

    </div>
  )
}

