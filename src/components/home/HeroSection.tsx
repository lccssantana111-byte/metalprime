'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const up = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0f172a',
      }}
    >
      {/* ── Image background ── */}
      <img
        src="/Robotic Shark Humanoid.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* ── Overlays ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.45) 60%, rgba(2,6,23,0.15) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(2,6,23,0.6) 0%, transparent 50%)',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingLeft: 'clamp(2rem, 8vw, 8rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
          paddingBottom: '4rem',
          paddingTop: 'calc(clamp(1.5rem, 4vw, 4rem) + 5rem)',
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '800px' }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={up}
            style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '11px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#f97316',
              marginBottom: '1.5rem',
            }}
          >
            São Paulo · CREA-SP · Desde 2004
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={up}
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              fontSize: 'clamp(4.5rem, 8vw, 8.5rem)',
              margin: '0 0 1.75rem',
              overflow: 'visible',
            }}
          >
            <motion.span
              style={{
                display: 'block',
                marginBottom: '-0.08em',
                background: 'linear-gradient(90deg, #ffffff 0%, #94a3b8 40%, #ffffff 60%, #e2e8f0 80%, #ffffff 100%)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              Engenharia
            </motion.span>
            <motion.span
              style={{
                display: 'block',
                wordSpacing: '-0.12em',
                background: 'linear-gradient(90deg, #f97316 0%, #fbbf24 35%, #f97316 55%, #ea580c 80%, #f97316 100%)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.6 }}
            >
              em Aço.
            </motion.span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={up}
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              margin: '0 0 2.5rem',
            }}
          >
            Fabricação própria, ART em 100% dos projetos estruturais.
            Mais de 5.000 obras entregues na Grande São Paulo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={up}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <Link
              href="/orcamento"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 14px 13px 26px',
                borderRadius: '999px',
                background: '#f97316',
                color: 'white',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(249,115,22,0.4)',
                transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#ea580c'
                el.style.boxShadow = '0 8px 36px rgba(249,115,22,0.5)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#f97316'
                el.style.boxShadow = '0 4px 24px rgba(249,115,22,0.4)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Solicitar Orçamento Gratuito
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowRight style={{ width: '14px', height: '14px' }} />
              </span>
            </Link>

            <Link
              href="/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '15px 28px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.4)'
                el.style.background = 'rgba(255,255,255,0.12)'
                el.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.2)'
                el.style.background = 'rgba(255,255,255,0.06)'
                el.style.color = 'rgba(255,255,255,0.8)'
              }}
            >
              Ver Portfólio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
