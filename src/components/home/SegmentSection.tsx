'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, HardHat, Factory, CheckCircle2 } from 'lucide-react'

const segments = [
  {
    icon: Building2,
    label: 'Condomínios',
    metric: '+500',
    metricLabel: 'condomínios atendidos',
    headline: 'O parceiro que o síndico confia',
    description:
      'Portões automáticos, grades, guaritas e estruturas de segurança. Entregamos ART em todos os itens estruturais — a vistoria passa sem surpresas.',
    items: [
      'Portões automáticos com ART',
      'Grades e cercas de segurança',
      'Guaritas e coberturas',
      'Manutenção preventiva',
    ],
    href: '/orcamento',
    cta: 'Orçamento para condomínio',
  },
  {
    icon: HardHat,
    label: 'Construtoras',
    metric: '100%',
    metricLabel: 'de entrega no prazo',
    headline: 'Certificado e no cronograma — sempre',
    description:
      'Escadas, estruturas, mezaninos e guarda-corpos. Fabricação própria, sem terceirizar. ART em 100% dos projetos — a obra não para por nossa causa.',
    items: [
      'Estruturas metálicas certificadas',
      'Escadas e guarda-corpos',
      'Mezaninos e plataformas',
      'Entrega no prazo da obra',
    ],
    href: '/orcamento',
    cta: 'Orçamento para construtora',
    featured: true,
  },
  {
    icon: Factory,
    label: 'Indústrias',
    metric: '+20',
    metricLabel: 'anos de expertise',
    headline: 'Estrutura própria para grande porte',
    description:
      'Galpões, coberturas e mezaninos industriais. Projetamos, fabricamos e instalamos com equipe própria — da fundação ao acabamento.',
    items: [
      'Galpões industriais',
      'Coberturas metálicas',
      'Plataformas e mezaninos',
      'Estruturas sob medida',
    ],
    href: '/orcamento',
    cta: 'Orçamento industrial',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function SegmentSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        colorScheme: 'light',
        background: 'white',
        padding: '6rem 0 7rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 2rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#f97316',
            }}
          >
            Para quem fazemos
          </span>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.92,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: '#0f172a',
                margin: 0,
              }}
            >
              O parceiro certo<br />
              <span style={{ color: '#f97316' }}>para cada projeto</span>
            </h2>

          </div>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {segments.map((seg, i) => {
            const Icon = seg.icon
            return (
              <motion.div
                key={seg.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                  background: seg.featured ? '#0f172a' : 'white',
                  border: seg.featured ? 'none' : '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                  cursor: 'default',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: seg.featured
                    ? '0 24px 60px rgba(15,23,42,0.28)'
                    : '0 16px 48px rgba(0,0,0,0.10)',
                }}
              >
                {/* Featured orange top bar */}
                {seg.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: '#f97316',
                      borderRadius: '20px 20px 0 0',
                    }}
                  />
                )}

                {/* Icon + label */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '1.75rem',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: seg.featured ? 'rgba(249,115,22,0.15)' : '#fff7ed',
                      border: `1px solid ${seg.featured ? 'rgba(249,115,22,0.3)' : '#fed7aa'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: '18px', height: '18px', color: '#f97316' }} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: seg.featured ? '#64748b' : '#94a3b8',
                    }}
                  >
                    {seg.label}
                  </span>
                </div>

                {/* Metric */}
                <div style={{ marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '2.75rem',
                      lineHeight: 1,
                      color: '#f97316',
                    }}
                  >
                    {seg.metric}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: seg.featured ? '#475569' : '#94a3b8',
                      marginTop: '2px',
                    }}
                  >
                    {seg.metricLabel}
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: seg.featured ? '#1e293b' : '#f1f5f9',
                    marginBottom: '1.25rem',
                  }}
                />

                {/* Headline */}
                <h3
                  style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    lineHeight: 1.15,
                    color: seg.featured ? 'white' : '#0f172a',
                    marginBottom: '0.75rem',
                  }}
                >
                  {seg.headline}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.75,
                    color: '#64748b',
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                  }}
                >
                  {seg.description}
                </p>

                {/* Feature list */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {seg.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: seg.featured ? '#94a3b8' : '#475569',
                      }}
                    >
                      <CheckCircle2
                        style={{
                          width: '14px',
                          height: '14px',
                          color: '#f97316',
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={seg.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: '#f97316',
                    textDecoration: 'none',
                    marginTop: 'auto',
                    transition: 'gap 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.gap = '10px'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.gap = '6px'
                  }}
                >
                  {seg.cta}
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
