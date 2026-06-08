'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DEFAULT_STEPS = [
  {
    title: 'Visita Técnica',
    description: 'Nosso engenheiro visita o local para medir, avaliar condições estruturais e entender as necessidades do projeto.',
  },
  {
    title: 'Projeto e Orçamento',
    description: 'Elaboramos o projeto técnico detalhado com memorial descritivo e orçamento fixo — sem surpresas no final.',
  },
  {
    title: 'Fabricação',
    description: 'Produção em nossa oficina com aço de primeira linha, solda certificada e tratamento anticorrosivo.',
  },
  {
    title: 'Instalação',
    description: 'Nossa equipe realiza a montagem no local com equipamentos adequados, sem danificar a obra.',
  },
  {
    title: 'Acabamento e Entrega',
    description: 'Pintura eletrostática ou galvanização, limpeza do canteiro e entrega com garantia por escrito.',
  },
]

interface Step {
  title: string
  description: string
}

interface Props {
  steps?: Step[]
}

export default function ServiceProcess({ steps = DEFAULT_STEPS }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-28 sm:py-36 overflow-hidden"
      style={{ background: '#f7f5f2', borderTop: '1px solid rgba(0,0,0,0.05)' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Header */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Como trabalhamos
            </span>
            <h2
              className="font-display font-black leading-[0.88]"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#1e2328', letterSpacing: '-0.02em' }}
            >
              Do projeto<br />
              <span style={{ color: 'rgba(240,241,242,0.18)' }}>à entrega</span>
            </h2>
            <p className="mt-8 text-[14px] leading-[1.8]" style={{ color: 'rgba(60,74,88,0.4)' }}>
              Cada etapa é documentada e comunicada ao cliente. Sem improvisos.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Vertical rail */}
              <div
                className="absolute left-[18px] top-0 bottom-0 w-px hidden sm:block"
                style={{ background: 'rgba(0,0,0,0.07)' }}
              />

              <div className="space-y-0">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="relative flex gap-8 sm:gap-10 pb-10 last:pb-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Number */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-9 h-9 flex items-center justify-center font-mono text-[11px] font-bold"
                        style={{
                          background: i === 0 ? '#c4a040' : '#eeeae3',
                          border: `1px solid ${i === 0 ? '#c4a040' : 'rgba(0,0,0,0.09)'}`,
                          color: i === 0 ? '#050608' : 'rgba(60,74,88,0.4)',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pb-10 last:pb-0" style={{ borderBottom: i < steps.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <h3
                        className="font-display font-bold mb-3"
                        style={{ fontSize: '1.05rem', color: '#1e2328', letterSpacing: '-0.01em' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[13px] leading-[1.85]" style={{ color: 'rgba(60,74,88,0.4)' }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
