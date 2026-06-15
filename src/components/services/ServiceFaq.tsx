'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SectionLabel, SectionHeading, COLORS, TYPOGRAPHY, SPACING } from '@/components/ui/design-system'
import { springEase, fadeUp, staggerContainer } from '@/lib/animations'
import type { ServiceFaq as Faq } from '@/types'

interface Props {
  faq: Faq[]
}

export default function ServiceFaq({ faq }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState<number | null>(0)

  if (!faq.length) return null

  return (
    <section
      ref={ref}
      style={{
        background: '#f4f4f0',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(2.5rem, 6vw, 6rem) 0',
      }}
    >
      {/* Dot grid — light version, matches ProcessSection */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: `0 ${SPACING.container.paddingX}`,
        position: 'relative',
        zIndex: 1,
      }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: 'clamp(1.5rem, 6vw, 6rem)', alignItems: 'start' }}
        >

          {/* ── Left: header ─────────────────────────────────── */}
          <motion.div
            className="lg:col-span-4"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ position: 'sticky', top: '8rem' }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
              <SectionLabel label="FAQ" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <SectionHeading size="large">
                Perguntas<br />
                <span style={{ color: COLORS.brand.orange }}>frequentes</span>
              </SectionHeading>
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: TYPOGRAPHY.families.body,
                fontSize: '14px',
                lineHeight: 1.8,
                color: COLORS.text.muted,
                marginTop: '1.5rem',
                maxWidth: '32ch',
              }}
            >
              Tire as principais dúvidas sobre processo, prazos e garantias antes de solicitar seu orçamento.
            </motion.p>

            {/* Ghost counter */}
            <motion.div
              variants={fadeUp}
              style={{ marginTop: '3rem', display: 'flex', alignItems: 'baseline', gap: '6px' }}
            >
              <span style={{
                fontFamily: TYPOGRAPHY.families.heading,
                fontWeight: 900,
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                lineHeight: 1,
                color: 'rgba(15,23,42,0.06)',
                letterSpacing: '-0.02em',
              }}>
                {String(faq.length).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: TYPOGRAPHY.families.mono,
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(15,23,42,0.25)',
              }}>
                respostas
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: accordion ─────────────────────────────── */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: springEase }}
          >
            <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)' }}>
              {faq.map((item, i) => {
                const isOpen = open === i

                return (
                  <div
                    key={i}
                    style={{
                      borderBottom: '1px solid rgba(15,23,42,0.08)',
                      position: 'relative',
                      background: isOpen ? '#ffffff' : 'transparent',
                      transition: 'background 0.25s',
                    }}
                  >
                    {/* Orange left rail when open */}
                    {isOpen && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '3px',
                          background: COLORS.brand.orange,
                          transformOrigin: 'top',
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.25, ease: springEase }}
                      />
                    )}

                    {/* Trigger */}
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        padding: isOpen ? '1.75rem 1.75rem 1.25rem' : '1.75rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        {/* Number */}
                        <span style={{
                          fontFamily: TYPOGRAPHY.families.mono,
                          fontSize: '10px',
                          letterSpacing: '0.2em',
                          color: isOpen ? COLORS.brand.orange : 'rgba(15,23,42,0.25)',
                          flexShrink: 0,
                          transition: 'color 0.2s',
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Question */}
                        <span style={{
                          fontFamily: TYPOGRAPHY.families.body,
                          fontWeight: isOpen ? 600 : 500,
                          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                          lineHeight: 1.45,
                          color: isOpen ? COLORS.text.dark : COLORS.text.body,
                          transition: 'color 0.2s',
                        }}>
                          {item.question}
                        </span>
                      </div>

                      {/* Icon */}
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: `1px solid ${isOpen ? COLORS.brand.orange : 'rgba(15,23,42,0.15)'}`,
                        background: isOpen ? COLORS.brand.orange : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                      }}>
                        {isOpen
                          ? <Minus style={{ width: '13px', height: '13px', color: '#ffffff' }} />
                          : <Plus style={{ width: '13px', height: '13px', color: 'rgba(15,23,42,0.4)' }} />
                        }
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: springEase }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{
                            padding: '0 1.75rem 2rem',
                            paddingLeft: 'calc(1.75rem + 1rem + 10px)',
                          }}>
                            {/* Divider */}
                            <div style={{
                              width: '32px',
                              height: '2px',
                              background: COLORS.brand.orange,
                              marginBottom: '1rem',
                            }} />
                            <p style={{
                              fontFamily: TYPOGRAPHY.families.body,
                              fontSize: '14px',
                              lineHeight: 1.85,
                              color: COLORS.text.body,
                              margin: 0,
                              maxWidth: '64ch',
                            }}>
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
