'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { COMPANY_ADDRESS } from '@/lib/constants'
import { fadeUp } from '@/lib/animations'

export default function ContatoAddress() {
  return (
    <section style={{
      background: '#1e2535',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      paddingTop: 'clamp(3rem, 5vw, 5rem)',
      paddingBottom: 'clamp(3rem, 5vw, 5rem)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem, 4vw, 2rem)',
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}
          className="contato-address-grid"
        >
          {/* Left — address */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {/* Orange bar */}
            <div style={{
              width: '40px',
              height: '2px',
              background: '#f97316',
              marginBottom: '1.25rem',
            }} />

            {/* Mono label */}
            <p style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '0.75rem',
            }}>
              Localização
            </p>

            {/* Address */}
            <p style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}>
              {COMPANY_ADDRESS}
            </p>

            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '1.5rem',
            }}>
              São Paulo, SP
            </p>

            {/* Maps link */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-ibm-mono)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(249,115,22,0.7)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(249,115,22,0.7)')}
            >
              Ver no Google Maps
              <ArrowUpRight size={11} />
            </a>
          </motion.div>

          {/* Right — hours */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.15 }}
          >
            {/* Orange bar */}
            <div style={{
              width: '40px',
              height: '2px',
              background: '#f97316',
              marginBottom: '1.25rem',
            }} />

            {/* Mono label */}
            <p style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '1.25rem',
            }}>
              Horário de Atendimento
            </p>

            {/* Schedule rows */}
            {[
              { day: 'Seg - Sex', hours: '08h às 18h' },
              { day: 'Sábado', hours: '08h às 13h' },
            ].map((row, i) => (
              <div
                key={row.day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: i === 0 ? 0 : '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                }}>
                  {row.day}
                </span>
                <span style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  letterSpacing: '0.02em',
                  color: '#ffffff',
                }}>
                  {row.hours}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contato-address-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
