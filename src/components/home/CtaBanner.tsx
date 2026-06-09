'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Clock, Wrench } from 'lucide-react'
import { COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'
import { PHOTOS } from '@/lib/images'

const trust = [
  { icon: ShieldCheck, text: 'ART em 100% dos projetos' },
  { icon: Clock, text: 'Resposta em 24h úteis' },
  { icon: Wrench, text: 'Visita técnica gratuita' },
]

export default function CtaBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        colorScheme: 'light',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '640px',
        display: 'flex',
      }}
    >
      {/* Full-bleed photo */}
      <img
        src={PHOTOS.cta}
        alt="MetalPrime — estrutura metálica em São Paulo"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
        }}
      />

      {/* Gradient overlay — strong left, lighter right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(2,6,23,0.96) 0%, rgba(2,6,23,0.88) 45%, rgba(2,6,23,0.65) 100%)',
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(2,6,23,0.5) 0%, transparent 50%)',
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
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#f97316',
              display: 'block',
              marginBottom: '2rem',
            }}
          >
            Vamos conversar
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              lineHeight: 0.92,
              fontSize: 'clamp(3rem, 6vw, 6.5rem)',
              color: 'white',
              letterSpacing: '-0.03em',
              margin: '0 0 2rem',
            }}
          >
            Seu projeto<br />
            começa com<br />
            <span style={{ color: '#f97316' }}>uma ligação.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(148,163,184,0.9)',
              marginBottom: '2.5rem',
              maxWidth: '400px',
            }}
          >
            Somos a empresa de serralheria com mais obras entregues na Grande São Paulo —
            fabricação própria, ART em todos os projetos estruturais.
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {trust.map(({ icon: Icon, text }) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '13px',
                  color: 'rgba(148,163,184,0.8)',
                }}
              >
                <Icon style={{ width: '14px', height: '14px', color: '#f97316', flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Contact card */}
        <motion.div
          style={{ flex: '0 1 380px', minWidth: 0 }}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '2.5rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Orange top accent */}
            <div
              style={{
                height: '3px',
                background: '#f97316',
                borderRadius: '2px',
                marginBottom: '2rem',
                width: '48px',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#64748b',
                marginBottom: '1rem',
              }}
            >
              Ligue agora
            </p>

            {/* Phone number */}
            <a
              href={`tel:${COMPANY_PHONE}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '2rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff7ed',
                  borderRadius: '12px',
                  flexShrink: 0,
                }}
              >
                <Phone style={{ width: '18px', height: '18px', color: '#f97316' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: 'white',
                  letterSpacing: '-0.02em',
                }}
              >
                {COMPANY_PHONE}
              </span>
            </a>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem' }} />

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/orcamento"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '16px 28px',
                  borderRadius: '999px',
                  background: '#f97316',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
                  transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#ea580c'
                  el.style.boxShadow = '0 6px 28px rgba(249,115,22,0.5)'
                  el.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#f97316'
                  el.style.boxShadow = '0 4px 20px rgba(249,115,22,0.4)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                Solicitar Orçamento Gratuito
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '15px 28px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.35)'
                  el.style.color = 'white'
                  el.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.18)'
                  el.style.color = 'rgba(255,255,255,0.8)'
                  el.style.background = 'transparent'
                }}
              >
                <MessageCircle style={{ width: '16px', height: '16px' }} />
                Falar pelo WhatsApp
              </a>
            </div>

            {/* Bottom note */}
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(100,116,139,0.7)',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              +5.000 obras entregues · Grande São Paulo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
