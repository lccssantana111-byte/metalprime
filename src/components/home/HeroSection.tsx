'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ROTATING_WORDS = ['Portões', 'Escadas', 'Grades', 'Estruturas', 'Corrimões']

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: '1ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="block text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(135deg, #e8a020 0%, #c8860a 40%, #f0b830 100%)',
          }}
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-105%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
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
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#060809' }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* Architectural grid lines */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Vertical rules */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '100px 100%',
        }} />
        {/* Horizontal rules — subtle */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '100% 120px',
        }} />
      </motion.div>

      {/* Amber glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '-5%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,134,10,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Steel glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(28,43,58,0.5) 0%, transparent 65%)',
        }}
      />

      {/* Corner marks — top */}
      <div className="absolute top-8 left-6 sm:left-10 pointer-events-none">
        <div className="relative w-10 h-10">
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'rgba(200,134,10,0.4)' }} />
          <div className="absolute top-0 left-0 w-px h-full" style={{ background: 'rgba(200,134,10,0.4)' }} />
        </div>
      </div>
      <div className="absolute top-8 right-6 sm:right-10 pointer-events-none">
        <div className="relative w-10 h-10">
          <div className="absolute top-0 right-0 w-full h-px" style={{ background: 'rgba(200,134,10,0.4)' }} />
          <div className="absolute top-0 right-0 w-px h-full" style={{ background: 'rgba(200,134,10,0.4)' }} />
        </div>
      </div>

      {/* Ghost number — parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-display font-black leading-none text-transparent block"
          style={{
            fontSize: 'clamp(160px, 28vw, 420px)',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            letterSpacing: '-0.04em',
          }}
        >
          20+
        </span>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-5 sm:px-8 pt-28 pb-32">

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-10 sm:mb-14"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span
              className="w-8 h-px"
              style={{ background: '#c8860a' }}
            />
            <span
              className="w-1.5 h-1.5 rotate-45 shrink-0"
              style={{ background: '#c8860a' }}
            />
            <span
              className="text-[11px] font-semibold tracking-[0.4em] uppercase font-mono"
              style={{ color: '#c8860a' }}
            >
              Serralheria Premium · São Paulo
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-black text-white leading-[0.88]"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 9.5rem)', letterSpacing: '-0.02em' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              Aço com
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-black leading-[0.88]"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
                letterSpacing: '-0.02em',
              }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.76, 0, 0.24, 1] }}
            >
              <RotatingWord />
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-12 sm:mb-16">
            <motion.h1
              className="font-display font-black leading-[0.88]"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.12)',
              }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.44, ease: [0.76, 0, 0.24, 1] }}
            >
              e elegância
            </motion.h1>
          </div>

          {/* Bottom row */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <p
              className="text-[15px] sm:text-[16px] leading-[1.65] max-w-sm"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Portões, grades, escadas e estruturas metálicas para residências, condomínios e
              construtoras. Mais de{' '}
              <strong style={{ color: 'rgba(255,255,255,0.75)' }}>20 anos</strong> entregando excelência em São Paulo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto">
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 font-bold text-[13px] tracking-widest uppercase px-8 py-4 transition-all duration-200"
                style={{
                  background: '#c8860a',
                  color: '#060809',
                  letterSpacing: '0.1em',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#e8a020' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c8860a' }}
              >
                Orçamento Gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 text-[13px] tracking-wide px-8 py-4 transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.55)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.3)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.12)'
                  el.style.color = 'rgba(255,255,255,0.55)'
                }}
              >
                Ver Portfólio
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: '1px solid currentColor' }}
                >
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats strip — bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <div
          className="container mx-auto px-5 sm:px-8 py-5"
          style={{ background: 'rgba(6,8,9,0.7)', backdropFilter: 'blur(12px)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '+20', label: 'Anos de mercado' },
              { value: '+5.000', label: 'Projetos entregues' },
              { value: '+500', label: 'Condomínios' },
              { value: '100%', label: 'Com ART' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-px h-8 shrink-0"
                  style={{ background: 'rgba(200,134,10,0.4)' }}
                />
                <div>
                  <div className="font-display text-[1.25rem] font-black text-white leading-none">
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] font-mono tracking-wider mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 right-6 sm:right-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase font-mono rotate-90 origin-center mb-2"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(200,134,10,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
