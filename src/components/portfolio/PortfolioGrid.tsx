'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/types'
import { SERVICE_LABELS } from '@/lib/constants'

const filters = [
  { value: 'todos', label: 'Todos' },
  { value: 'portoes', label: 'Portões' },
  { value: 'grades_e_cercas', label: 'Grades' },
  { value: 'escadas', label: 'Escadas' },
  { value: 'corrimoes', label: 'Corrimões' },
  { value: 'estruturas_metalicas', label: 'Estruturas' },
  { value: 'sob_medida', label: 'Sob Medida' },
]

interface Props {
  items: PortfolioItem[]
}

export default function PortfolioGrid({ items }: Props) {
  const [active, setActive] = useState('todos')

  const filtered = active === 'todos' ? items : items.filter((i) => i.service === active)

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-0 mb-12 border-b border-white/5 pb-0">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`relative px-5 py-3 text-sm font-medium transition-all duration-200 ${
              active === f.value
                ? 'text-white'
                : 'text-metal hover:text-metal-light'
            }`}
          >
            {f.label}
            {active === f.value && (
              <motion.div
                layoutId="filter-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-brand"
              />
            )}
          </button>
        ))}
        <div className="ml-auto self-center text-xs text-metal-dark">
          {filtered.length} projeto{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link href={`/portfolio/${item.slug}`} className="group block">
                <div className="relative bg-graphite overflow-hidden aspect-[4/3]">
                  {item.cover_image ? (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-steel to-graphite flex items-center justify-center">
                      <span
                        className="font-display font-black text-5xl text-transparent"
                        style={{ WebkitTextStroke: '1px rgba(44,55,66,0.8)' }}
                      >
                        MP
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-transparent to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Content on hover */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-brand">
                        {SERVICE_LABELS[item.service]}
                      </span>
                      <div className="flex items-end justify-between gap-3 mt-1.5">
                        <h3 className="font-display font-bold text-white text-base leading-tight">
                          {item.title}
                        </h3>
                        <div className="w-8 h-8 border border-white/20 group-hover:bg-amber-brand group-hover:border-amber-brand flex items-center justify-center shrink-0 transition-all duration-200 mb-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-carbon" />
                        </div>
                      </div>
                      {(item.city || item.year) && (
                        <p className="text-xs text-metal-dark mt-1.5">
                          {[item.city, item.year].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="w-12 h-12 border border-amber-brand/20 flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 bg-amber-brand/20 rotate-45" />
          </div>
          <p className="text-metal">Nenhum projeto encontrado para este filtro.</p>
        </div>
      )}
    </div>
  )
}
