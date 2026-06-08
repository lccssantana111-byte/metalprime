'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'
import type { ServiceType } from '@/types'

interface Props {
  name: string
  tagline: string | null
  heroImage?: string | null
  slug?: string
}

const SLUG_PHOTOS: Record<string, string> = {
  portoes:             PHOTOS.services.portoes,
  'grades-e-cercas':   PHOTOS.services.grades_e_cercas,
  escadas:             PHOTOS.services.escadas,
  corrimoes:           PHOTOS.services.corrimoes,
  'estruturas-metalicas': PHOTOS.services.estruturas_metalicas,
  'sob-medida':        PHOTOS.services.sob_medida,
}

export default function ServiceHero({ name, tagline, heroImage, slug }: Props) {
  const photo = heroImage || (slug ? SLUG_PHOTOS[slug] : null) || PHOTOS.hero

  return (
    <section className="relative min-h-[80vh] flex items-end overflow-hidden" style={{ background: '#f7f5f2' }}>
      {/* Photo */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url("${photo}")`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.98) 0%, rgba(5,6,8,0.6) 40%, rgba(5,6,8,0.4) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(5,6,8,0.5) 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 pb-20 pt-40">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="text-[11px] font-mono transition-colors" style={{ color: 'rgba(180,188,198,0.35)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#b4bcc6' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.35)' }}>
            Início
          </Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(180,188,198,0.2)' }} />
          <Link href="/servicos" className="text-[11px] font-mono transition-colors" style={{ color: 'rgba(180,188,198,0.35)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#b4bcc6' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.35)' }}>
            Serviços
          </Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(180,188,198,0.2)' }} />
          <span className="text-[11px] font-mono" style={{ color: '#c4a040' }}>{name}</span>
        </motion.nav>

        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-display font-black leading-[0.88]"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', color: '#1e2328', letterSpacing: '-0.025em' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {name}
          </motion.h1>
        </div>

        {tagline && (
          <motion.p
            className="text-[16px] sm:text-[18px] leading-[1.7] mb-12 max-w-lg"
            style={{ color: 'rgba(180,188,198,0.65)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {tagline}
          </motion.p>
        )}

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link
            href="/orcamento"
            className="group inline-flex items-center gap-3 font-bold text-[13px] tracking-[0.1em] uppercase px-9 py-[17px] transition-all duration-200"
            style={{ background: '#c4a040', color: '#050608' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
          >
            Solicitar Orçamento
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${name.toLowerCase()}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[13px] px-8 py-[17px] transition-all duration-200"
            style={{ border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(60,74,88,0.7)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(0,0,0,0.20)'
              el.style.color = '#1e2328'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(0,0,0,0.12)'
              el.style.color = 'rgba(60,74,88,0.7)'
            }}
          >
            Falar pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
