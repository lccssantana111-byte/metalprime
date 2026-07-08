'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/constants'
import ContactForm from '@/components/contact/ContactForm'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/animations'
import { trackWhatsAppClick } from '@/lib/gtm'
import { useWhatsAppNumber } from '@/components/providers/WhatsAppNumberProvider'

export default function ContatoContent() {
  const WHATSAPP_NUMBER = useWhatsAppNumber()

  const INFO_ITEMS = [
    {
      icon: Phone,
      title: 'Telefone / WhatsApp',
      value: COMPANY_PHONE,
      sub: '',
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    {
      icon: Mail,
      title: 'E-mail',
      value: COMPANY_EMAIL,
      sub: 'Respondemos em até 24h',
      href: `mailto:${COMPANY_EMAIL}`,
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: COMPANY_ADDRESS,
      sub: 'São Paulo, SP',
    },
    {
      icon: Clock,
      title: 'Horário de atendimento',
      value: 'Seg-Sex: 8h às 18h',
      sub: 'Sábado: 8h às 13h',
    },
  ]

  return (
    <section
      id="contato-form"
      style={{
        background: '#0f172a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 'clamp(5rem, 8vw, 7rem)',
        paddingBottom: 0,
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem, 4vw, 2rem)',
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
          className="contato-content-grid"
        >
          {/* Left — info panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="contato-info-panel"
            style={{ paddingBottom: 'clamp(5rem, 8vw, 7rem)', position: 'sticky', top: '6rem', alignSelf: 'start' }}
          >
            <div style={{
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {INFO_ITEMS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    gap: '1rem',
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Icon box */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(249,115,22,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <item.icon size={15} color="#f97316" />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-ibm-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: '0.4rem',
                    }}>
                      {item.title}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.85)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                        onClick={() => item.href?.includes('wa.me') && trackWhatsAppClick('contato_info_panel')}
                      >
                        {item.value}
                        <ArrowUpRight size={12} style={{ opacity: 0.5 }} />
                      </a>
                    ) : (
                      <p style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.85)',
                      }}>
                        {item.value}
                      </p>
                    )}
                    {item.sub && (
                      <p style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.35)',
                        marginTop: '2px',
                      }}>
                        {item.sub}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp row */}
              <motion.a
                variants={fadeUp}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(37,211,102,0.05)',
                  borderTop: '1px solid rgba(37,211,102,0.15)',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(37,211,102,0.1)'
                  el.style.borderColor = 'rgba(37,211,102,0.35)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(37,211,102,0.05)'
                  el.style.borderColor = 'rgba(37,211,102,0.15)'
                }}
                onClick={() => trackWhatsAppClick('contato_page_cta')}
              >
                <svg width="18" height="18" fill="#25D366" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                  }}>
                    Falar pelo WhatsApp
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-ibm-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    Resposta imediata
                  </p>
                </div>
                <ArrowUpRight size={14} color="rgba(255,255,255,0.35)" style={{ marginLeft: 'auto' }} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right — form panel */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="contato-form-panel"
            style={{ paddingBottom: 'clamp(5rem, 8vw, 7rem)' }}
          >
            {/* Heading */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 900,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                textTransform: 'uppercase',
                lineHeight: 0.95,
                letterSpacing: '0.01em',
                color: '#ffffff',
                marginBottom: '0.6rem',
              }}>
                Descreva o projeto
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
              }}>
                Empresa, contato e escopo. Nossa equipe técnica responde com uma proposta estruturada, não um orçamento genérico.
              </p>
            </div>

            {/* Form container with orange top bar */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: '3px solid #f97316',
            }}>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contato-content-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .contato-info-panel {
            position: static !important;
            padding-bottom: 0 !important;
          }
          .contato-form-panel {
            padding-bottom: clamp(3rem, 6vw, 5rem) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .contato-content-grid {
            grid-template-columns: 1fr 1.4fr !important;
          }
        }
      `}</style>
    </section>
  )
}
