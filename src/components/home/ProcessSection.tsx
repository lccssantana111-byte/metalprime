'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Consulta Gratuita',
    description:
      'Nos conte seu projeto pelo WhatsApp ou formulário. Respondemos em até 24 horas.',
    detail: 'Sem compromisso',
  },
  {
    number: '02',
    title: 'Visita Técnica',
    description:
      'Nosso engenheiro visita o local, faz medições precisas e elabora o projeto executivo.',
    detail: 'Gratuita',
  },
  {
    number: '03',
    title: 'Produção',
    description:
      'Fabricamos em estrutura industrial própria com controle rigoroso de qualidade.',
    detail: 'ISO 9001',
  },
  {
    number: '04',
    title: 'Instalação',
    description:
      'Equipe especializada instala no prazo combinado com acabamento impecável e ART inclusa.',
    detail: 'Com ART',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-graphite relative overflow-hidden" ref={ref}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#8c97a0 1px, transparent 1px), linear-gradient(90deg, #8c97a0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
              Como trabalhamos
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
              Do orçamento<br />
              <span className="text-metal/40">à entrega</span>
            </h2>
            <p className="text-metal text-sm max-w-xs leading-relaxed lg:ml-16 lg:mb-1">
              Um processo estruturado para garantir qualidade, prazo e total transparência.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-white/5" />
          <motion.div
            className="hidden lg:block absolute top-8 left-0 h-px bg-gradient-to-r from-amber-brand/60 to-transparent"
            initial={{ width: '0%' }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pt-0 lg:pt-16 pl-0 lg:pl-8 pr-8 pb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              >
                {/* Number bubble on the line */}
                <div className="flex lg:block items-start gap-6 mb-8 lg:mb-0">
                  <div className="relative shrink-0">
                    <div className="hidden lg:flex absolute -top-16 left-0 w-16 h-16 items-center justify-center">
                      <div className="absolute inset-0 border border-amber-brand/20 rotate-45" />
                      <span className="font-display font-black text-amber-brand text-lg relative z-10">
                        {step.number}
                      </span>
                    </div>
                    <div className="lg:hidden flex w-12 h-12 items-center justify-center border border-amber-brand/30 bg-amber-brand/5">
                      <span className="font-display font-black text-amber-brand text-sm">{step.number}</span>
                    </div>
                  </div>

                  <div className="lg:mt-8">
                    {/* Detail badge */}
                    <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-amber-brand border border-amber-brand/30 px-2 py-0.5 mb-3">
                      {step.detail}
                    </span>

                    <h3 className="font-display font-bold text-xl text-white mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-metal leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Mobile separator */}
                {i < steps.length - 1 && (
                  <div className="sm:hidden w-px h-8 bg-gradient-to-b from-amber-brand/40 to-transparent ml-5.5 mb-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
