'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { PHOTOS } from '@/lib/images'
import { useWhatsAppNumber } from '@/components/providers/WhatsAppNumberProvider'
import type { ServiceType } from '@/types'
import { CTAButton, COLORS, TYPOGRAPHY } from '@/components/ui/design-system'
import { springEase } from '@/lib/animations'

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
  const WHATSAPP_NUMBER = useWhatsAppNumber()
  const photo = heroImage || (slug ? SLUG_PHOTOS[slug] : null) || PHOTOS.hero

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: '#050608' }}>
      {/* Photo */}
      <div className="absolute inset-0">
        <img
          src={photo}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          fetchPriority="high"
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
          <Link href="/" className="text-[11px] font-mono transition-colors" style={{ color: 'rgba(180,188,198,0.65)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#b4bcc6' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.65)' }}>
            Início
          </Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(180,188,198,0.45)' }} />
          <Link href="/servicos" className="text-[11px] font-mono transition-colors" style={{ color: 'rgba(180,188,198,0.65)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#b4bcc6' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,188,198,0.65)' }}>
            Serviços
          </Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(180,188,198,0.45)' }} />
          <span className="text-[11px] font-mono" style={{ color: COLORS.brand.orange }}>{name}</span>
        </motion.nav>

        <div className="mb-4">
          <motion.h1
            style={{
              fontFamily: TYPOGRAPHY.families.heading,
              fontWeight: 900,
              lineHeight: 0.88,
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              color: '#ffffff',
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              margin: 0,
            }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.1, ease: springEase }}
          >
            {name}
          </motion.h1>
        </div>

        {tagline && (
          <motion.p
            className="text-[16px] sm:text-[18px] leading-[1.7] mb-12 max-w-lg"
            style={{ color: 'rgba(200,208,218,0.88)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {tagline}
          </motion.p>
        )}

        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: springEase }}
        >
          <CTAButton
            variant="primary"
            href="/orcamento"
            iconCircle
            icon={<ArrowRight style={{ width: '14px', height: '14px' }} />}
          >
            Solicitar Orçamento
          </CTAButton>
          <CTAButton
            variant="ghost"
            hrefExternal={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${name.toLowerCase()}.`}
            onDark
          >
            Falar pelo WhatsApp
          </CTAButton>
        </motion.div>
      </div>
    </section>
  )
}
