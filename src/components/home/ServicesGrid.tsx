'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PHOTOS } from '@/lib/images'

const services = [
  {
    slug: 'portoes',
    name: 'Portões',
    tagline: 'Automáticos, basculantes e deslizantes',
    href: '/servicos/portoes',
    photo: PHOTOS.services.portoes,
    tag: 'Residencial · Comercial',
  },
  {
    slug: 'grades_e_cercas',
    name: 'Grades e Cercas',
    tagline: 'Segurança perimetral com design industrial',
    href: '/servicos/grades-e-cercas',
    photo: PHOTOS.services.grades_e_cercas,
    tag: 'Proteção · Perímetro',
  },
  {
    slug: 'escadas',
    name: 'Escadas Metálicas',
    tagline: 'Retas, helicoidais e flutuantes',
    href: '/servicos/escadas',
    photo: PHOTOS.services.escadas,
    tag: 'Arquitetônicas · Industriais',
  },
  {
    slug: 'corrimoes',
    name: 'Corrimões',
    tagline: 'Inox, ferro e alumínio — ART inclusa',
    href: '/servicos/corrimoes',
    photo: PHOTOS.services.corrimoes,
    tag: 'Inox · Ferro · Alumínio',
  },
  {
    slug: 'estruturas_metalicas',
    name: 'Estruturas Metálicas',
    tagline: 'Galpões, coberturas e mezaninos',
    href: '/servicos/estruturas-metalicas',
    photo: PHOTOS.services.estruturas_metalicas,
    tag: 'Industrial · Comercial',
  },
  {
    slug: 'sob_medida',
    name: 'Projetos Sob Medida',
    tagline: 'Do conceito à instalação — qualquer metal',
    href: '/servicos/sob-medida',
    photo: PHOTOS.services.sob_medida,
    tag: 'Único · Personalizado',
  },
]

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-28 sm:py-36 overflow-hidden"
      style={{ background: '#050608' }}
    >
      <div className="container mx-auto px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Especialidades
            </span>
            <h2
              className="font-display font-black leading-[0.88]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
            >
              O que<br />
              fabricamos
            </h2>
          </div>
          <Link
            href="/servicos"
            className="group self-start sm:self-auto inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase transition-colors"
            style={{ color: '#5a6470' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#5a6470' }}
          >
            Ver todos
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* 3×2 photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.09 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <Link href={service.href} className="group block relative overflow-hidden aspect-[4/3]" style={{ background: '#13161b' }}>
      {/* Photo */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url("${service.photo}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Permanent dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(5,6,8,0.5)' }} />

      {/* Gradient bottom */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.2) 55%, transparent 100%)' }}
      />

      {/* Tag — top right, appears on hover */}
      <div className="absolute top-5 right-5">
        <span
          className="text-[9px] font-mono tracking-[0.3em] uppercase px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'rgba(5,6,8,0.85)',
            border: '1px solid rgba(196,160,64,0.3)',
            color: 'rgba(196,160,64,0.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {service.tag}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p
              className="text-[10px] font-mono tracking-wider uppercase mb-2"
              style={{ color: 'rgba(196,160,64,0.75)' }}
            >
              {service.tagline}
            </p>
            <h3
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', color: '#f0f1f2' }}
            >
              {service.name}
            </h3>
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-[#c4a040] group-hover:border-[#c4a040]"
            style={{ border: '1px solid rgba(255,255,255,0.18)', color: '#f0f1f2' }}
          >
            <ArrowUpRight className="w-4 h-4 group-hover:text-[#050608] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  )
}
