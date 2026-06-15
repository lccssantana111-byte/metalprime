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
    metricLabel: 'condomínios e edifícios atendidos',
    headline: 'O parceiro que o síndico e o gestor confiam',
    description:
      'Portões automáticos, grades de segurança, guaritas e coberturas. ART em todas as estruturas — a vistoria da AVCB e do Corpo de Bombeiros não para por nossa causa.',
    items: [
      'Portões automáticos com ART inclusa',
      'Grades e cercas de segurança perimetral',
      'Guaritas e coberturas certificadas',
      'Contratos de manutenção preventiva',
    ],
    href: '/orcamento',
    cta: 'Orçamento para condomínio',
  },
  {
    icon: HardHat,
    label: 'Construtoras',
    metric: '100%',
    metricLabel: 'entregas dentro do cronograma',
    headline: 'No prazo. Sem surpresas.',
    description:
      'Escadas, estruturas, mezaninos e guarda-corpos para empreendimentos residenciais e comerciais. Fabricação própria — nenhuma etapa é terceirizada. A obra não para por nossa causa.',
    items: [
      'Estruturas metálicas com ART do estrutural',
      'Escadas, guarda-corpos e mezaninos',
      'Fornecimento compatível com cronograma de obra',
      'Memorial descritivo e documentação técnica',
    ],
    href: '/orcamento',
    cta: 'Orçamento para construtora',
    featured: true,
  },
  {
    icon: Factory,
    label: 'Indústrias',
    metric: '+20',
    metricLabel: 'anos em projetos industriais',
    headline: 'Estrutura própria para projetos de grande porte',
    description:
      'Galpões, coberturas metálicas, mezaninos e plataformas industriais. Equipe própria de engenheiros e montadores — da fundação ao comissionamento.',
    items: [
      'Galpões industriais steel frame e pré-moldado',
      'Coberturas metálicas e shed',
      'Plataformas, mezaninos e passarelas',
      'NR-18 e NR-35 em toda a montagem',
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
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#f97316',
            }}
          >
            Segmentos atendidos
          </span>

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
            Soluções técnicas<br />
            <span style={{ color: '#f97316' }}>para cada segmento</span>
          </h2>
        </motion.div>

        {/* Dark tray — anchors the cards into a unified composition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#0f172a',
            borderRadius: '24px',
            padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle dot grid inside tray */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }} />

          {/* Orange ambient glow — top center */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '220px',
            background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              position: 'relative',
              zIndex: 1,
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
                    background: seg.featured ? 'rgba(249,115,22,0.07)' : 'rgba(255,255,255,0.03)',
                    border: seg.featured ? '1px solid rgba(249,115,22,0.22)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                    cursor: 'default',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow: seg.featured
                      ? '0 20px 50px rgba(249,115,22,0.14)'
                      : '0 16px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Featured orange top line */}
                  {seg.featured && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '10%',
                      right: '10%',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.8), transparent)',
                    }} />
                  )}

                  {/* ── Zone 1: Icon + label (fixed height) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', height: '40px', marginBottom: '1.25rem', flexShrink: 0, width: '100%' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(249,115,22,0.12)',
                      border: '1px solid rgba(249,115,22,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon style={{ width: '18px', height: '18px', color: '#f97316' }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.75)',
                    }}>
                      {seg.label}
                    </span>
                  </div>

                  {/* ── Zone 2: Metric (auto height) */}
                  <div style={{ marginBottom: '0.875rem', flexShrink: 0, width: '100%', textAlign: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '2.5rem',
                      lineHeight: 1,
                      color: '#f97316',
                    }}>
                      {seg.metric}
                    </span>
                    <span style={{
                      display: 'block',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '4px',
                    }}>
                      {seg.metricLabel}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1rem', flexShrink: 0 }} />

                  {/* ── Zone 3: Headline */}
                  <h3 style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 700,
                    fontSize: '1.45rem',
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    lineHeight: 1.15,
                    color: seg.featured ? '#ffffff' : 'rgba(255,255,255,0.85)',
                    marginBottom: '1rem',
                    flexShrink: 0,
                  }}>
                    {seg.headline}
                  </h3>

                  {/* ── Zone 4: Description */}
                  <p style={{
                    fontSize: '13.5px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.68)',
                    marginBottom: '1.25rem',
                  }}>
                    {seg.description}
                  </p>

                  {/* ── Zone 5: Feature list (fixed) */}
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px',
                    flexShrink: 0,
                  }}>
                    {seg.items.map((item) => (
                      <li key={item} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.72)',
                      }}>
                        <CheckCircle2 style={{ width: '14px', height: '14px', color: '#f97316', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* ── Zone 6: CTA (pinned to bottom) */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1rem', flexShrink: 0 }} />
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
                      flexShrink: 0,
                      transition: 'gap 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '6px' }}
                  >
                    {seg.cta}
                    <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
