'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
    <section
      ref={ref}
      className="py-28 sm:py-36 overflow-hidden"
      style={{ background: '#0c0e11' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
            Diferenciais
          </span>
          <h2
            className="font-display font-black leading-[0.88]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
          >
            Por que a<br />
            <span style={{ color: 'rgba(240,241,242,0.2)' }}>Metalprime</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {features.map((feature, i) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[feature.icon]
              ?? LucideIcons.Wrench

            return (
              <motion.div
                key={feature.title}
                className="p-8 lg:p-10 group transition-colors duration-300"
                style={{ background: '#0c0e11' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#13161b' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0c0e11' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-8 transition-all duration-300 group-hover:border-[#c4a040]/50"
                  style={{ background: 'rgba(196,160,64,0.07)', border: '1px solid rgba(196,160,64,0.18)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#c4a040' }} />
                </div>
                <h3
                  className="font-display font-bold mb-4 leading-tight"
                  style={{ fontSize: '1.1rem', color: '#f0f1f2' }}
                >
                  {feature.title}
                </h3>
                <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(180,188,198,0.45)' }}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
