'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PHOTOS } from '@/lib/images'

const STATS = [
  { value: '+20', label: 'Anos de mercado' },
  { value: '+5.000', label: 'Obras entregues' },
  { value: '+500', label: 'Condomínios atendidos' },
  { value: '100%', label: 'Projetos com ART' },
]

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#050608' }}
    >
      {/* Background photo with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 scale-[1.15]"
          style={{
            backgroundImage: `url("${PHOTOS.hero}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(5,6,8,0.97) 0%, rgba(5,6,8,0.80) 50%, rgba(5,6,8,0.60) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.9) 0%, transparent 50%)' }} />
      </motion.div>

      {/* Structural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-5 sm:px-8 pt-32 pb-40">

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-6 h-px" style={{ background: '#c4a040' }} />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color: 'rgba(196,160,64,0.8)' }}>
              São Paulo · Est. 2004
            </span>
          </motion.div>

          {/* Headline — each line slides in independently */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-black text-[#f0f1f2] leading-[0.85]"
              style={{ fontSize: 'clamp(4rem, 12vw, 13rem)', letterSpacing: '-0.025em' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Engenharia
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-black leading-[0.85]"
              style={{
                fontSize: 'clamp(4rem, 12vw, 13rem)',
                letterSpacing: '-0.025em',
                color: '#c4a040',
              }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              em Aço.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-14 sm:mb-20">
            <motion.h1
              className="font-display font-black leading-[0.85]"
              style={{
                fontSize: 'clamp(4rem, 12vw, 13rem)',
                letterSpacing: '-0.025em',
                color: 'rgba(240,241,242,0.12)',
              }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            >
              Há 20 anos.
            </motion.h1>
          </div>

          {/* Bottom row */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[16px] sm:text-[18px] leading-[1.7] max-w-md"
              style={{ color: 'rgba(180,188,198,0.75)' }}
            >
              Estruturas metálicas para condomínios, construtoras e indústrias.
              Mais de{' '}
              <strong style={{ color: '#f0f1f2', fontWeight: 500 }}>5.000 obras entregues</strong>{' '}
              com ART de engenheiro responsável.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto">
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 font-bold text-[13px] tracking-[0.1em] uppercase px-10 py-[18px] transition-all duration-200"
                style={{ background: '#c4a040', color: '#050608' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
              >
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 text-[13px] tracking-wide px-9 py-[18px] transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(180,188,198,0.7)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.25)'
                  el.style.color = '#f0f1f2'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.12)'
                  el.style.color = 'rgba(180,188,198,0.7)'
                }}
              >
                Ver Portfólio
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div
          className="container mx-auto px-5 sm:px-8"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(5,6,8,0.85)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="py-6 px-4 sm:px-8 flex items-center gap-4"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <div
                  className="w-px self-stretch shrink-0"
                  style={{ background: 'rgba(196,160,64,0.35)' }}
                />
                <div>
                  <div
                    className="font-display font-black text-[1.5rem] sm:text-[1.75rem] leading-none"
                    style={{ color: '#f0f1f2' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] font-mono tracking-wider mt-1 uppercase"
                    style={{ color: 'rgba(180,188,198,0.65)' }}
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
        className="absolute bottom-32 right-6 sm:right-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: '#c4a040', animation: 'pulse 2.4s ease-in-out infinite' }}
        />
        <div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(196,160,64,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
