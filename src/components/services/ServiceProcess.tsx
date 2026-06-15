'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { COLORS, TYPOGRAPHY } from '@/components/ui/design-system'
import { springEase } from '@/lib/animations'

const DEFAULT_STEPS = [
  {
    title: 'Visita Técnica',
    description: 'Nosso engenheiro visita o local para medir, avaliar condições estruturais e entender as necessidades do projeto.',
  },
  {
    title: 'Projeto e Orçamento',
    description: 'Elaboramos o projeto técnico detalhado com memorial descritivo e orçamento fixo — sem surpresas no final.',
  },
  {
    title: 'Fabricação',
    description: 'Produção em nossa oficina com aço de primeira linha, solda certificada e tratamento anticorrosivo.',
  },
  {
    title: 'Instalação',
    description: 'Nossa equipe realiza a montagem no local com equipamentos adequados, sem danificar a obra.',
  },
  {
    title: 'Acabamento e Entrega',
    description: 'Pintura eletrostática ou galvanização, limpeza do canteiro e entrega com garantia por escrito.',
  },
]

interface Step {
  title: string
  description: string
}

interface Props {
  steps?: Step[]
}

function StepList({
  steps,
  inView,
  activeStep,
  mobile = false,
}: {
  steps: Step[]
  inView: boolean
  activeStep: number
  mobile?: boolean
}) {
  return (
    <div style={{ position: 'relative' }}>
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '52px 1fr' : '64px 1fr',
              gap: mobile ? '1rem' : '1.5rem',
              alignItems: 'start',
              padding: mobile ? '1.5rem 0' : '1.75rem 0',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              position: 'relative',
            }}
          >
            {/* Barra lateral ativa — só desktop (mobile não tem margem negativa) */}
            {!mobile && (
              <div style={{
                position: 'absolute',
                left: '-1.5rem',
                top: 0,
                bottom: 0,
                width: '2px',
                background: i === activeStep ? COLORS.brand.orange : 'transparent',
                transition: 'background 0.3s',
              }} />
            )}

            {/* Número */}
            <div style={{ paddingTop: '2px' }}>
              <div style={{
                fontFamily: TYPOGRAPHY.families.heading,
                fontWeight: 900,
                fontSize: mobile ? 'clamp(2rem, 8vw, 2.75rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
                lineHeight: 1,
                color: i === activeStep ? COLORS.brand.orange : 'rgba(0,0,0,0.1)',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Conteúdo */}
            <div style={{ paddingTop: '0.4rem' }}>
              <h3 style={{
                fontFamily: TYPOGRAPHY.families.heading,
                fontWeight: 700,
                fontSize: mobile ? 'clamp(1.05rem, 4vw, 1.25rem)' : 'clamp(1.1rem, 2vw, 1.35rem)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: '#1e2328',
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: mobile ? '15px' : '15px',
                lineHeight: 1.75,
                color: '#5a6a7a',
                margin: 0,
              }}>
                {step.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />
    </div>
  )
}

export default function ServiceProcess({ steps = DEFAULT_STEPS }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#f7f5f2', borderTop: '1px solid rgba(0,0,0,0.05)' }}
    >

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-36">

        {/* ── Mobile header: centrado com badge inline ── */}
        <motion.div
          className="lg:hidden"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: springEase }}
        >
          <p style={{
            fontFamily: TYPOGRAPHY.families.mono,
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: COLORS.brand.orange,
            marginBottom: '1rem',
          }}>
            Como trabalhamos
          </p>

          <h2 style={{
            fontFamily: TYPOGRAPHY.families.heading,
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 11vw, 4.5rem)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            color: '#1e2328',
            margin: '0 0 1.25rem',
          }}>
            Do projeto<br />
            <span style={{ color: COLORS.brand.orange }}>à entrega</span>
          </h2>

          {/* Badge + subtext em linha */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1rem',
              border: '1px solid rgba(249,115,22,0.3)',
              borderRadius: '4px',
              background: 'rgba(249,115,22,0.06)',
            }}>
              <span style={{
                fontFamily: TYPOGRAPHY.families.heading,
                fontWeight: 900,
                fontSize: '1.75rem',
                lineHeight: 1,
                color: COLORS.brand.orange,
              }}>
                {String(steps.length).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: TYPOGRAPHY.families.mono,
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8a9aaa',
                lineHeight: 1.3,
                textAlign: 'left',
              }}>
                etapas<br />controladas
              </span>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#5a6a7a',
              margin: 0,
              textAlign: 'left',
              maxWidth: '22ch',
            }}>
              Cada etapa documentada e comunicada. Sem improvisos.
            </p>
          </div>
        </motion.div>

        {/* ── Desktop layout: 2 colunas ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-24">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <p style={{
              fontFamily: TYPOGRAPHY.families.mono,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.brand.orange,
              marginBottom: '1.5rem',
            }}>
              Como trabalhamos
            </p>

            <h2 style={{
              fontFamily: TYPOGRAPHY.families.heading,
              fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              color: '#1e2328',
              margin: 0,
            }}>
              Do projeto<br />
              <span style={{ color: COLORS.brand.orange }}>à entrega</span>
            </h2>

            <p style={{
              marginTop: '2rem',
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#5a6a7a',
              maxWidth: '30ch',
            }}>
              Cada etapa é documentada e comunicada ao cliente. Sem improvisos.
            </p>

            <div style={{
              marginTop: '3rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 1.25rem',
              border: '1px solid rgba(249,115,22,0.25)',
              borderRadius: '4px',
              background: 'rgba(249,115,22,0.06)',
            }}>
              <span style={{
                fontFamily: TYPOGRAPHY.families.heading,
                fontWeight: 900,
                fontSize: '2rem',
                lineHeight: 1,
                color: COLORS.brand.orange,
              }}>
                {String(steps.length).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: TYPOGRAPHY.families.mono,
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8a9aaa',
                lineHeight: 1.3,
              }}>
                etapas<br />controladas
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <StepList steps={steps} inView={inView} activeStep={activeStep} />
          </div>
        </div>

        {/* ── Mobile steps ── */}
        <div className="lg:hidden">
          <StepList steps={steps} inView={inView} activeStep={activeStep} mobile />
        </div>

      </div>
    </section>
  )
}
