'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { ClipboardList, FileText, Factory, HardHat } from 'lucide-react'

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Consulta Técnica',
    description: 'Nosso engenheiro vai até você, tira medidas, entende o projeto. Gratuito, sem compromisso e sem pressão para fechar na hora.',
    icon: ClipboardList,
    tag: 'Gratuita',
    code: 'ETAPA-01 / VISITA',
  },
  {
    id: 2,
    number: '02',
    title: 'Proposta em 48h',
    description: 'Proposta com valor fixo, cronograma detalhado e memorial descritivo. Sem letra miúda — o que está escrito é o que você paga.',
    icon: FileText,
    tag: '48 Horas',
    code: 'ETAPA-02 / ORÇAMENTO',
  },
  {
    id: 3,
    number: '03',
    title: 'Fabricação Industrial',
    description: 'Produzimos em oficina própria, sem terceirizar. Aço certificado, solda rastreável e inspeção em cada etapa — nada sai da fábrica fora do padrão.',
    icon: Factory,
    tag: 'ISO 9001',
    code: 'ETAPA-03 / PRODUÇÃO',
  },
  {
    id: 4,
    number: '04',
    title: 'Instalação com ART',
    description: 'Nossa equipe instala no prazo acordado em contrato. ART do engenheiro responsável entregue em 100% dos projetos estruturais — sem exceção.',
    icon: HardHat,
    tag: 'ART Inclusa',
    code: 'ETAPA-04 / ENTREGA',
  },
]

function StepRow({
  step,
  index,
  smooth,
}: {
  step: (typeof steps)[0]
  index: number
  smooth: MotionValue<number>
}) {
  const segProgress = useTransform(smooth, [index / 4, (index + 1) / 4], [0, 1])
  const Icon = step.icon
  const isLast = index === 3

  return (
    <div
      className="process-step-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 48px minmax(0,1.6fr)',
        padding: 'clamp(3.5rem, 5vw, 5rem) 0',
        borderBottom: isLast ? 'none' : '1px solid rgba(15,23,42,0.08)',
        position: 'relative',
      }}
    >
      {/* LEFT: Giant number */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
        <motion.span
          className="process-step-number"
          style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontWeight: 900,
            fontSize: 'clamp(5rem, 16vw, 14rem)',
            lineHeight: 1,
            color: '#f97316',
            userSelect: 'none',
            display: 'block',
            letterSpacing: '-0.03em',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
        >
          {step.number}
        </motion.span>
      </div>

      {/* CENTER: Vertical timeline segment */}
      <div
        className="process-timeline-center"
        style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        {/* Ghost track */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '50%', marginLeft: '-1px',
          width: '1px',
          background: 'rgba(249,115,22,0.15)',
        }} />
        {/* Animated progress bar */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '50%', marginLeft: '-1px',
          width: '2px',
          overflow: 'hidden',
        }}>
          <motion.div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, #f97316, #fb923c)',
            scaleY: segProgress,
            transformOrigin: 'top center',
            willChange: 'transform',
          }} />
        </div>
        {/* Dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: 'clamp(3.5rem, 5vw, 5rem)',
            left: '50%',
            marginLeft: '-6px',
            marginTop: '-6px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#f97316',
            border: '2px solid #f4f4f0',
            boxShadow: '0 0 0 1px rgba(249,115,22,0.35)',
            zIndex: 2,
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 + 0.05 }}
        />
      </div>

      {/* RIGHT: Content block */}
      <motion.div
        className="process-step-content"
        style={{ paddingLeft: 'clamp(1.5rem, 3vw, 3rem)' }}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 + 0.1 }}
      >
        {/* Technical code ID */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(100,116,139,0.6)',
          marginBottom: '1.1rem',
        }}>
          [ {step.code} ]
        </div>

        {/* Tag + Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <span style={{
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#f97316',
            border: '1px solid rgba(249,115,22,0.35)',
            padding: '3px 10px',
          }}>
            {step.tag}
          </span>
          <div style={{
            width: '30px',
            height: '30px',
            border: '1px solid rgba(249,115,22,0.25)',
            background: 'rgba(249,115,22,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316',
          }}>
            <Icon size={14} strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-barlow-condensed)',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
          color: '#0f172a',
          margin: '0 0 0.875rem',
          lineHeight: 1.05,
        }}>
          {step.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.125rem, 1.6vw, 1.35rem)',
          lineHeight: 1.8,
          color: '#475569',
          margin: 0,
          maxWidth: '44ch',
        }}>
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  })

  return (
    <section style={{ background: '#f4f4f0', position: 'relative', overflow: 'hidden' }}>

      {/* Dot grid — orange dots on light paper */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.22) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        backgroundPosition: '16px 16px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
      }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2rem, 3vw, 3rem)' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#f97316',
            display: 'block',
            marginBottom: '1rem',
          }}>
            Nosso processo
          </span>
          <h2 style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 0.92,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: '#0f172a',
            margin: 0,
          }}>
            Quatro etapas.{' '}
            <span style={{ color: '#f97316' }}>Zero improviso.</span>
          </h2>
        </motion.div>

        {/* Top rule */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(15,23,42,0.1)' }} />

        {/* Steps timeline */}
        <div ref={sectionRef}>
          {steps.map((step, i) => (
            <StepRow key={step.id} step={step} index={i} smooth={smooth} />
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(15,23,42,0.1)' }} />

      </div>

      <style>{`
        @media (max-width: 640px) {
          .process-step-row {
            grid-template-columns: 1fr !important;
          }
          .process-step-number {
            font-size: clamp(5rem, 22vw, 8rem) !important;
          }
          .process-timeline-center {
            display: none !important;
          }
          .process-step-content {
            padding-left: 0 !important;
            padding-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}
