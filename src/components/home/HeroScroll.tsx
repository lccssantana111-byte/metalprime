'use client'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { PHOTOS } from '@/lib/images'

export default function HeroScroll() {
  return (
    <section style={{ background: 'white', overflow: 'hidden' }}>
      <ContainerScroll
        titleComponent={
          <div>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#f97316',
              marginBottom: '1.25rem',
            }}>
              Nosso trabalho
            </span>
            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#0f172a',
              margin: '0 0 1.5rem',
            }}>
              Fabricação que<br />
              <span style={{ color: '#f97316' }}>fala por si.</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: '#64748b',
              maxWidth: '34rem',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              Cada projeto entregue com ART, precisão milimétrica e acabamento premium — do projeto à instalação.
            </p>
          </div>
        }
      >
        <img
          src={PHOTOS.cta}
          alt="Serralheria Metalprime — projeto executado"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </ContainerScroll>
    </section>
  )
}
