'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/types'
import { SERVICE_LABELS } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'

const SERVICE_FALLBACKS: Record<string, string> = {
  portoes: PHOTOS.services.portoes,
  grades_e_cercas: PHOTOS.services.grades_e_cercas,
  escadas: PHOTOS.services.escadas,
  corrimoes: PHOTOS.services.corrimoes,
  estruturas_metalicas: PHOTOS.services.estruturas_metalicas,
  sob_medida: PHOTOS.services.sob_medida,
}

const DEFAULT_FALLBACKS = [
  PHOTOS.services.estruturas_metalicas,
  PHOTOS.services.portoes,
  PHOTOS.services.escadas,
]

interface Props { items: PortfolioItem[] }

export default function FeaturedProjects({ items }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const makeFallback = (i: number): PortfolioItem => ({
    id: `fallback-${i}`,
    project_id: null,
    slug: '',
    title: ['Portão Industrial — Cond. Alphaville', 'Escada Helicoidal — Residência Moema', 'Estrutura Metálica — Galpão SP'][i] ?? 'Projeto',
    short_desc: null,
    description: null,
    service: (['estruturas_metalicas', 'escadas', 'portoes'] as const)[i] ?? 'portoes',
    client_name: null,
    city: ['São Paulo', 'São Paulo', 'Guarulhos'][i] ?? 'São Paulo',
    year: 2024 - i,
    featured: true,
    published: true,
    cover_image: DEFAULT_FALLBACKS[i] ?? PHOTOS.services.portoes,
    images: [],
    seo_title: null,
    seo_description: null,
    sort_order: i,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  const displayItems = items.length >= 3
    ? items.slice(0, 3)
    : [...items, ...Array.from({ length: 3 - items.length }, (_, i) => makeFallback(items.length + i))]

  const [first, second, third] = displayItems

  return (
    <section
      ref={ref}
      className="py-28 sm:py-36 overflow-hidden"
      style={{ background: '#050608' }}
    >
      <div className="container mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Portfólio
            </span>
            <h2
              className="font-display font-black leading-[0.88]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
            >
              Projetos<br />
              <span style={{ color: 'rgba(240,241,242,0.2)' }}>em destaque</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group self-start sm:self-auto inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase transition-colors"
            style={{ color: '#5a6470' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4a040' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#5a6470' }}
          >
            Portfólio completo
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {/* Large item */}
          {first && (
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <ProjectCard item={first} large fallbackPhoto={SERVICE_FALLBACKS[first.service] ?? DEFAULT_FALLBACKS[0]} />
            </motion.div>
          )}

          {/* Two stacked */}
          <div className="lg:col-span-5 flex flex-col gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {second && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex-1"
              >
                <ProjectCard item={second} fallbackPhoto={SERVICE_FALLBACKS[second.service] ?? DEFAULT_FALLBACKS[1]} />
              </motion.div>
            )}
            {third && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex-1"
              >
                <ProjectCard item={third} fallbackPhoto={SERVICE_FALLBACKS[third.service] ?? DEFAULT_FALLBACKS[2]} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  item,
  large = false,
  fallbackPhoto,
}: {
  item: PortfolioItem & { city?: string | null; year?: number | null }
  large?: boolean
  fallbackPhoto: string
}) {
  const photo = item.cover_image || fallbackPhoto
  const href = item.slug ? `/portfolio/${item.slug}` : '/portfolio'

  return (
    <Link href={href} className="group block relative overflow-hidden h-full" style={{ minHeight: large ? '480px' : '240px', background: '#13161b' }}>
      {/* Photo */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-104"
        style={{
          backgroundImage: `url("${photo}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1)',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(5,6,8,0.45)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.3) 50%, transparent 100%)' }} />

      {/* Content */}
      <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end">
        <span
          className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2"
          style={{ color: '#c4a040' }}
        >
          {SERVICE_LABELS[item.service] ?? item.service}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3
            className="font-display font-bold text-[#f0f1f2] leading-tight"
            style={{ fontSize: large ? 'clamp(1.4rem, 2.5vw, 2rem)' : '1.15rem' }}
          >
            {item.title}
          </h3>
          <div
            className="w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-[#c4a040] group-hover:border-[#c4a040]"
            style={{ border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <ArrowUpRight className="w-4 h-4 text-[#f0f1f2] group-hover:text-[#050608] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
        {item.city && (
          <p className="text-[11px] font-mono mt-2" style={{ color: 'rgba(180,188,198,0.65)' }}>
            {item.city}{item.year ? ` · ${item.year}` : ''}
          </p>
        )}
      </div>
    </Link>
  )
}
