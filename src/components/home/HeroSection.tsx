'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ROTATING_WORDS = ['Portões', 'Escadas', 'Grades', 'Estruturas', 'Corrimões']

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-block relative h-[1.1em] overflow-hidden align-bottom min-w-[280px] sm:min-w-[360px] lg:min-w-[460px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-amber-brand via-amber-light to-amber-brand"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-carbon">

      {/* Diagonal striped background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #8c97a0 0px, #8c97a0 1px, transparent 0px, transparent 60px)',
        }}
      />

      {/* Large vertical rule lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-metal-dark/20 to-transparent" />
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-amber-brand/15 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-amber-brand/10 via-transparent to-transparent" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-[20%] w-[500px] h-[500px] rounded-full bg-steel/20 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-amber-brand/8 blur-[140px] pointer-events-none" />

      {/* Corner bracket decoration */}
      <div className="absolute top-28 left-8 sm:left-16 w-16 h-16 pointer-events-none">
        <div className="absolute top-0 left-0 w-6 h-px bg-amber-brand/50" />
        <div className="absolute top-0 left-0 w-px h-6 bg-amber-brand/50" />
      </div>
      <div className="absolute top-28 right-8 sm:right-16 w-16 h-16 pointer-events-none">
        <div className="absolute top-0 right-0 w-6 h-px bg-amber-brand/50" />
        <div className="absolute top-0 right-0 w-px h-6 bg-amber-brand/50" />
      </div>

      {/* Large background number */}
      <motion.div
        style={{ y }}
        className="absolute right-[-2rem] sm:right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none"
      >
        <span
          className="font-display font-black text-[22vw] leading-none text-transparent"
          style={{ WebkitTextStroke: '1px rgba(140,151,160,0.06)' }}
        >
          20+
        </span>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 sm:px-8 pt-32 pb-24">
        <div className="max-w-5xl">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-amber-brand" />
              <div className="w-2 h-2 bg-amber-brand rotate-45 shrink-0" />
            </div>
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
              Serralheria Premium · São Paulo
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-display font-black leading-[0.9] text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] text-white"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            >
              Aço com
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-display font-black leading-[0.9] text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] text-white"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
            >
              <RotatingWord />
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              className="font-display font-black leading-[0.9] text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] text-white/20"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.41, ease: [0.76, 0, 0.24, 1] }}
            >
              e elegância
            </motion.h1>
          </div>

          {/* Bottom row */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <p className="text-metal text-base sm:text-lg leading-relaxed max-w-md lg:max-w-xs">
              Portões, grades, escadas e estruturas metálicas para residências, condomínios e
              construtoras. Mais de <strong className="text-metal-light">20 anos</strong> entregando excelência.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:ml-auto">
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-8 py-4 transition-colors duration-200"
              >
                Solicitar Orçamento Gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 border border-metal-dark/50 hover:border-metal/70 text-metal-light hover:text-white text-sm tracking-wide px-8 py-4 transition-all duration-200"
              >
                Ver Portfólio
                <span className="w-4 h-4 border border-current rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats strip at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 border-t border-metal-dark/20 bg-carbon/60 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
      >
        <div className="container mx-auto px-4 sm:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '+20', label: 'Anos de mercado' },
              { value: '+5.000', label: 'Projetos entregues' },
              { value: '+500', label: 'Condomínios atendidos' },
              { value: '100%', label: 'Projetos com ART' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-px h-8 bg-amber-brand/40 shrink-0" />
                <div>
                  <div className="font-display text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] text-metal-dark tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 right-8 sm:right-16 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-metal-dark rotate-90 origin-center mb-3">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-amber-brand/60 to-transparent" />
      </motion.div>
    </section>
  )
}
