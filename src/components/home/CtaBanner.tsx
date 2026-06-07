'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'

export default function CtaBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '600px' }}>
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${PHOTOS.cta}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* Heavy overlay — text must be readable */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(5,6,8,0.97) 0%, rgba(5,6,8,0.88) 55%, rgba(5,6,8,0.75) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.6) 0%, transparent 60%)' }} />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-28 sm:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-10" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Próximo passo
            </span>

            <h2
              className="font-display font-black leading-[0.88] mb-10"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', color: '#f0f1f2', letterSpacing: '-0.025em' }}
            >
              Seu projeto<br />
              começa com<br />
              <span style={{ color: '#c4a040' }}>uma ligação.</span>
            </h2>

            {/* Giant phone */}
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="block font-display font-black leading-none mb-12 transition-colors"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'rgba(240,241,242,0.25)', letterSpacing: '-0.02em' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240,241,242,0.25)' }}
            >
              {COMPANY_PHONE}
            </a>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 font-bold text-[13px] tracking-[0.1em] uppercase px-10 py-[18px] transition-all duration-200"
                style={{ background: '#c4a040', color: '#050608' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4b454' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#c4a040' }}
              >
                Solicitar Orçamento Gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[13px] px-9 py-[18px] transition-all duration-200"
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
                Falar pelo WhatsApp
              </a>
            </div>

            {/* Trust line */}
            <p className="mt-10 text-[12px] font-mono" style={{ color: 'rgba(180,188,198,0.3)' }}>
              Orçamento em 24h · Visita técnica gratuita · ART inclusa · +5.000 obras entregues
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
