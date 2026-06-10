import type { Metadata } from 'next'
import { Award, Users, Wrench, Target } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'
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


function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
      <div style={{ width: '32px', height: '1px', background: '#f97316', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.4em',
        textTransform: 'uppercase' as const,
        color: '#f97316',
      }}>
        {children}
      </span>
    </div>
  )
}

export default function SobrePage() {
  return (
    <div>

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <SobreHero />

      {/* ── 2. STATS ─────────────────────────────────────────── */}
      <section style={{
        background: '#f4f4f0',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ borderLeft: '1px solid #e2e8f0' }}
          >
            {[
              { value: '+20 Anos', label: 'De mercado' },
              { value: '+5.000', label: 'Projetos entregues' },
              { value: '+500', label: 'Condomínios' },
              { value: '100%', label: 'Com ART' },
            ].map((stat, i) => (
              <div
                key={i}
                className="py-10 px-6 sm:px-10"
                style={{ borderRight: '1px solid #e2e8f0' }}
              >
                <div style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  lineHeight: 1,
                  color: '#0f172a',
                  marginBottom: '6px',
                }}>
                  {stat.value}
                </div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HISTÓRIA + TIMELINE ───────────────────────────── */}
      <section style={{ background: '#ffffff', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <SectionLabel>Nossa história</SectionLabel>

              <h2 style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: '#0f172a',
                marginBottom: '2rem',
              }}>
                Uma oficina.<br />
                <span style={{ color: 'rgba(15,23,42,0.25)' }}>Uma obsessão.</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  'Em 2004, um engenheiro mecânico com zero tolerância para trabalho ruim fundou a Metalprime no Morumbi. O objetivo era simples: fazer em metal o que ninguém fazia direito.',
                  'A qualidade falou mais alto. Condomínios, construtoras e escritórios de arquitetura passaram a nos chamar porque sabiam o que iam receber: entrega no prazo, ART em dia e sem surpresas na nota.',
                  'Hoje somos mais de 30 especialistas, com estrutura industrial própria e mais de 5.000 obras executadas. A escala mudou. A obsessão com qualidade continua a mesma.',
                ].map((p, i) => (
                  <p key={i} style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: '23px',
                  width: '1px',
                  background: 'linear-gradient(to bottom, #f97316, rgba(249,115,22,0.08))',
                }}
              />
              <div>
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="relative"
                    style={{
                      paddingLeft: '64px',
                      paddingBottom: i < milestones.length - 1 ? '2.5rem' : '0',
                    }}
                  >
                    <div
                      className="absolute left-0 top-1 flex items-center justify-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        border: '1px solid rgba(249,115,22,0.35)',
                        background: '#ffffff',
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '9px',
                        color: '#f97316',
                        letterSpacing: '0.05em',
                      }}>
                        {m.year}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#0f172a',
                      marginBottom: '4px',
                    }}>
                      {m.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. VALORES ───────────────────────────────────────── */}
      <section style={{ background: '#f4f4f0', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container mx-auto px-4 sm:px-8">
          <SectionLabel>O que nos move</SectionLabel>

          <h2 style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: '#0f172a',
            marginBottom: '3rem',
          }}>
            O que não abrimos mão
          </h2>

          <div>
            {values.map((v, i) => (
              <div
                key={v.title}
                className="py-8 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start"
                style={{ borderBottom: i < values.length - 1 ? '1px solid #e2e8f0' : 'none' }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    fontWeight: 900,
                    fontSize: '3.5rem',
                    lineHeight: 1,
                    color: 'rgba(15,23,42,0.08)',
                    flexShrink: 0,
                    width: '3.5rem',
                  }}
                >
                  {v.number}
                </span>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flex: 1 }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(249,115,22,0.3)',
                    background: '#fff7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <v.icon style={{ width: '18px', height: '18px', color: '#f97316' }} />
                  </div>

                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#0f172a',
                      marginBottom: '6px',
                    }}>
                      {v.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DIFERENCIAIS + CTA ────────────────────────────── */}
      <SobreCTA />

    </div>
  )
}
