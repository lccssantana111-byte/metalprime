'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function ContatoHero() {
  return (
    <section
      style={{
        background: '#0c1220',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height, 80px) + 3rem)',
        paddingBottom: '4rem',
      }}
    >
      {/* Background photo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/Contemplative Construction Worker in Urban Setting.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          pointerEvents: 'none',
        }}
      />
      {/* Dark overlay to keep text legible */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(12,18,32,0.88) 0%, rgba(12,18,32,0.72) 55%, rgba(12,18,32,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Orange glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem, 4vw, 2rem)',
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}>
        <div>
          {/* Left — text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-ibm-mono)',
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#f97316',
                marginBottom: '1.5rem',
              }}
            >
              Fale Conosco
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
                margin: '0 0 1.5rem',
              }}
            >
              <motion.span
                style={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #ffffff 0%, #94a3b8 40%, #ffffff 60%, #e2e8f0 80%, #ffffff 100%)',
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                Fale com um
              </motion.span>
              <motion.span
                style={{
                  display: 'block',
                  paddingBottom: '0.28em',
                  background: 'linear-gradient(90deg, #f97316 0%, #fbbf24 35%, #f97316 55%, #ea580c 80%, #f97316 100%)',
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.6 }}
              >
                Engenheiro.
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7,
                maxWidth: '440px',
                margin: '0 0 2.5rem',
              }}
            >
              Nossa equipe responde em até 24h nos dias úteis. Para agilizar, fale direto pelo WhatsApp - resposta imediata.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="#contato-form"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '0.75rem 1.5rem',
                  background: '#f97316',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'background 0.2s ease, gap 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#ea580c'
                  ;(e.currentTarget as HTMLElement).style.gap = '18px'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#f97316'
                  ;(e.currentTarget as HTMLElement).style.gap = '12px'
                }}
              >
                Ir para o formulário
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
