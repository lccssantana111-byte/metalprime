'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'

export default function CtaBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-0 bg-carbon relative overflow-hidden" ref={ref}>
      {/* Top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-brand/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-8">
        <div className="relative border-x border-white/5 py-24">
          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-12 h-12">
            <div className="absolute top-0 left-0 w-5 h-px bg-amber-brand/50" />
            <div className="absolute top-0 left-0 w-px h-5 bg-amber-brand/50" />
          </div>
          <div className="absolute top-6 right-6 w-12 h-12">
            <div className="absolute top-0 right-0 w-5 h-px bg-amber-brand/50" />
            <div className="absolute top-0 right-0 w-px h-5 bg-amber-brand/50" />
          </div>
          <div className="absolute bottom-6 left-6 w-12 h-12">
            <div className="absolute bottom-0 left-0 w-5 h-px bg-metal-dark/40" />
            <div className="absolute bottom-0 left-0 w-px h-5 bg-metal-dark/40" />
          </div>
          <div className="absolute bottom-6 right-6 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-5 h-px bg-metal-dark/40" />
            <div className="absolute bottom-0 right-0 w-px h-5 bg-metal-dark/40" />
          </div>

          {/* Background large text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span
              className="font-display font-black text-[15vw] leading-none text-transparent"
              style={{ WebkitTextStroke: '1px rgba(30,35,40,0.8)' }}
            >
              AÇO
            </span>
          </div>

          <motion.div
            className="relative z-10 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber-brand" />
              <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
                Comece agora
              </span>
              <div className="w-8 h-px bg-amber-brand" />
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-6">
              Transforme seu espaço<br />
              <span className="text-amber-brand">com excelência</span>
            </h2>

            <p className="text-metal text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Orçamento gratuito, visita técnica sem compromisso e entrega com ART.
              Atendemos residências, condomínios e construtoras em São Paulo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-10 py-4 transition-colors duration-200"
              >
                Solicitar Orçamento Grátis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-white/15 hover:border-white/30 text-metal-light hover:text-white text-sm px-8 py-4 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {COMPANY_PHONE}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
              {[
                '✓ Orçamento em 24h',
                '✓ Visita técnica gratuita',
                '✓ ART inclusa',
                '✓ +5.000 projetos entregues',
              ].map((badge) => (
                <span key={badge} className="text-xs text-metal-dark tracking-wide">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  )
}
