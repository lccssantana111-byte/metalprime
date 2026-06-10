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

export default function SobreHero() {
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
      {/* Imagem de fundo */}
      <img
        src="/futuristic-structure.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
        }}
      />

      {/* Overlays — mesma lógica do HeroSection */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.25) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(2,6,23,0.7) 0%, transparent 50%)',
        }}
      />

      {/* Conteúdo */}
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
          style={{ maxWidth: '820px' }}
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
            Quem somos · Morumbi, SP · Desde 2004
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
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              margin: '0 0 1rem',
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
              Começamos com
            </motion.span>
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
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0.3 }}
            >
              uma oficina.
            </motion.span>
            <motion.span
              style={{
                display: 'block',
                paddingBottom: '0.28em',
                background: 'linear-gradient(90deg, #f97316 0%, #fbbf24 35%, #f97316 55%, #ea580c 80%, #f97316 100%)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.6 }}
            >
              Viramos referência.
            </motion.span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={up}
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              margin: '0 0 2.5rem',
              maxWidth: '380px',
            }}
          >
            Em 20 anos de obra feita direito,
            <br />
            construímos reputação junto com construtoras
            <br />e arquitetos que precisam de um parceiro confiável.
          </motion.p>

          {/* CTA */}
          <motion.div variants={up} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
