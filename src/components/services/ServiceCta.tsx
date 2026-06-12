'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COMPANY_PHONE, WHATSAPP_NUMBER } from '@/lib/constants'
import { CTAButton, COLORS, TYPOGRAPHY } from '@/components/ui/design-system'
import { PHOTOS } from '@/lib/images'

interface Props {
  serviceName: string
}

export default function ServiceCta({ serviceName }: Props) {
  return (
    <section className="relative overflow-hidden" style={{ background: '#050608' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${PHOTOS.cta}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.98) 0%, rgba(5,6,8,0.75) 50%, rgba(5,6,8,0.6) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.65) 55%, rgba(15,23,42,0.3) 100%)' }} />
      </div>

      {/* Orange glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '-5%',
          width: '50%',
          height: '120%',
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-28 sm:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              style={{
                fontFamily: TYPOGRAPHY.families.mono,
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: COLORS.brand.orange,
                marginBottom: '1.5rem',
              }}
            >
              Próximo passo
            </p>

            <h2
              style={{
                fontFamily: TYPOGRAPHY.families.heading,
                fontWeight: 900,
                lineHeight: 0.9,
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                textTransform: 'uppercase',
                color: '#ffffff',
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              Pronto para<br />
              <span style={{ color: COLORS.brand.orange }}>começar?</span>
            </h2>

            <p
              style={{
                marginTop: '2rem',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'rgba(180,188,198,0.75)',
                maxWidth: '38ch',
              }}
            >
              Fale com nossos especialistas e receba um orçamento detalhado em até 24 horas.
            </p>
          </motion.div>

          {/* Right — glass card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: 'clamp(2rem, 4vw, 3rem)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Orange accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${COLORS.brand.orange}, transparent)`,
                }}
              />

              <p
                style={{
                  fontFamily: TYPOGRAPHY.families.mono,
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(180,188,198,0.5)',
                  marginBottom: '0.75rem',
                }}
              >
                Ligue agora
              </p>

              <a
                href={`tel:${COMPANY_PHONE}`}
                style={{
                  display: 'block',
                  fontFamily: TYPOGRAPHY.families.heading,
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1,
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  marginBottom: '2rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = COLORS.brand.orange }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
              >
                {COMPANY_PHONE}
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <CTAButton
                  variant="primary"
                  href="/orcamento"
                  iconCircle
                  icon={<ArrowRight style={{ width: '14px', height: '14px' }} />}
                >
                  Solicitar Orçamento Gratuito
                </CTAButton>
                <CTAButton
                  variant="ghost"
                  hrefExternal={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${serviceName.toLowerCase()}.`}
                  onDark
                >
                  Falar pelo WhatsApp
                </CTAButton>
              </div>

              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                {['Orçamento em 24h', 'Visita técnica gratuita', 'ART inclusa'].map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: TYPOGRAPHY.families.mono,
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(180,188,198,0.45)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
