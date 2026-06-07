'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { PHOTOS } from '@/lib/images'
import type { ServiceType } from '@/types'

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

export default function ServiceGallery({ images, serviceSlug }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const fallback = serviceSlug ? (GALLERY_FALLBACKS[serviceSlug] ?? PHOTOS.gallery.estruturas) : PHOTOS.gallery.estruturas
  const photos = (images && images.length >= 4 ? images : [...fallback]).slice(0, 6)

  return (
    <>
      <section
        ref={ref}
        className="py-28 sm:py-36 overflow-hidden"
        style={{ background: '#050608' }}
      >
        <div className="container mx-auto px-5 sm:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase block mb-6" style={{ color: 'rgba(196,160,64,0.7)' }}>
              Galeria
            </span>
            <h2
              className="font-display font-black leading-[0.88]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#f0f1f2', letterSpacing: '-0.02em' }}
            >
              Projetos<br />
              <span style={{ color: 'rgba(240,241,242,0.18)' }}>executados</span>
            </h2>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {photos.map((photo, i) => (
              <motion.button
                key={i}
                className="relative overflow-hidden group cursor-zoom-in"
                style={{
                  aspectRatio: i === 0 ? '4/3' : '1/1',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                  background: '#13161b',
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                onClick={() => setLightbox(photo)}
                aria-label={`Ampliar foto ${i + 1}`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(5,6,8,0.5)' }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ background: 'rgba(196,160,64,0.15)', border: '1px solid rgba(196,160,64,0.4)' }}
                  >
                    <ZoomIn className="w-4 h-4" style={{ color: '#c4a040' }} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgba(5,6,8,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#b4bcc6' }}
              onClick={() => setLightbox(null)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f0f1f2' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#b4bcc6' }}
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
            <motion.img
              src={lightbox}
              alt="Projeto Metalprime"
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: 'calc(100vh - 80px)' }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
