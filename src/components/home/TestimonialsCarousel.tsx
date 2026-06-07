'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos Rodrigues',
    role: 'Síndico',
    company: 'Condomínio Alphaville Business',
    content: 'A Metalprime reformou completamente o sistema de portões e grades do nosso condomínio. Pontualidade, qualidade impecável e pós-venda excelente. Já indicamos para outros três condomínios da região.',
    service: 'Portões e Grades',
    initial: 'CR',
  },
  {
    name: 'Arq. Patricia Lima',
    role: 'Arquiteta Sênior',
    company: 'Lima & Associados',
    content: 'Parceiro indispensável nos nossos projetos residenciais de alto padrão. A Metalprime transforma nossos projetos em peças únicas com precisão e acabamento que os clientes reconhecem como diferencial.',
    service: 'Projetos Sob Medida',
    initial: 'PL',
  },
  {
    name: 'Eng. Roberto Mendes',
    role: 'Diretor de Obras',
    company: 'Construtora Mendes & Associados',
    content: 'Fornecedor oficial para todas as nossas obras em São Paulo há seis anos. Cumprimento rigoroso de cronograma e ART em 100% dos projetos estruturais. Referência no segmento.',
    service: 'Estruturas Metálicas',
    initial: 'RM',
  },
  {
    name: 'Ana Paula Souza',
    role: 'Proprietária',
    company: 'Residência Alto de Pinheiros',
    content: 'Fizeram a escada helicoidal em aço e vidro da minha casa. O resultado superou todas as expectativas — os visitantes fazem questão de perguntar quem executou a obra.',
    service: 'Escadas Metálicas',
    initial: 'AS',
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const navigate = (dir: 1 | -1) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section
      ref={ref}
      className="py-28 sm:py-36 overflow-hidden"
      style={{ background: '#13161b' }}
    >
      <div className="container mx-auto px-5 sm:px-8">

        {/* Header row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Quem confia em nós
            </span>
            <h2
              className="font-display font-black leading-[0.88]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
            >
              O que nossos<br />
              <span style={{ color: 'rgba(240,241,242,0.18)' }}>clientes dizem</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] tabular-nums" style={{ color: 'rgba(180,188,198,0.3)' }}>
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#b4bcc6' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(196,160,64,0.4)'
                el.style.color = '#f0f1f2'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.1)'
                el.style.color = '#b4bcc6'
              }}
              aria-label="Anterior"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-11 h-11 flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#b4bcc6' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(196,160,64,0.4)'
                el.style.color = '#f0f1f2'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.1)'
                el.style.color = '#b4bcc6'
              }}
              aria-label="Próximo"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Quote */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Large quote mark */}
              <div
                className="font-display font-black leading-none mb-6 select-none"
                style={{ fontSize: 'clamp(5rem, 10vw, 9rem)', color: 'rgba(196,160,64,0.18)', lineHeight: 1 }}
                aria-hidden
              >
                "
              </div>

              {/* Gold rule before quote */}
              <div className="w-12 h-px mb-8" style={{ background: 'rgba(196,160,64,0.4)' }} />

              <blockquote
                className="font-display font-medium leading-[1.35] mb-12"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)', color: '#f0f1f2', maxWidth: '900px' }}
              >
                {t.content}
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center shrink-0 font-display font-bold text-[13px]"
                    style={{ background: 'rgba(196,160,64,0.1)', border: '1px solid rgba(196,160,64,0.25)', color: '#c4a040' }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px]" style={{ color: '#f0f1f2' }}>{t.name}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: '#8a9199' }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <span
                    className="text-[10px] font-mono tracking-[0.3em] uppercase px-3 py-2"
                    style={{ border: '1px solid rgba(196,160,64,0.2)', color: 'rgba(196,160,64,0.6)' }}
                  >
                    {t.service}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress line */}
          <div className="flex gap-2 mt-14">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className="h-px transition-all duration-300"
                style={{
                  width: i === current ? '48px' : '20px',
                  background: i === current ? '#c4a040' : 'rgba(255,255,255,0.12)',
                }}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
