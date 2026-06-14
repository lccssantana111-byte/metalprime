'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { ServiceFeature } from '@/types'
import { COLORS, TYPOGRAPHY } from '@/components/ui/design-system'
import { springEase } from '@/lib/animations'

interface Props {
  features: ServiceFeature[]
}

export default function ServiceFeatures({ features }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    if (!inView || !features.length) return
    let i = 0

    function run() {
      setActiveCard(i)
      i = i >= features.length - 1 ? 0 : i + 1
    }

    run()
    const id = setInterval(run, 900)
    return () => clearInterval(id)
  }, [inView])

  if (!features.length) return null

  return (
    <section
      ref={ref}
      className="overflow-hidden"
      style={{ background: '#eeeae3' }}
    >
      <div className="container mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-6">

        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: springEase }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <p style={{
              fontFamily: TYPOGRAPHY.families.mono,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.brand.orange,
              marginBottom: '1.25rem',
            }}>
              Diferenciais
            </p>
            <h2 style={{
              fontFamily: TYPOGRAPHY.families.heading,
              fontWeight: 900,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              color: '#0f172a',
              margin: 0,
            }}>
              Por que a<br />
              <span style={{ color: COLORS.brand.orange }}>Metal Shark</span>
            </h2>
          </div>

        </motion.div>
      </div>

      {/* Cards — full bleed grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
      >
        {features.map((feature, i) => {
          const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[feature.icon]
            ?? LucideIcons.Wrench

          const isActive = activeCard === i
          const cardBg = isActive ? '#0f172a' : i % 2 === 0 ? '#eeeae3' : '#e6e1d9'

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: cardBg,
                borderRight: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'background 0.25s ease',
              }}
              className="group"
            >
              {/* Hover fill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#d9d4cb',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                  pointerEvents: 'none',
                }}
                className={!isActive ? 'group-hover:opacity-100' : ''}
              />

              {/* Orange top accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: isActive ? COLORS.brand.orange : 'transparent',
                transition: 'background 0.4s ease',
              }}
              className={!isActive ? 'group-hover:!bg-orange-400' : ''}
              />

              <div className="relative z-10 p-8 lg:p-10 flex flex-col items-center text-center">

                {/* Icon */}
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'rgba(249,115,22,0.15)' : '#ffffff',
                    border: isActive ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: isActive ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'background 0.25s ease, border-color 0.25s ease',
                  }}>
                    <Icon className="w-5 h-5" style={{ color: COLORS.brand.orange }} />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 style={{
                    fontFamily: TYPOGRAPHY.families.heading,
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    color: isActive ? '#ffffff' : '#0f172a',
                    marginBottom: '0.75rem',
                    lineHeight: 1.15,
                    transition: 'color 0.25s ease',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.4,
                    color: isActive ? 'rgba(255,255,255,0.6)' : '#6a7a8a',
                    transition: 'color 0.25s ease',
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
