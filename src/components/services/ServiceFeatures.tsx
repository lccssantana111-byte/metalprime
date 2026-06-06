'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import * as LucideIcons from 'lucide-react'
import type { ServiceFeature } from '@/types'

interface Props {
  features: ServiceFeature[]
}

export default function ServiceFeatures({ features }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  if (!features.length) return null

  return (
    <section className="py-24 bg-graphite relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#8c97a0 1px, transparent 1px), linear-gradient(90deg, #8c97a0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Nosso diferencial</span>
          </div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none">
            Por que escolher a Metalprime?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {features.map((feature, i) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[feature.icon] ?? LucideIcons.Star

            return (
              <motion.div
                key={feature.title}
                className="bg-graphite p-8 hover:bg-steel/20 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 border border-amber-brand/30 group-hover:border-amber-brand/60 flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-5 h-5 text-amber-brand" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 leading-tight">{feature.title}</h3>
                <p className="text-sm text-metal leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
