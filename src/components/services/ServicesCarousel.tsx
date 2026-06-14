'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'

interface Service {
  href: string
  name: string
  number: string
  tagline: string
  tags: string[]
  image: string
}

const GAP = 12
const SIDE_PAD = 64
const MOBILE_BREAKPOINT = 640

export default function ServicesCarousel({ services }: { services: Service[] }) {
  const total = services.length
  const items = [...services, ...services, ...services]

  const [idx, setIdx] = useState(total)
  const [animating, setAnimating] = useState(false)
  const [cardW, setCardW] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(total)

  const calcCardW = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return 0
    const isMobile = wrapper.clientWidth < MOBILE_BREAKPOINT
    const sidePad = isMobile ? 24 : SIDE_PAD
    const cols = isMobile ? 1 : 3
    const available = wrapper.clientWidth - sidePad * 2
    return (available - GAP * (cols - 1)) / cols
  }, [])

  const applyPos = useCallback((i: number, animated: boolean, w?: number) => {
    const el = trackRef.current
    if (!el) return
    const cw = w ?? cardW
    const s = cw + GAP
    const isMobile = (wrapperRef.current?.clientWidth ?? 0) < MOBILE_BREAKPOINT
    const sidePad = isMobile ? 24 : SIDE_PAD
    el.style.transition = animated
      ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
      : 'none'
    el.style.transform = `translateX(${sidePad - i * s}px)`
  }, [cardW])

  useEffect(() => {
    const init = () => {
      const w = calcCardW()
      setCardW(w)
      applyPos(idxRef.current, false, w)
    }
    init()
    window.addEventListener('resize', init)
    return () => window.removeEventListener('resize', init)
  }, [calcCardW, applyPos])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onEnd = () => {
      setAnimating(false)
      const cur = idxRef.current
      let next = cur
      if (cur >= total * 2) next = cur - total
      else if (cur < total) next = cur + total
      if (next !== cur) {
        idxRef.current = next
        setIdx(next)
        applyPos(next, false)
      }
    }
    el.addEventListener('transitionend', onEnd)
    return () => el.removeEventListener('transitionend', onEnd)
  }, [total, applyPos])

  const slide = (dir: 'prev' | 'next') => {
    if (animating) return
    setAnimating(true)
    const next = dir === 'next' ? idxRef.current + 1 : idxRef.current - 1
    idxRef.current = next
    setIdx(next)
    applyPos(next, true)
  }

  // Dot index: which service is the leftmost visible (0..total-1)
  const dotIdx = ((idxRef.current % total) + total) % total

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', paddingTop: '3.5rem', paddingBottom: '3rem' }}
    >
      {/* Edge fades — hint that more cards exist */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: `${SIDE_PAD + 24}px`,
        background: 'linear-gradient(90deg, #0a0f1e 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: `${SIDE_PAD + 24}px`,
        background: 'linear-gradient(270deg, #0a0f1e 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />

      {/* Track */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: `${GAP}px`, willChange: 'transform' }}
        >
          {items.map((s, i) => (
            <CarouselCard key={`${s.href}-${i}`} service={s} width={cardW} />
          ))}
        </div>
      </div>

      {/* Controls row: prev · dots · next */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        marginTop: '2rem',
        paddingBottom: '0.5rem',
      }}>
        {/* Prev */}
        <button
          onClick={() => slide('prev')}
          aria-label="Anterior"
          style={{
            width: '44px',
            height: '44px',
            background: '#f97316',
            border: '1px solid transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
            flexShrink: 0,
            boxShadow: '0 0 20px rgba(249,115,22,0.35)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#ea580c')}
          onMouseLeave={e => (e.currentTarget.style.background = '#f97316')}
        >
          <ArrowLeft style={{ width: '16px', height: '16px', color: '#ffffff' }} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {services.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === dotIdx ? '20px' : '5px',
                height: '5px',
                background: i === dotIdx ? '#f97316' : 'rgba(255,255,255,0.2)',
                transition: 'width 0.35s ease, background 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => slide('next')}
          aria-label="Próximo"
          style={{
            width: '44px',
            height: '44px',
            background: '#f97316',
            border: '1px solid transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
            flexShrink: 0,
            boxShadow: '0 0 20px rgba(249,115,22,0.35)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#ea580c')}
          onMouseLeave={e => (e.currentTarget.style.background = '#f97316')}
        >
          <ArrowRight style={{ width: '16px', height: '16px', color: '#ffffff' }} />
        </button>
      </div>
    </div>
  )
}

function CarouselCard({ service: s, width }: { service: Service; width: number }) {
  return (
    <Link
      href={s.href}
      data-card
      style={{
        flexShrink: 0,
        width: width > 0 ? `${width}px` : '300px',
        aspectRatio: '2/3',
        display: 'block',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        outline: '1px solid rgba(249,115,22,0.75)',
        outlineOffset: '-1px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        isolation: 'isolate',
      }}
      className="group"
    >
      <img
        src={s.image}
        alt={s.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: 'brightness(0.75) saturate(0.9)',
        }}
        className="group-hover:scale-[1.04] group-hover:![filter:brightness(0.6)_saturate(0.95)]"
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 20%, rgba(2,6,23,0.55) 50%, rgba(2,6,23,0.88) 75%, rgba(2,6,23,0.98) 100%)',
      }} />



      {/* Arrow chip — appears on hover */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          width: '32px',
          height: '32px',
          background: '#f97316',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'scale(0.75) translateY(-4px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
        className="group-hover:!opacity-100 group-hover:![transform:scale(1)_translateY(0)]"
      >
        <ArrowUpRight style={{ width: '13px', height: '13px', color: '#ffffff' }} />
      </div>

      {/* Bottom content */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '2rem 1.75rem 1.75rem',
      }}>
        {/* Orange bar */}
        <div style={{
          width: '1.5rem',
          height: '2px',
          background: '#f97316',
          marginBottom: '0.875rem',
          transition: 'width 0.35s ease',
        }}
          className="group-hover:!w-[3.5rem]"
        />

        <h2 style={{
          fontFamily: 'var(--font-barlow-condensed)',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 2.2vw, 2.5rem)',
          lineHeight: 0.92,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.02em',
          color: '#ffffff',
          margin: '0 0 0.6rem',
        }}>
          {s.name}
        </h2>

        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.72)',
          lineHeight: 1.55,
          margin: 0,
          maxWidth: '24ch',
          transition: 'color 0.3s',
        }}
          className="group-hover:!text-[rgba(255,255,255,0.92)]"
        >
          {s.tagline}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginTop: '0.875rem',
          opacity: 0,
          transform: 'translateY(6px)',
          transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s',
        }}
          className="group-hover:!opacity-100 group-hover:!translate-y-0"
        >
          {s.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.25)',
              padding: '2px 6px',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
