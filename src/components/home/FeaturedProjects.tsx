'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/types'
import { SERVICE_LABELS } from '@/lib/constants'

interface Props {
  items: PortfolioItem[]
}

export default function FeaturedProjects({ items }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (!items.length) return null

  const [first, second, third] = items.slice(0, 3)

  return (
    <section className="py-28 bg-carbon relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-brand" />
              <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
                Nosso trabalho
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
              Projetos<br />
              <span className="text-metal/40">em destaque</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm text-metal hover:text-white border border-white/10 hover:border-amber-brand/40 px-6 py-3 transition-all duration-200 self-start sm:self-auto"
          >
            Ver portfólio completo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Large item — left */}
          {first && (
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProjectCard item={first} large />
            </motion.div>
          )}

          {/* Two small items — right stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {second && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ProjectCard item={second} />
              </motion.div>
            )}
            {third && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ProjectCard item={third} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ item, large = false }: { item: PortfolioItem; large?: boolean }) {
  return (
    <Link href={`/portfolio/${item.slug}`} className="group block relative overflow-hidden">
      <div className={`relative bg-graphite overflow-hidden ${large ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
        {item.cover_image ? (
          <img
            src={item.cover_image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-steel to-graphite flex items-center justify-center">
            <span
              className="font-display font-black text-[10vw] text-transparent"
              style={{ WebkitTextStroke: '1px rgba(44,55,66,0.8)' }}
            >
              MP
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-brand mb-2">
            {SERVICE_LABELS[item.service]}
          </span>
          <div className="flex items-end justify-between gap-4">
            <h3 className={`font-display font-bold text-white leading-tight ${large ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
              {item.title}
            </h3>
            <div className="w-9 h-9 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-amber-brand group-hover:border-amber-brand transition-all duration-200 mb-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          {item.city && (
            <p className="text-xs text-metal-dark mt-2">
              {item.city}{item.year ? ` · ${item.year}` : ''}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
