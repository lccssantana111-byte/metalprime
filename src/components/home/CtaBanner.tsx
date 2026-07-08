'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Clock, Wrench } from 'lucide-react'
import { COMPANY_PHONE } from '@/lib/constants'
import { useWhatsAppNumber } from '@/components/providers/WhatsAppNumberProvider'

const trust = [
  { icon: Wrench, text: 'Fabricação própria' },
  { icon: Clock, text: 'Orçamento em até 48 horas' },
  { icon: ShieldCheck, text: 'Instalação profissional' },
]

export default function CtaBanner() {
  const WHATSAPP_NUMBER = useWhatsAppNumber()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '560px',
        display: 'flex',
      }}
    >
      {/* Brushed metal texture */}
      <img
        src="/Brushed Metal Sheets.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />

      {/* Dark navy overlay — matches site palette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.80) 50%, rgba(15,23,42,0.55) 100%)',
        }}
      />

      {/* Orange ambient glow — top left */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-80px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          flexWrap: 'wrap',
        }}
      >
        {/* LEFT: Copy */}
        <motion.div
          style={{ flex: '1 1 380px', minWidth: 0 }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Amber rule */}
          <div
            style={{
              width: '40px',
              height: '2px',
              background: '#f97316',
              marginBottom: '1.25rem',
            }}
          />

          <h2
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              lineHeight: 0.95,
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              color: 'white',
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              margin: '0 0 1.25rem',
            }}
          >
            Vamos tirar seu projeto do papel.{' '}
            Solicite seu orçamento e{' '}
            <span style={{ color: '#f97316' }}>fale com nossa equipe especializada.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(148,163,184,0.9)',
              marginBottom: '1.5rem',
              maxWidth: '400px',
            }}
          >
            Conte com uma equipe especializada para desenvolver, fabricar e instalar soluções metálicas com qualidade, segurança e compromisso com os prazos.
          </p>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-6 sm:gap-y-3 items-start sm:items-center">
            {trust.map(({ icon: Icon, text }, i) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '12px',
                  color: 'rgba(148,163,184,0.75)',
                  fontFamily: 'var(--font-ibm-mono)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {i > 0 && (
                  <span aria-hidden="true" className="hidden sm:inline" style={{ color: 'rgba(249,115,22,0.35)', marginRight: '8px' }}>|</span>
                )}
                <Icon style={{ width: '13px', height: '13px', color: '#f97316', flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Contact card */}
        <motion.div
          style={{ flex: '0 1 380px', minWidth: 0 }}
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              background: 'rgba(15,23,42,0.75)',
              border: '1px solid rgba(249,115,22,0.25)',
              borderRadius: '16px',
              overflow: 'hidden',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Full-width amber top bar */}
            <div
              style={{
                height: '3px',
                background: 'linear-gradient(90deg, #f97316 0%, #fbbf24 50%, #f97316 100%)',
                width: '100%',
              }}
            />

            <div style={{ padding: '2rem 2.25rem 2.25rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#f97316',
                  marginBottom: '1rem',
                }}
              >
                Fale com a equipe técnica
              </p>

              {/* Phone number */}
              <a
                href={`tel:${COMPANY_PHONE}`}
                className="group/phone"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '1rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  opacity: 1,
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(249,115,22,0.12)',
                    border: '1px solid rgba(249,115,22,0.3)',
                    borderRadius: '10px',
                    flexShrink: 0,
                  }}
                >
                  <Phone style={{ width: '16px', height: '16px', color: '#f97316' }} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                    color: 'white',
                    letterSpacing: '0.02em',
                  }}
                >
                  {COMPANY_PHONE}
                </span>
              </a>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(249,115,22,0.2), transparent)',
                  marginBottom: '1rem',
                }}
              />

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  href="/orcamento"
                  className="cta-primary-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 20px',
                    borderRadius: '10px',
                    background: '#f97316',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.35)',
                    transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
                    cursor: 'pointer',
                  }}
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-whatsapp-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '14px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <MessageCircle style={{ width: '15px', height: '15px' }} />
                  Falar pelo WhatsApp
                </a>
              </div>

              {/* Bottom note */}
              <p
                style={{
                  marginTop: '0.875rem',
                  fontSize: '12px',
                  fontFamily: 'var(--font-ibm-mono)',
                  color: 'rgba(100,116,139,0.8)',
                  textAlign: 'center',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                +5.000 estruturas entregues · Grande São Paulo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
