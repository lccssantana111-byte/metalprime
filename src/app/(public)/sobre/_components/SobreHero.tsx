'use client'

import { motion } from 'framer-motion'

const up = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const stats = [
  { value: '+20 Anos', label: 'De mercado' },
  { value: '+5.000', label: 'Obras entregues' },
  { value: '+500', label: 'Condomínios' },
  { value: '100%', label: 'Com ART' },
]

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
        src="/Futuristic Structure Design.png"
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

          {/* Stats */}
          <motion.div
            variants={up}
            style={{
              display: 'flex',
              gap: '0',
              flexWrap: 'wrap',
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  paddingRight: i < stats.length - 1 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0',
                  marginRight: i < stats.length - 1 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  lineHeight: 1,
                  color: '#ffffff',
                  marginBottom: '4px',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  whiteSpace: 'nowrap',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
