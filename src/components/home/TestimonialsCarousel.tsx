'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos Rodrigues',
    role: 'Síndico',
    company: 'Cond. Alphaville Business',
    content:
      'A Metalprime reformou completamente o sistema de portões e grades do nosso condomínio. Pontualidade, qualidade impecável e pós-venda excelente. Já indicamos para outros 3 condomínios.',
    rating: 5,
    tag: 'Portões e Grades',
    initial: 'CR',
  },
  {
    name: 'Arq. Patricia Lima',
    role: 'Arquiteta',
    company: 'Lima & Associados',
    content:
      'Parceiro indispensável nos nossos projetos residenciais de alto padrão. A Metalprime transforma nossos desenhos em peças únicas com precisão e acabamento de altíssimo nível.',
    rating: 5,
    tag: 'Sob Medida',
    initial: 'PL',
  },
  {
    name: 'Eng. Roberto Mendes',
    role: 'Diretor de Obras',
    company: 'Construtora Mendes',
    content:
      'Fornecedor oficial para todas as nossas obras em SP. Cumprimento rigoroso de prazo e ART em todos os projetos estruturais. Recomendo sem hesitar.',
    rating: 5,
    tag: 'Estruturas Metálicas',
    initial: 'RM',
  },
  {
    name: 'Ana Paula Souza',
    role: 'Proprietária',
    company: 'Residência em Moema',
    content:
      'Fizeram a escada em aço e vidro da minha casa. Ficou exatamente como visualizei com o arquiteto — os vizinhos não param de perguntar quem fez.',
    rating: 5,
    tag: 'Escadas',
    initial: 'AS',
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const t = testimonials[current]

  return (
    <section className="py-28 bg-steel-dark relative overflow-hidden" ref={ref}>
      {/* Huge quote mark background */}
      <div className="absolute top-0 left-0 pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-black text-[30vw] leading-none text-transparent"
          style={{ WebkitTextStroke: '1px rgba(44,55,66,0.6)' }}
        >
          "
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
              Quem confia em nós
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
            Depoimentos
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left — large number + navigation */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-start gap-8">
            <div className="font-display font-black text-8xl text-white/10 leading-none">
              {String(current + 1).padStart(2, '0')}
            </div>
            <div className="text-xs text-metal-dark tracking-widest uppercase">
              de {testimonials.length}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={prev}
                className="w-10 h-10 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all duration-200"
                aria-label="Anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all duration-200"
                aria-label="Próximo"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main testimonial */}
          <div className="lg:col-span-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-brand text-amber-brand" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-snug mb-10 max-w-3xl">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex items-center gap-4">
                    {/* Avatar initial */}
                    <div className="w-12 h-12 bg-amber-brand/10 border border-amber-brand/30 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-amber-brand text-sm">{t.initial}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-metal mt-0.5">{t.role} · {t.company}</p>
                    </div>
                  </div>

                  <div className="sm:ml-auto">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-brand border border-amber-brand/30 px-3 py-1.5">
                      {t.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-12 lg:ml-[calc(100%/6+3rem)]">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-400 h-0.5 ${
                i === current ? 'w-10 bg-amber-brand' : 'w-4 bg-metal-dark hover:bg-metal'
              }`}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="flex gap-2 mt-8 lg:hidden">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 border border-white/10 hover:border-amber-brand/50 flex items-center justify-center text-metal hover:text-white transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
