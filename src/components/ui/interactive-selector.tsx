'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

export interface SelectorOption {
  id: string
  label: string
  description: string
  image: string
  icon: LucideIcon
  href: string
}

interface InteractiveSelectorProps {
  options: SelectorOption[]
  defaultIndex?: number
  height?: number
}

export default function InteractiveSelector({
  options,
  defaultIndex = 0,
  height = 520,
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="interactive-selector-outer">
      <div
        className="interactive-selector-wrap"
        style={{ display: 'flex', flexDirection: 'row', height, overflow: 'hidden' }}
      >
        {options.map((option, i) => {
          const Icon = option.icon
          const isActive = activeIndex === i

          return (
            <motion.div
              key={option.id}
              className={`interactive-selector-panel${isActive ? ' is-active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveIndex(i)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                minWidth: 52,
                transition: 'flex 0.55s cubic-bezier(0.32,0.72,0,1)',
                willChange: 'flex-grow',
              }}
            >
              {/* Background image */}
              <img
                src={option.image}
                alt={option.label}
                loading={i === 0 ? 'eager' : 'lazy'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: isActive ? 'scale(1.05)' : 'scale(1.02)',
                  transition: 'transform 0.7s cubic-bezier(0.32,0.72,0,1)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />

              {/* Permanent gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.3) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />

              {/* Adaptive scrim — darkens inactive panels */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isActive ? 'rgba(2,6,23,0.05)' : 'rgba(2,6,23,0.50)',
                transition: 'background 0.45s',
                pointerEvents: 'none',
              }} />

              {/* Panel number (top, inactive only) */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.30)',
                opacity: isActive ? 0 : 1,
                transition: 'opacity 0.3s',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Vertical label — inactive panels */}
              <motion.div
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  bottom: '2.25rem',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-90deg)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                {option.label}
              </motion.div>

              {/* Expanded content — active panel only */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.75rem 2rem',
                    }}
                  >
                    {/* Icon badge */}
                    <div style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: 'rgba(249,115,22,0.15)',
                      border: '1px solid rgba(249,115,22,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}>
                      <Icon size={18} color="#f97316" />
                    </div>

                    {/* Service name */}
                    <h3 style={{
                      fontFamily: 'var(--font-barlow-condensed)',
                      fontWeight: 900,
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      color: 'white',
                      lineHeight: 1,
                      margin: '0 0 0.5rem',
                    }}>
                      {option.label}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      color: 'rgba(203,213,225,0.85)',
                      margin: '0 0 1.25rem',
                      maxWidth: 260,
                      lineHeight: 1.5,
                    }}>
                      {option.description}
                    </p>

                    {/* CTA link */}
                    <Link
                      href={option.href}
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#f97316',
                        textDecoration: 'none',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    >
                      Ver serviço
                      <ArrowUpRight size={12} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <style>{`
        .interactive-selector-outer {
          width: 100%;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .interactive-selector-wrap {
            flex-direction: column !important;
            height: auto !important;
          }
          .interactive-selector-panel {
            flex: none !important;
            min-width: 0 !important;
            min-height: 120px;
            transition: min-height 0.45s cubic-bezier(0.32,0.72,0,1) !important;
          }
          .interactive-selector-panel.is-active {
            min-height: 340px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .interactive-selector-panel {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
