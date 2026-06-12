'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { PHOTOS } from '@/lib/images'
import { SectionLabel, SectionHeading, COLORS, TYPOGRAPHY } from '@/components/ui/design-system'
import { springEase } from '@/lib/animations'

interface Props {
  images?: string[]
  serviceSlug?: string
}

const GALLERY_FALLBACKS: Record<string, readonly string[]> = {
  'portoes':              PHOTOS.gallery.portoes,
  'grades-e-cercas':      PHOTOS.gallery.portoes,
  'escadas':              PHOTOS.gallery.escadas,
  'corrimoes':            PHOTOS.gallery.escadas,
  'estruturas-metalicas': PHOTOS.gallery.estruturas,
  'sob-medida':           PHOTOS.gallery.estruturas,
}

// Each cell defines its grid placement and aspect ratio
const CELL_CONFIGS = [
  { gridColumn: '1 / 3', gridRow: '1 / 3', aspectRatio: '4/3' },  // big hero
  { gridColumn: '3',     gridRow: '1',      aspectRatio: '1/1' },  // top-right
  { gridColumn: '3',     gridRow: '2',      aspectRatio: '1/1' },  // bottom-right
  { gridColumn: '1',     gridRow: '3',      aspectRatio: '16/9' }, // bottom-left strip
  { gridColumn: '2',     gridRow: '3',      aspectRatio: '16/9' }, // bottom-mid strip
  { gridColumn: '3',     gridRow: '3',      aspectRatio: '16/9' }, // bottom-right strip
] as const

export default function ServiceGallery({ images, serviceSlug }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const fallback = serviceSlug ? (GALLERY_FALLBACKS[serviceSlug] ?? PHOTOS.gallery.estruturas) : PHOTOS.gallery.estruturas
  const photos = (images && images.length >= 4 ? images : [...fallback]).slice(0, 6)

  const goNext = useCallback(() => {
    setActiveIndex(i => i === null ? null : (i + 1) % photos.length)
  }, [photos.length])

  const goPrev = useCallback(() => {
    setActiveIndex(i => i === null ? null : (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, goNext, goPrev])

  return (
    <>
      <section
        ref={ref}
        className="py-28 sm:py-36 overflow-hidden"
        style={{ background: COLORS.bg.dark }}
      >
        <div className="container mx-auto px-5 sm:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionLabel label="Galeria" />
            </div>
            <SectionHeading size="large" light>
              Projetos<br />
              <span style={{ color: COLORS.brand.orange }}>executados</span>
            </SectionHeading>
          </motion.div>

          {/* Desktop asymmetric grid */}
          <div
            className="hidden md:grid gap-3"
            style={{
              gridTemplateColumns: '2fr 1fr 1fr',
              gridTemplateRows: 'auto auto auto',
            }}
          >
            {photos.map((photo, i) => {
              const cell = CELL_CONFIGS[i]
              return (
                <GalleryCell
                  key={i}
                  photo={photo}
                  index={i}
                  inView={inView}
                  gridColumn={cell.gridColumn}
                  gridRow={cell.gridRow}
                  aspectRatio={cell.aspectRatio}
                  onClick={() => setActiveIndex(i)}
                />
              )
            })}
          </div>

          {/* Mobile 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {photos.map((photo, i) => (
              <GalleryCell
                key={i}
                photo={photo}
                index={i}
                inView={inView}
                gridColumn={i === 0 ? '1 / 3' : undefined}
                aspectRatio={i === 0 ? '16/9' : '1/1'}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(5,6,8,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            {/* Counter */}
            <div
              className="absolute top-6 left-6"
              style={{
                fontFamily: TYPOGRAPHY.families.mono,
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: COLORS.text.lightSubtle,
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </div>

            {/* Close */}
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center transition-colors"
              style={{ border: `1px solid ${COLORS.border.dark}`, color: COLORS.text.lightSubtle }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text.lightPrimary }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text.lightSubtle }}
              onClick={() => setActiveIndex(null)}
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Prev arrow */}
            <button
              className="absolute left-4 sm:left-8 w-12 h-12 flex items-center justify-center transition-colors"
              style={{ border: `1px solid ${COLORS.border.dark}`, color: COLORS.text.lightSubtle }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.brand.orange }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text.lightSubtle }}
              onClick={e => { e.stopPropagation(); goPrev() }}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={photos[activeIndex]}
                alt={`Projeto Metalprime ${activeIndex + 1}`}
                className="max-w-[calc(100vw-8rem)] max-h-[calc(100vh-8rem)] object-contain"
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next arrow */}
            <button
              className="absolute right-4 sm:right-8 w-12 h-12 flex items-center justify-center transition-colors"
              style={{ border: `1px solid ${COLORS.border.dark}`, color: COLORS.text.lightSubtle }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.brand.orange }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text.lightSubtle }}
              onClick={e => { e.stopPropagation(); goNext() }}
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface GalleryCellProps {
  photo: string
  index: number
  inView: boolean
  gridColumn?: string
  gridRow?: string
  aspectRatio: string
  onClick: () => void
}

function GalleryCell({ photo, index, inView, gridColumn, gridRow, aspectRatio, onClick }: GalleryCellProps) {
  return (
    <motion.button
      className="relative overflow-hidden group cursor-zoom-in"
      style={{
        gridColumn,
        gridRow,
        aspectRatio,
        background: '#1e2532',
        borderRadius: '2px',
        display: 'block',
        width: '100%',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: springEase }}
      onClick={onClick}
      aria-label={`Abrir foto ${index + 1}`}
    >
      {/* Image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url("${photo}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Bottom-up gradient reveal — scales up from bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
        style={{
          background: 'linear-gradient(to top, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.6) 60%, transparent 100%)',
        }}
      />

      {/* Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ border: `1px solid ${COLORS.border.darkMid}`, background: 'rgba(15,23,42,0.6)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: COLORS.text.lightPrimary }}>
            <circle cx="6" cy="6" r="4.5" />
            <line x1="9.5" y1="9.5" x2="13" y2="13" />
            <line x1="4" y1="6" x2="8" y2="6" />
            <line x1="6" y1="4" x2="6" y2="8" />
          </svg>
        </div>
      </div>
    </motion.button>
  )
}
