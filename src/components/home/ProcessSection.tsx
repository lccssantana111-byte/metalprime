'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PHOTOS } from '@/lib/images'

const steps = [
  {
    number: '01',
    title: 'Consulta e Visita Técnica',
    description: 'Nosso engenheiro visita o local, faz medições precisas e elabora o projeto executivo. Sem custo, sem compromisso.',
    badge: 'Gratuita',
  },
  {
    number: '02',
    title: 'Projeto e Orçamento',
    description: 'Desenvolvemos o projeto técnico detalhado com memorial descritivo, cronograma e proposta formal em até 48h.',
    badge: '48h',
  },
  {
    number: '03',
    title: 'Fabricação Industrial',
    description: 'Produzimos em estrutura industrial própria com controle rigoroso de qualidade e rastreabilidade de materiais.',
    badge: 'ISO 9001',
  },
  {
    number: '04',
    title: 'Instalação com ART',
    description: 'Equipe especializada instala no prazo combinado. Entregamos ART do engenheiro responsável em todos os projetos.',
    badge: 'ART inclusa',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="overflow-hidden" style={{ background: '#0c0e11' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left — content */}
        <div className="py-28 sm:py-36 px-8 sm:px-16 xl:px-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-8" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Como trabalhamos
            </span>
            <h2
              className="font-display font-black leading-[0.88] mb-16"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
            >
              Do orçamento<br />
              <span style={{ color: 'rgba(240,241,242,0.18)' }}>à entrega</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex gap-8"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0 font-mono font-bold text-[11px]"
                    style={{ background: 'rgba(196,160,64,0.08)', border: '1px solid rgba(196,160,64,0.2)', color: '#c4a040' }}
                  >
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px mt-3 mb-3" style={{ background: 'rgba(255,255,255,0.06)', height: '40px' }} />
                  )}
                </div>

                <div className="pb-10">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="font-display font-bold" style={{ fontSize: '1.1rem', color: '#f0f1f2' }}>
                      {step.title}
                    </h3>
                    <span
                      className="text-[9px] font-mono tracking-widest uppercase px-2 py-1 shrink-0"
                      style={{ background: 'rgba(196,160,64,0.08)', border: '1px solid rgba(196,160,64,0.15)', color: 'rgba(196,160,64,0.7)' }}
                    >
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-[14px] leading-[1.8]" style={{ color: 'rgba(180,188,198,0.5)' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — photo */}
        <motion.div
          className="relative hidden lg:block"
          style={{ minHeight: '600px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url("${PHOTOS.process}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #0c0e11 0%, rgba(12,14,17,0.15) 40%, transparent 100%)' }}
          />
          <div className="absolute bottom-12 right-12">
            <div
              className="px-6 py-5"
              style={{ background: 'rgba(12,14,17,0.92)', border: '1px solid rgba(196,160,64,0.2)', backdropFilter: 'blur(12px)' }}
            >
              <div className="font-display font-black text-[2.5rem] leading-none" style={{ color: '#c4a040' }}>20+</div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(180,188,198,0.4)' }}>
                Anos de expertise
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
