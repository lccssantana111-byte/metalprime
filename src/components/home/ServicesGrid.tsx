'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PHOTOS } from '@/lib/images'

const SERVICES = [
  {
    id: 'portoes',
    num: '01',
    label: 'Portões',
    desc: 'Automático, manual ou de correr — instalado com ART',
    image: PHOTOS.services.portoes,
    href: '/servicos/portoes',
  },
  {
    id: 'grades',
    num: '02',
    label: 'Grades e Cercas',
    desc: 'Segurança perimetral com design industrial',
    image: PHOTOS.services.grades_e_cercas,
    href: '/servicos/grades-e-cercas',
  },
  {
    id: 'escadas',
    num: '03',
    label: 'Escadas Metálicas',
    desc: 'Retas, helicoidais e flutuantes — projeto estrutural incluso',
    image: PHOTOS.services.escadas,
    href: '/servicos/escadas',
  },
  {
    id: 'corrimoes',
    num: '04',
    label: 'Corrimões',
    desc: 'Inox, ferro e alumínio — conformidade ABNT inclusa',
    image: PHOTOS.services.corrimoes,
    href: '/servicos/corrimoes',
  },
  {
    id: 'estruturas',
    num: '05',
    label: 'Estruturas Metálicas',
    desc: 'Galpões, coberturas e mezaninos — fabricação própria',
    image: PHOTOS.services.estruturas_metalicas,
    href: '/servicos/estruturas-metalicas',
  },
  {
    id: 'sob_medida',
    num: '06',
    label: 'Sob Medida',
    desc: 'Do conceito à instalação — qualquer metal',
    image: PHOTOS.services.sob_medida,
    href: '/servicos/sob-medida',
  },
]

export default function ServicesGrid() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{ background: '#0f172a', colorScheme: 'dark', padding: '7rem 0', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 3rem)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#f97316', display: 'block', marginBottom: '1.25rem' }}>
              O que fazemos
            </span>
            <h2 style={{ fontFamily: 'var(--font-barlow-condensed)', fontWeight: 900, fontSize: 'clamp(3rem, 5vw, 4.5rem)', textTransform: 'uppercase', color: 'white', lineHeight: 0.88, letterSpacing: '0.01em', margin: 0 }}>
              Cada obra,<br />uma <span style={{ color: '#f97316' }}>especialidade</span>.
            </h2>
          </div>
          <Link
            href="/servicos"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.6)' }}
          >
            Ver todos os serviços
            <ArrowUpRight style={{ width: '13px', height: '13px' }} />
          </Link>
        </motion.div>

        {/* Grid: list + image */}
        <div className="sg-grid" style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'start' }}>

          {/* Left: service list */}
          <div>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  onMouseEnter={() => setActive(i)}
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    padding: '1.5rem 0',
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: active === i ? '#f97316' : 'rgba(255,255,255,0.18)',
                    transition: 'color 0.28s',
                    minWidth: 24,
                    flexShrink: 0,
                  }}>
                    {svc.num}
                  </span>

                  {/* Label + desc */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-barlow-condensed)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      color: active === i ? 'white' : 'rgba(255,255,255,0.38)',
                      transition: 'color 0.28s',
                      margin: 0,
                      lineHeight: 1,
                    }}>
                      {svc.label}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      lineHeight: 1.5,
                      color: active === i ? 'rgba(148,163,184,0.7)' : 'rgba(148,163,184,0.2)',
                      transition: 'color 0.28s',
                      margin: '5px 0 0',
                    }}>
                      {svc.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <Link href={svc.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: `1px solid ${active === i ? 'rgba(249,115,22,0.45)' : 'rgba(255,255,255,0.1)'}`,
                      background: active === i ? 'rgba(249,115,22,0.1)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: active === i ? '#f97316' : 'rgba(255,255,255,0.18)',
                      transition: 'all 0.28s',
                    }}>
                      <ArrowUpRight style={{ width: 14, height: 14 }} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
          </div>

          {/* Right: sticky image panel */}
          <div className="sg-img-panel" style={{ position: 'sticky', top: '5rem' }}>
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', aspectRatio: '3/4', background: '#1e293b' }}>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={SERVICES[active].image}
                  alt={SERVICES[active].label}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.1) 50%, transparent 100%)' }} />

              {/* Label */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#f97316', display: 'block', marginBottom: '6px' }}>
                      {SERVICES[active].num}
                    </span>
                    <p style={{ fontFamily: 'var(--font-barlow-condensed)', fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: 'white', margin: 0, lineHeight: 1 }}>
                      {SERVICES[active].label}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Orange accent line at top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #f97316, #fb923c 60%, transparent)' }} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .sg-grid {
          grid-template-columns: 1fr 360px;
        }
        @media (max-width: 900px) {
          .sg-grid {
            grid-template-columns: 1fr !important;
          }
          .sg-img-panel {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
