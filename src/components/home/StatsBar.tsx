'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { value: 20, suffix: '+', unit: 'anos', label: 'no mercado paulistano' },
  { value: 5000, suffix: '+', unit: 'projetos', label: 'executados com ART' },
  { value: 500, suffix: '+', unit: 'condomínios', label: 'atendidos em SP' },
  { value: 100, suffix: '%', unit: '', label: 'satisfação garantida' },
]

function CountUp({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(false)
  const inViewRef = useRef(null)
  const inView = useInView(inViewRef, { once: true })

  useEffect(() => {
    if (!inView || ref.current) return
    ref.current = true
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return (
    <span ref={inViewRef}>
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-graphite border-y border-white/5 py-0 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative py-10 px-6 flex flex-col justify-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* Subtle top accent on first */}
              {i === 0 && (
                <div className="absolute top-0 left-6 w-12 h-0.5 bg-amber-brand" />
              )}

              <div className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
                {stat.unit && (
                  <span className="text-amber-brand text-xl lg:text-2xl ml-1 font-bold">{stat.unit}</span>
                )}
              </div>
              <p className="text-xs text-metal-dark tracking-wide leading-tight mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
