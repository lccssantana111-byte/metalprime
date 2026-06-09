'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Clock, Mail, Phone } from 'lucide-react'
import {
  BRAND_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  WHATSAPP_NUMBER,
} from '@/lib/constants'

const services = [
  { label: 'Portões', href: '/servicos/portoes', code: 'SRV-01' },
  { label: 'Grades e Cercas', href: '/servicos/grades-e-cercas', code: 'SRV-02' },
  { label: 'Escadas Metálicas', href: '/servicos/escadas', code: 'SRV-03' },
  { label: 'Corrimões', href: '/servicos/corrimoes', code: 'SRV-04' },
  { label: 'Estruturas Metálicas', href: '/servicos/estruturas-metalicas', code: 'SRV-05' },
  { label: 'Projetos Sob Medida', href: '/servicos/sob-medida', code: 'SRV-06' },
]

const company = [
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Solicitar Orçamento', href: '/orcamento' },
  { label: 'Contato', href: '/contato' },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/metalprime' },
  { label: 'Facebook', href: 'https://facebook.com/metalprime' },
  { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#0A0A0A',
      color: '#EAEAEA',
      fontFamily: 'var(--font-ibm-mono), monospace',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Scanlines overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* CTA strip — laranja industrial */}
      <div style={{
        borderBottom: '1px solid #222',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: '2rem',
          minHeight: '88px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '9px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#f97316',
              whiteSpace: 'nowrap',
            }}>[ PROJETO PRONTO ]</span>
            <span style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#EAEAEA',
              lineHeight: 1,
            }}>
              Solicite seu orçamento sem compromisso
            </span>
          </div>
          <Link
            href="/orcamento"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f97316',
              color: '#0A0A0A',
              fontFamily: 'var(--font-ibm-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '14px 28px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ea580c' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#f97316' }}
          >
            ORÇAMENTO <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '0',
        borderBottom: '1px solid #222',
      }}>

        {/* Brand column — 4 cols */}
        <div style={{
          gridColumn: 'span 4',
          borderRight: '1px solid #222',
          padding: '3rem 2.5rem 3rem 0',
        }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="Metalprime" width={28} height={28} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            <span style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#EAEAEA',
            }}>
              {BRAND_NAME.split(' ')[0]}<span style={{ color: '#f97316' }}>.</span>
            </span>
          </Link>

          {/* Tagline */}
          <p style={{
            fontSize: '12px',
            lineHeight: 1.7,
            color: '#555',
            marginBottom: '2.5rem',
            maxWidth: '260px',
          }}>
            Excelência em engenharia metálica há mais de 20 anos. Estruturas para residências, condomínios, construtoras e indústrias em São Paulo.
          </p>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #222', marginBottom: '2rem' }} />

          {/* Phone */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'block', marginBottom: '1.5rem' }}
          >
            <span style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              display: 'block',
              lineHeight: 1,
              marginBottom: '4px',
              transition: 'color 0.15s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#EAEAEA' }}
            >
              {COMPANY_PHONE}
            </span>
            <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#444', textTransform: 'uppercase' }}>
              [ WHATSAPP DISPONÍVEL ]
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '1rem' }}
          >
            <Mail size={11} style={{ color: '#444' }} />
            <span style={{ fontSize: '11px', color: '#555', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#EAEAEA' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555' }}
            >
              {COMPANY_EMAIL}
            </span>
          </a>

          {/* Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <MapPin size={11} style={{ color: '#444', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '10px', color: '#444', lineHeight: 1.6 }}>
              {COMPANY_ADDRESS}
            </span>
          </div>
        </div>

        {/* Services — 3 cols */}
        <div style={{
          gridColumn: 'span 3',
          borderRight: '1px solid #222',
          padding: '3rem 2rem',
        }}>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#f97316',
            marginBottom: '2rem',
          }}>
            — SERVIÇOS
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {services.map((s) => (
              <li key={s.href} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <Link
                  href={s.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    textDecoration: 'none',
                    color: '#555',
                    fontSize: '12px',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#EAEAEA'
                    const code = el.querySelector('[data-code]') as HTMLElement
                    if (code) code.style.color = '#f97316'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#555'
                    const code = el.querySelector('[data-code]') as HTMLElement
                    if (code) code.style.color = '#2a2a2a'
                  }}
                >
                  <span>{s.label}</span>
                  <span data-code="true" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#2a2a2a', transition: 'color 0.15s' }}>
                    {s.code}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company — 2 cols */}
        <div style={{
          gridColumn: 'span 2',
          borderRight: '1px solid #222',
          padding: '3rem 2rem',
        }}>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#f97316',
            marginBottom: '2rem',
          }}>
            — EMPRESA
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '2rem' }}>
            {company.map((c) => (
              <li key={c.href} style={{ marginBottom: '12px' }}>
                <Link
                  href={c.href}
                  style={{ textDecoration: 'none', fontSize: '12px', color: '#555', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#EAEAEA' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555' }}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem' }}>
            <Link
              href="/admin"
              style={{ display: 'block', fontSize: '10px', color: '#2a2a2a', textDecoration: 'none', marginBottom: '8px', letterSpacing: '0.1em', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#444' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#2a2a2a' }}
            >
              › ÁREA ADMIN
            </Link>
            <Link
              href="/corporate/dashboard"
              style={{ display: 'block', fontSize: '10px', color: '#2a2a2a', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#444' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#2a2a2a' }}
            >
              › PORTAL CLIENTE
            </Link>
          </div>
        </div>

        {/* Atendimento — 3 cols */}
        <div style={{
          gridColumn: 'span 3',
          padding: '3rem 0 3rem 2rem',
        }}>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#f97316',
            marginBottom: '2rem',
          }}>
            — ATENDIMENTO
          </div>

          {/* Hours block */}
          <div style={{
            border: '1px solid #222',
            padding: '1.25rem',
            marginBottom: '2rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={10} style={{ color: '#f97316' }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#555', textTransform: 'uppercase' }}>
                HORÁRIO COMERCIAL
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#EAEAEA', lineHeight: 1.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#555' }}>SEG — SEX</span>
                <span>08:00 — 18:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#555' }}>SÁB</span>
                <span>08:00 — 13:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#555' }}>DOM</span>
                <span style={{ color: '#333' }}>FECHADO</span>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '2.5rem',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              background: '#4AF626',
              boxShadow: '0 0 6px #4AF626',
            }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#4AF626', textTransform: 'uppercase' }}>
              SISTEMA ONLINE
            </span>
          </div>

          {/* Socials */}
          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#333', textTransform: 'uppercase', marginBottom: '1rem' }}>
              REDES SOCIAIS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#444',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#444' }}
                >
                  <span style={{ color: '#2a2a2a' }}>///</span> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ fontSize: '10px', color: '#333', letterSpacing: '0.1em' }}>
          © {year} {BRAND_NAME.toUpperCase()}. TODOS OS DIREITOS RESERVADOS.
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#2a2a2a', textTransform: 'uppercase' }}>
            CREA-SP 000000000
          </span>
          <span style={{ color: '#222', fontSize: '10px' }}>|</span>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#2a2a2a', textTransform: 'uppercase' }}>
            SÃO PAULO, SP — BRASIL
          </span>
          <span style={{ color: '#222', fontSize: '10px' }}>|</span>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#2a2a2a', textTransform: 'uppercase' }}>
            REV 2.6 / BUILD {year}
          </span>
        </div>
      </div>
    </footer>
  )
}
