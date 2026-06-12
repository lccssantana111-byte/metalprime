'use client'

import { motion } from 'framer-motion'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const testimonials = [
  {
    name: 'Arq. Patricia Lima',
    role: 'Arquiteta · Lima & Associados',
    service: 'Projetos Sob Medida',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Qualidade impecável do início ao fim. A Metalprime transformou um projeto complexo em realidade com uma precisão que raramente vemos no mercado.',
  },
  {
    name: 'Eng. Roberto Mendes',
    role: 'Dir. de Obras · Construtora Mendes',
    service: 'Estruturas Metálicas',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Fornecedor oficial em todas as nossas obras por seis anos consecutivos. Cronograma cumprido, ART em 100% dos projetos estruturais. Referência absoluta.',
  },
  {
    name: 'Ana Paula Souza',
    role: 'Proprietária · Pinheiros, SP',
    service: 'Escadas Metálicas',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    text: 'A escada helicoidal em aço e vidro superou todas as expectativas. Os visitantes fazem questão de perguntar quem executou.',
  },
  {
    name: 'Beatriz Carvalho',
    role: 'Designer de Interiores · Studio BC',
    service: 'Projetos Sob Medida',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    text: 'Parceiro indispensável em todos os projetos residenciais de alto padrão. Peças únicas com precisão e acabamento reconhecido pelos clientes.',
  },
  {
    name: 'Ricardo Yamamoto',
    role: 'Administrador · Cond. Jardins',
    service: 'Portões e Grades',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    text: 'Reformamos toda a área de lazer do condomínio. A qualidade do aço e o acabamento são visíveis. Moradores elogiam sem parar.',
  },
  {
    name: 'Carlos Ferreira',
    role: 'Construtor · CF Engenharia',
    service: 'Portões Automáticos',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    text: 'Instalação impecável e prazo cumprido. O portão automático funciona perfeitamente há três anos sem nenhuma manutenção corretiva.',
  },
  {
    name: 'Marina Santos',
    role: 'Arq. de Interiores · Santos Studio',
    service: 'Corrimões',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    text: 'Os corrimões em inox escovado que encomendei trouxeram um acabamento de altíssimo padrão ao projeto. Clientes sempre elogiam.',
  },
  {
    name: 'Eduardo Costa',
    role: 'Síndico · Cond. Alto da Lapa',
    service: 'Grades e Cercas',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    text: 'Modernizamos toda a grade perimetral do condomínio. Excelente custo-benefício e garantia real. Recomendo a todos os síndicos.',
  },
  {
    name: 'Julia Almeida',
    role: 'Sócia-Diretora · JA Comércio',
    service: 'Estruturas Metálicas',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    text: 'Construímos a cobertura metálica do nosso novo galpão com a Metalprime. Entrega antes do prazo e qualidade acima do esperado.',
  },
]

const col1 = testimonials.slice(0, 3)
const col2 = testimonials.slice(3, 6)
const col3 = testimonials.slice(6, 9)

export default function TestimonialsCarousel() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      style={{ background: 'white', colorScheme: 'light', position: 'relative', overflow: 'hidden' }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(340px,460px)_1fr] md:items-center"
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1600px', margin: '0 auto',
          padding: 'clamp(4rem, 6vw, 6rem) clamp(1.5rem, 2.5vw, 2.5rem) clamp(3rem, 5vw, 5rem)',
        }}>

        {/* LEFT — sticky headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center md:text-left"
          style={{}}
        >
          <div style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#f97316',
            border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: '4px',
            padding: '4px 14px',
            marginBottom: '1.75rem',
          }}>
            O que os clientes dizem
          </div>

          <h2
            id="testimonials-heading"
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 8vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#0f172a',
              margin: '0 0 1.5rem',
            }}
          >
            Obra entregue{' '}
            <span style={{ color: '#f97316' }}>confiança</span>{' '}
            conquistada.
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
            color: '#64748b',
            lineHeight: 1.6,
            margin: '0 auto 2.5rem',
            maxWidth: '340px',
          }}>
            Mais de 5.000 obras entregues em São Paulo desde 2004. Veja o que arquitetos, construtoras e proprietários dizem sobre a Metalprime.
          </p>

        </motion.div>

        {/* RIGHT — two scrolling columns */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.25rem',
            maxHeight: '740px',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={30} />
          <TestimonialsColumn testimonials={col2} duration={38} className="hidden sm:block" />
          <TestimonialsColumn testimonials={col3} duration={34} className="hidden lg:block" />
        </div>

      </div>
    </section>
  )
}
