'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, HardHat, Factory } from 'lucide-react'
import { PHOTOS } from '@/lib/images'

const segments = [
  {
    icon: Building2,
    label: 'Condomínios',
    headline: 'O parceiro de +500 condomínios em São Paulo',
    description:
      'Portões automáticos, grades, guaritas e estruturas de segurança. Entregamos ART em todos os itens estruturais — o síndico fica tranquilo com a vistoria.',
    items: [
      'Portões automáticos com ART',
      'Grades e cercas de segurança',
      'Guaritas e coberturas',
      'Manutenção preventiva',
    ],
    href: '/orcamento',
    cta: 'Orçamento para condomínio',
  },
  {
    icon: HardHat,
    label: 'Construtoras',
    headline: 'Certificado e no cronograma — sempre',
    description:
      'Escadas, estruturas, mezaninos e guarda-corpos. Fabricação própria, sem terceirizar. ART em 100% dos projetos — a obra não para por nossa causa.',
    items: [
      'Estruturas metálicas certificadas',
      'Escadas e guarda-corpos',
      'Mezaninos e plataformas',
      'Entrega no prazo da obra',
    ],
    href: '/orcamento',
    cta: 'Orçamento para construtora',
  },
  {
    icon: Factory,
    label: 'Indústrias',
    headline: 'Estrutura própria para projetos de grande porte',
    description:
      'Galpões, coberturas e mezaninos industriais. Projetamos, fabricamos e instalamos com equipe própria — da fundação ao acabamento.',
    items: [
      'Galpões industriais',
      'Coberturas metálicas',
      'Plataformas e mezaninos',
      'Estruturas sob medida',
    ],
    href: '/orcamento',
    cta: 'Orçamento industrial',
  },
]

export default function SegmentSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative py-0 overflow-hidden"
      style={{ background: '#0c0e11' }}
    >
      {/* Photo background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${PHOTOS.segment}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(12,14,17,0.93)' }}
        />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="container mx-auto px-5 sm:px-8">
          <motion.div
            className="pt-28 pb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Para quem fazemos
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2
                className="font-display font-black leading-[0.88]"
                style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
              >
                O parceiro certo<br />
                <span style={{ color: '#c4a040' }}>para cada projeto</span>
              </h2>
              <p
                className="text-[15px] leading-[1.7] max-w-sm lg:text-right"
                style={{ color: 'rgba(180,188,198,0.6)' }}
              >
                Condomínios, construtoras ou projetos residenciais — a estrutura e o processo
                são os mesmos. O que muda é a escala.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Segments grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {segments.map((seg, i) => {
            const Icon = seg.icon
            return (
              <motion.div
                key={seg.label}
                className="p-10 sm:p-14 flex flex-col group relative overflow-hidden"
                style={{
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(196,160,64,0.05) 0%, transparent 70%)' }}
                />

                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(196,160,64,0.1)', border: '1px solid rgba(196,160,64,0.2)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#c4a040' }} />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(196,160,64,0.7)' }}>
                    {seg.label}
                  </span>
                </div>

                {/* Headline */}
                <h3
                  className="font-display font-bold mb-5 leading-[1.15]"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', color: '#f0f1f2' }}
                >
                  {seg.headline}
                </h3>

                {/* Description */}
                <p
                  className="text-[14px] leading-[1.75] mb-8"
                  style={{ color: 'rgba(180,188,198,0.55)' }}
                >
                  {seg.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-10 flex-1">
                  {seg.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[13px]" style={{ color: 'rgba(180,188,198,0.75)' }}>
                      <div
                        className="w-1 h-1 shrink-0"
                        style={{ background: '#c4a040', transform: 'rotate(45deg)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={seg.href}
                  className="group/btn inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 mt-auto"
                  style={{ color: '#c4a040' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4b454' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
                >
                  {seg.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
