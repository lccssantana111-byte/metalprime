'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    slug: 'portoes',
    name: 'Portões',
    tagline: 'Segurança e elegância na entrada',
    number: '01',
    href: '/servicos/portoes',
    keywords: ['Ferro', 'Alumínio', 'Inox', 'Automação'],
  },
  {
    slug: 'grades-e-cercas',
    name: 'Grades e Cercas',
    tagline: 'Proteção com design premium',
    number: '02',
    href: '/servicos/grades-e-cercas',
    keywords: ['Janelas', 'Muros', 'Perímetro'],
  },
  {
    slug: 'escadas',
    name: 'Escadas Metálicas',
    tagline: 'Arquitetura e engenharia unidas',
    number: '03',
    href: '/servicos/escadas',
    keywords: ['Retas', 'Helicoidais', 'Flutuantes'],
  },
  {
    slug: 'corrimoes',
    name: 'Corrimões',
    tagline: 'Segurança em cada detalhe',
    number: '04',
    href: '/servicos/corrimoes',
    keywords: ['Inox', 'Ferro', 'Guarda-corpos'],
  },
  {
    slug: 'estruturas-metalicas',
    name: 'Estruturas Metálicas',
    tagline: 'Engenharia de alto desempenho',
    number: '05',
    href: '/servicos/estruturas-metalicas',
    keywords: ['Galpões', 'Coberturas', 'Mezaninos'],
  },
  {
    slug: 'sob-medida',
    name: 'Sob Medida',
    tagline: 'Sua ideia, nossa execução',
    number: '06',
    href: '/servicos/sob-medida',
    keywords: ['Projetos únicos', 'Qualquer metal'],
  },
]

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-carbon relative overflow-hidden" ref={ref}>
      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-display font-black text-[20vw] leading-none text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: '1px rgba(44,55,66,0.5)' }}
        >
          SERVIÇOS
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-brand" />
              <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
                O que fazemos
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
              Serviços<br />
              <span className="text-metal/40">especializados</span>
            </h2>
          </div>
          <p className="text-metal max-w-xs leading-relaxed text-sm">
            Do projeto à instalação, entregamos soluções completas em estruturas metálicas com
            padrão de engenharia de alto nível.
          </p>
        </motion.div>

        {/* Services list */}
        <div className="divide-y divide-metal-dark/20">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link href={service.href} className="group block py-6 sm:py-8">
                <div className="flex items-center gap-6 sm:gap-10">
                  {/* Number */}
                  <span className="font-display text-xs text-metal-dark font-semibold tracking-widest w-6 shrink-0 group-hover:text-amber-brand transition-colors duration-300">
                    {service.number}
                  </span>

                  {/* Name */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-metal-light group-hover:text-white transition-colors duration-300 flex-1 leading-none">
                    {service.name}
                  </h3>

                  {/* Keywords — hidden on mobile */}
                  <div className="hidden lg:flex gap-2 flex-1 justify-center">
                    {service.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] text-metal-dark border border-metal-dark/30 px-2.5 py-1 group-hover:border-amber-brand/30 group-hover:text-metal transition-all duration-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Tagline */}
                  <span className="hidden sm:block text-sm text-metal max-w-[200px] text-right leading-snug">
                    {service.tagline}
                  </span>

                  {/* Arrow */}
                  <div className="ml-auto shrink-0 w-10 h-10 border border-metal-dark/40 rounded-full flex items-center justify-center text-metal group-hover:bg-amber-brand group-hover:border-amber-brand group-hover:text-carbon transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>

                {/* Progress line on hover */}
                <div className="h-px bg-amber-brand/20 mt-0 max-h-0 overflow-hidden group-hover:max-h-px transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href="/servicos"
            className="group inline-flex items-center gap-3 text-sm text-metal hover:text-white border border-metal-dark/40 hover:border-amber-brand/50 px-8 py-4 transition-all duration-300"
          >
            Ver todos os serviços em detalhe
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
