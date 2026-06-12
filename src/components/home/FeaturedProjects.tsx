'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const dragStartX = useRef<number | null>(null)
  const isAnimating = useRef(false)

  const makeFallback = (i: number): PortfolioItem => ({
    id: `fallback-${i}`,
    project_id: null,
    slug: '',
    title: ['Portão Industrial — Cond. Alphaville', 'Escada Helicoidal — Residência Moema', 'Estrutura Metálica — Galpão SP'][i % 3] ?? 'Projeto',
    short_desc: null,
    description: null,
    service: (['estruturas_metalicas', 'escadas', 'portoes'] as const)[i % 3] ?? 'portoes',
    client_name: null,
    city: ['São Paulo', 'São Paulo', 'Guarulhos'][i % 3] ?? 'São Paulo',
    year: 2024 - (i % 3),
    featured: true,
    published: true,
    cover_image: DEFAULT_FALLBACKS[i % 3] ?? PHOTOS.services.portoes,
    images: [],
    seo_title: null,
    seo_description: null,
    sort_order: i,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  // Pad items to a multiple of 3
  const allItems: PortfolioItem[] = (() => {
    if (items.length === 0) return [makeFallback(0), makeFallback(1), makeFallback(2)]
    const rem = items.length % 3
    if (rem === 0) return items
    return [...items, ...Array.from({ length: 3 - rem }, (_, i) => makeFallback(items.length + i))]
  })()

  // Group into slides of 3
  const slides: [PortfolioItem, PortfolioItem, PortfolioItem][] = []
  for (let i = 0; i < allItems.length; i += 3) {
    slides.push([allItems[i], allItems[i + 1], allItems[i + 2]])
  }
  const totalSlides = slides.length

  const goTo = (index: number) => {
    if (isAnimating.current || index === activeSlide) return
    isAnimating.current = true
    setDirection(index > activeSlide ? 1 : -1)
    setActiveSlide(index)
  }
  const goNext = () => activeSlide < totalSlides - 1 && goTo(activeSlide + 1)
  const goPrev = () => activeSlide > 0 && goTo(activeSlide - 1)

  const onPointerDown = (e: React.PointerEvent) => { dragStartX.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    dragStartX.current = null
    if (delta < -50) goNext()
    else if (delta > 50) goPrev()
  }

  const getFallback = (item: PortfolioItem) =>
    SERVICE_FALLBACKS[item.service] ?? DEFAULT_FALLBACKS[0]

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section
      ref={ref}
      style={{
        background: '#0c1220',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 0 5rem',
        overflow: 'hidden',
        colorScheme: 'dark',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Left */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#f97316',
              display: 'block',
              marginBottom: '0.75rem',
            }}>
              Portfólio
            </span>
            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              lineHeight: 0.95,
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              margin: 0,
              color: 'white',
            }}>
              Obras que falam{' '}
              <span style={{ color: '#f97316' }}>por si.</span>
            </h2>
          </div>

          {/* Right — counter */}
          <span
            className="fp-header-right"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(148,163,184,0.55)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              paddingBottom: '4px',
            }}
          >
            {String(allItems.length).padStart(2, '0')} obras em destaque
          </span>
        </motion.div>

        {/* Horizontal rule */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.07)',
          marginBottom: '2rem',
        }} />

        {/* Carousel */}
        <div
          className="fp-carousel-track"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{ userSelect: 'none' }}
        >
          <AnimatePresence
            mode="wait"
            custom={direction}
            onExitComplete={() => { isAnimating.current = false }}
          >
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease }}
              className="fp-grid"
              style={{ display: 'grid', gap: '3px', background: '#0c1220' }}
            >
              {/* Card 1 — large, spans 2 rows */}
              <motion.div
                className="fp-card-span"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 0.75, delay: 0.1, ease }}
                style={{ gridRow: '1 / 3', willChange: 'clip-path' }}
              >
                <ProjectCard
                  item={slides[activeSlide][0]}
                  isLarge
                  fallbackPhoto={getFallback(slides[activeSlide][0])}
                />
              </motion.div>

              {/* Card 2 — top right */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 0.75, delay: 0.25, ease }}
                style={{ willChange: 'clip-path' }}
              >
                <ProjectCard
                  item={slides[activeSlide][1]}
                  isLarge={false}
                  fallbackPhoto={getFallback(slides[activeSlide][1])}
                />
              </motion.div>

              {/* Card 3 — bottom right */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 0.75, delay: 0.35, ease }}
                style={{ willChange: 'clip-path' }}
              >
                <ProjectCard
                  item={slides[activeSlide][2]}
                  isLarge={false}
                  fallbackPhoto={getFallback(slides[activeSlide][2])}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <CarouselControls
          total={totalSlides}
          active={activeSlide}
          onPrev={goPrev}
          onNext={goNext}
          onGoTo={goTo}
        />

        {/* CTA abaixo dos cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
        >
          <PortfolioButton />
        </motion.div>

      </div>

      <style>{`
        .fp-grid {
          grid-template-columns: 1.2fr 1fr;
        }
        .fp-carousel-track {
          overflow: hidden;
          position: relative;
        }
        @media (max-width: 680px) {
          .fp-grid {
            grid-template-columns: 1fr !important;
          }
          .fp-card-large,
          .fp-card-small {
            height: 260px !important;
          }
          .fp-card-span {
            grid-row: auto !important;
          }
          .fp-header-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

function PortfolioButton() {
  return (
    <Link
      href="/portfolio"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '13px 14px 13px 26px',
        borderRadius: '999px',
        background: '#f97316',
        color: 'white',
        fontSize: '14px',
        fontWeight: 700,
        textDecoration: 'none',
        boxShadow: '0 4px 24px rgba(249,115,22,0.4)',
        transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = '#ea580c'
        el.style.boxShadow = '0 8px 36px rgba(249,115,22,0.5)'
        el.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = '#f97316'
        el.style.boxShadow = '0 4px 24px rgba(249,115,22,0.4)'
        el.style.transform = 'translateY(0)'
      }}
    >
      Ver todo o portfólio
      <span style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <ArrowUpRight style={{ width: '14px', height: '14px' }} />
      </span>
    </Link>
  )
}

function CarouselControls({
  total,
  active,
  onPrev,
  onNext,
  onGoTo,
}: {
  total: number
  active: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (i: number) => void
}) {
  if (total <= 1) return null

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '1.5rem',
    }}>
      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            style={{
              width: i === active ? '24px' : '6px',
              height: '6px',
              background: i === active ? '#f97316' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
              borderRadius: 0,
            }}
          />
        ))}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'rgba(148,163,184,0.4)',
          marginLeft: '8px',
        }}>
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Prev / Next */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <NavButton onClick={onPrev} disabled={active === 0} direction="prev" />
        <NavButton onClick={onNext} disabled={active === total - 1} direction="next" />
      </div>
    </div>
  )
}

function NavButton({
  onClick,
  disabled,
  direction,
}: {
  onClick: () => void
  disabled: boolean
  direction: 'prev' | 'next'
}) {
  const [hovered, setHovered] = useState(false)
  const isPrev = direction === 'prev'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isPrev ? 'Slide anterior' : 'Próximo slide'}
      style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: disabled
          ? 'rgba(255,255,255,0.08)'
          : hovered ? '#f97316' : 'rgba(255,255,255,0.2)',
        background: hovered && !disabled ? '#f97316' : 'transparent',
        color: disabled ? 'rgba(255,255,255,0.30)' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.25s ease, border-color 0.25s ease, color 0.25s ease',
        borderRadius: 0,
        padding: 0,
      }}
    >
      {isPrev
        ? <ChevronLeft style={{ width: '16px', height: '16px' }} />
        : <ChevronRight style={{ width: '16px', height: '16px' }} />
      }
    </button>
  )
}

function ProjectCard({
  item,
  isLarge,
  fallbackPhoto,
}: {
  item: PortfolioItem & { city?: string | null; year?: number | null }
  isLarge: boolean
  fallbackPhoto: string
}) {
  const [hovered, setHovered] = useState(false)
  const photo = item.cover_image || fallbackPhoto
  const href = item.slug ? `/portfolio/${item.slug}` : '/portfolio'

  return (
    <div
      className={isLarge ? 'fp-card-large' : 'fp-card-small'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: isLarge ? '480px' : '236px',
        overflow: 'hidden',
        background: '#1e293b',
        borderRadius: 0,
        cursor: 'pointer',
      }}
    >
      {/* Image with hover zoom */}
      <img
        src={photo}
        alt={item.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s ease',
          willChange: 'transform',
        }}
      />

      {/* Base tint */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', zIndex: 1 }} />

      {/* Gradient push-up */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.3) 45%, transparent 70%)',
        zIndex: 2,
      }} />

      {/* Content block */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '1.5rem',
        zIndex: 3,
      }}>
        {/* Service label */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#fb923c',
          display: 'block',
          marginBottom: '8px',
        }}>
          [ {SERVICE_LABELS[item.service] ?? item.service} ]
        </span>

        {/* Title + arrow row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: 'white',
            lineHeight: 1.1,
            fontSize: isLarge ? 'clamp(1.2rem, 2vw, 1.6rem)' : '1.1rem',
            margin: 0,
          }}>
            {item.title}
          </h3>

          {/* Arrow button */}
          <Link
            href={href}
            onClick={e => e.stopPropagation()}
            aria-label={`Ver projeto: ${item.title}`}
            style={{ flexShrink: 0 }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: hovered ? '#f97316' : 'rgba(255,255,255,0.2)',
              background: hovered ? '#f97316' : 'transparent',
              color: 'white',
              transition: 'background 0.25s ease, border-color 0.25s ease',
              borderRadius: 0,
            }}>
              <ArrowUpRight style={{ width: '14px', height: '14px' }} />
            </div>
          </Link>
        </div>

        {/* Meta */}
        {(item.city || item.year) && (
          <p style={{
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(148,163,184,0.7)',
            margin: '8px 0 0',
          }}>
            {[item.city, item.year].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      {/* Orange left-edge bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: '#f97316',
          transformOrigin: 'bottom center',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 4,
        }}
      />

      {/* Full-area link */}
      <Link
        href={href}
        style={{ position: 'absolute', inset: 0, zIndex: 5 }}
        aria-label={item.title}
      />
    </div>
  )
}
