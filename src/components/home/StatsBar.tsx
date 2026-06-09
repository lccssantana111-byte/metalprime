'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { value: 20,   suffix: '+', label: 'Anos de mercado' },
  { value: 5000, suffix: '+', label: 'Obras entregues' },
  { value: 500,  suffix: '+', label: 'Condomínios atendidos' },
  { value: 100,  suffix: '%', label: 'Projetos com ART' },
]

function CountUp({ target, duration = 1800, suffix = '' }: {
  target: number; duration?: number; suffix?: string
}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const raf = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, target, duration])

  const formatted = target >= 1000 ? value.toLocaleString('pt-BR') : value.toString()

  return <span ref={ref}>{formatted}{suffix}</span>
}

export default function StatsBar() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'white', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="py-14 sm:py-20 px-8 sm:px-12 flex flex-col justify-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid #f1f5f9' : 'none',
                borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none',
              }}
            >
              <div
                className="font-display font-black tabular-nums leading-none mb-3"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#0f172a', letterSpacing: '-0.03em' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: '#94a3b8' }}>
                {stat.label}
              </div>
              <div
                className="mt-4 w-8 h-0.5 rounded-full"
                style={{ background: '#f97316' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
