import type { Metadata } from 'next'
import { Award, Users, Wrench, Target } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/design-system'
import SobreCTA from './_components/SobreCTA'
import SobreHero from './_components/SobreHero'

export const metadata: Metadata = {
  title: `Sobre Nós | ${BRAND_NAME}`,
  description:
    'Conheça a história da Metalprime. +20 anos de especialização em serralheria premium em São Paulo.',
}

const values = [
  {
    icon: Award,
    number: '01',
    title: 'Excelência',
    description: 'Não sai da fábrica se não estiver do jeito certo. Simples assim.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Precisão',
    description: 'Cada milímetro é calculado. ART em 100% dos projetos estruturais, sem exceção.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Parceria',
    description: 'Tratamos o projeto do cliente como se fosse nosso. Do primeiro contato ao parafuso final.',
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Inovação',
    description: 'Equipamentos modernos a serviço de uma exigência artesanal. Sempre os dois.',
  },
]

const milestones = [
  { year: '2004', title: 'Fundação', desc: 'Nasce a Metalprime no Morumbi, SP, atendendo residências de alto padrão.' },
  { year: '2008', title: 'Expansão', desc: 'Estrutura industrial própria e equipe de engenheiros certificados.' },
  { year: '2013', title: 'ISO 9001', desc: 'Certificação de qualidade e primeiros contratos com grandes construtoras.' },
  { year: '2018', title: '+2.000 obras', desc: 'Marco de 2.000 projetos entregues em toda a Grande São Paulo.' },
  { year: 'Hoje', title: '+5.000 projetos', desc: 'Referência em serralheria premium para residências, condomínios e construtoras.' },
]



export default function SobrePage() {
  return (
    <div>

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <SobreHero />

      {/* ── 2. STATS ─────────────────────────────────────────── */}
      <section style={{ background: '#f4f4f0' }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderLeft: '1px solid #e2e8f0', borderTop: '1px solid #e2e8f0' }}>
            {[
              { value: '+20', suffix: 'Anos', label: 'De mercado' },
              { value: '+5.000', suffix: '', label: 'Projetos entregues' },
              { value: '+500', suffix: '', label: 'Condomínios' },
              { value: '100%', suffix: '', label: 'Com ART' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '3rem 2.5rem',
                  borderRight: '1px solid #e2e8f0',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  color: '#0f172a',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.5rem',
                }}>
                  {stat.value}
                  {stat.suffix && (
                    <span style={{ fontSize: '0.45em', color: '#f97316', marginLeft: '0.2em', verticalAlign: 'middle' }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div style={{ width: '24px', height: '2px', background: '#f97316', marginBottom: '0.75rem' }} />
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  margin: 0,
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HISTÓRIA + TIMELINE ───────────────────────────── */}
      <section style={{ background: '#0f172a', paddingTop: '6rem', paddingBottom: '0' }}>
        <div className="container mx-auto px-4 sm:px-8">

          {/* Cabeçalho da seção */}
          <div style={{ marginBottom: '1rem' }}>
            <SectionLabel label="Nossa história" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ paddingBottom: '5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#ffffff',
              margin: 0,
            }}>
              Uma oficina.<br />
              <span style={{ color: '#f97316' }}>Uma obsessão.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                'Em 2004, um engenheiro mecânico com zero tolerância para trabalho ruim fundou a Metalprime no Morumbi. O objetivo era simples: fazer em metal o que ninguém fazia direito.',
                'A qualidade falou mais alto. Condomínios, construtoras e arquitetos passaram a nos chamar porque sabiam o que iam receber: entrega no prazo, ART em dia e sem surpresas na nota.',
                'Hoje somos mais de 30 especialistas, com estrutura industrial própria e mais de 5.000 obras executadas. A escala mudou. A obsessão com qualidade continua a mesma.',
              ].map((p, i) => (
                <p key={i} style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Timeline — 1 col mobile, 2 col sm, 5 col lg */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <style>{`
              @keyframes fadeSlideIn {
                from { opacity: 0; transform: translateX(-16px); }
                to   { opacity: 1; transform: translateX(0); }
              }
              @media (max-width: 639px) {
                .timeline-item {
                  animation: fadeSlideIn 0.5s ease both;
                  padding: 1rem 1rem 1rem 1.5rem !important;
                  border-left: 3px solid rgba(249,115,22,0.55) !important;
                }
                .timeline-item:nth-child(1) { animation-delay: 0.05s; }
                .timeline-item:nth-child(2) { animation-delay: 0.15s; }
                .timeline-item:nth-child(3) { animation-delay: 0.25s; }
                .timeline-item:nth-child(4) { animation-delay: 0.35s; }
                .timeline-item:nth-child(5) { animation-delay: 0.45s; }
              }
            `}</style>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="timeline-item"
                  style={{
                    padding: '1.5rem 1rem 1.5rem 1.25rem',
                    borderLeft: '2px solid rgba(249,115,22,0.35)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    lineHeight: 1,
                    color: i === milestones.length - 1 ? '#f97316' : 'rgba(255,255,255,0.50)',
                    marginBottom: '0.75rem',
                  }}>
                    {m.year}
                  </div>
                  <div style={{ width: '24px', height: '2px', background: '#f97316', marginBottom: '0.75rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9rem', color: '#ffffff', marginBottom: '6px' }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. VALORES ───────────────────────────────────────── */}
      <section style={{ background: '#f4f4f0', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container mx-auto px-4 sm:px-8">

          {/* Cabeçalho */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#0f172a',
              margin: 0,
            }}>
              O que não<br />
              <span style={{ color: '#f97316' }}>abrimos mão</span>
            </h2>
          </div>

          {/* Grid 2x2 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ border: '1px solid #e2e8f0' }}
          >
            {values.map((v, i) => {
              const isLeftCol = i % 2 === 0
              return (
                <div
                  key={v.title}
                  style={{
                    padding: '3.5rem',
                    background: '#ffffff',
                    borderRight: isLeftCol ? '1px solid #e2e8f0' : 'none',
                    borderBottom: i < values.length - 1 ? '1px solid #e2e8f0' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Número fantasma */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '1.25rem',
                      fontFamily: 'var(--font-barlow-condensed)',
                      fontWeight: 900,
                      fontSize: 'clamp(5rem, 8vw, 8rem)',
                      lineHeight: 1,
                      color: 'rgba(15,23,42,0.04)',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {v.number}
                  </span>

                  {/* Ícone */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    border: '1px solid rgba(249,115,22,0.3)',
                    background: '#fff7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                  }}>
                    <v.icon style={{ width: '20px', height: '20px', color: '#f97316' }} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#0f172a',
                    marginBottom: '0.75rem',
                    lineHeight: 1,
                  }}>
                    {v.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: '36ch',
                  }}>
                    {v.description}
                  </p>

                  {/* Barra laranja inferior */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '3rem',
                    height: '3px',
                    background: '#f97316',
                  }} />
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── 5. DIFERENCIAIS + CTA ────────────────────────────── */}
      <SobreCTA />

    </div>
  )
}
