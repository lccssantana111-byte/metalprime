'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/types'
import { SERVICE_LABELS } from '@/lib/constants'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

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
      <div className="flex flex-wrap gap-0 mb-12" style={{ borderBottom: '1px solid #e2e8f0' }}>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className="relative px-5 py-3 text-sm font-medium transition-all duration-200"
            style={{ color: active === f.value ? '#0f172a' : '#94a3b8' }}
            onMouseEnter={(e) => {
              if (active !== f.value) (e.currentTarget as HTMLElement).style.color = '#64748b'
            }}
            onMouseLeave={(e) => {
              if (active !== f.value) (e.currentTarget as HTMLElement).style.color = '#94a3b8'
            }}
          >
            {f.label}
            {active === f.value && (
              <motion.div
                layoutId="filter-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: '#f97316' }}
              />
            )}
          </button>
        ))}
        <div className="ml-auto self-center text-xs font-mono" style={{ color: '#94a3b8' }}>
          {filtered.length} projeto{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardContainer containerClassName="w-full" className="w-full">
                <CardBody className="w-full rounded-2xl border border-slate-200 overflow-hidden bg-white">

                  {/* Image */}
                  <CardItem translateZ={60} className="w-full">
                    <Link href={`/portfolio/${item.slug}`} className="block relative aspect-[4/3] overflow-hidden" style={{ background: '#f1f5f9' }}>
                      {item.cover_image ? (
                        <img
                          src={item.cover_image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }}
                        >
                          <span
                            className="font-display font-black text-5xl text-transparent"
                            style={{ WebkitTextStroke: '1px #cbd5e1' }}
                          >
                            MP
                          </span>
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.55) 0%, transparent 60%)' }}
                      />
                    </Link>
                  </CardItem>

                  {/* Content */}
                  <div className="p-5">
                    <CardItem translateZ={30} className="block mb-1">
                      <span
                        className="text-[10px] font-mono tracking-[0.25em] uppercase"
                        style={{ color: '#f97316' }}
                      >
                        {SERVICE_LABELS[item.service]}
                      </span>
                    </CardItem>

                    <div className="flex items-start justify-between gap-3">
                      <CardItem translateZ={40} className="flex-1 min-w-0">
                        <h3
                          className="font-display font-bold text-base leading-snug"
                          style={{ color: '#0f172a' }}
                        >
                          {item.title}
                        </h3>
                        {(item.city || item.year) && (
                          <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                            {[item.city, item.year].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </CardItem>

                      <CardItem translateZ={50} className="shrink-0 mt-0.5">
                        <Link href={`/portfolio/${item.slug}`}>
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-[#f97316] hover:border-[#f97316] hover:text-white"
                            style={{ borderColor: '#e2e8f0', color: '#94a3b8' }}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      </CardItem>
                    </div>
                  </div>

                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div
            className="w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4"
            style={{ borderColor: '#e2e8f0', background: 'white' }}
          >
            <div className="w-4 h-4 rotate-45 rounded-sm" style={{ background: '#e2e8f0' }} />
          </div>
          <p style={{ color: '#64748b' }}>Nenhum projeto encontrado para este filtro.</p>
        </div>
      )}
    </div>
  )
}
