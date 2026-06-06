'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'

interface Props {
  name: string
  tagline: string | null
  heroImage?: string | null
}

export default function ServiceHero({ name, tagline, heroImage }: Props) {
  return (
    <section className="relative min-h-[72vh] flex items-end bg-carbon overflow-hidden pt-16">
      {heroImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-carbon/30" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-carbon" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg, #8c97a0 0px, #8c97a0 1px, transparent 0px, transparent 60px)',
            }}
          />
          <div className="absolute top-0 bottom-0 right-[25%] w-px bg-gradient-to-b from-transparent via-amber-brand/15 to-transparent" />
          {/* Large background name */}
          <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden">
            <span
              className="font-display font-black text-[18vw] leading-none text-transparent"
              style={{ WebkitTextStroke: '1px rgba(30,35,40,0.9)' }}
            >
              {name.toUpperCase()}
            </span>
          </div>
        </>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-8 pb-16">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center gap-2 text-xs text-metal mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span className="text-metal-dark">/</span>
          <Link href="/servicos" className="hover:text-white transition-colors">Serviços</Link>
          <span className="text-metal-dark">/</span>
          <span className="text-amber-brand">{name}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Serviço</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-6 max-w-3xl">
            {name}
          </h1>

          {tagline && (
            <p className="text-metal-light text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
              {tagline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/orcamento"
              className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-8 py-4 transition-colors duration-200"
            >
              Solicitar Orçamento Gratuito
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${name.toLowerCase()}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-metal-light hover:text-white text-sm px-8 py-4 transition-all duration-200"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
