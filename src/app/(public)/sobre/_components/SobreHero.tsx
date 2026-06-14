'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { CTAButton } from '@/components/ui/design-system'

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
        fetchPriority="high"
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
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '820px' }}
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
            Quem somos · Morumbi, SP · Desde 2004
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
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
            variants={fadeUp}
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.7,
              margin: '0 0 2.5rem',
              maxWidth: '480px',
            }}
          >
            20 anos sendo fornecedor homologado de construtoras, incorporadoras e gestores industriais que exigem documentação técnica completa e entrega no cronograma.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <CTAButton
              variant="primary"
              href="/orcamento"
              iconCircle
              icon={<ArrowRight style={{ width: '14px', height: '14px' }} />}
            >
              Solicitar Orçamento Gratuito
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
