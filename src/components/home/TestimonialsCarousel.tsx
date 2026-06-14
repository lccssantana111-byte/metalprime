'use client'

import { motion } from 'framer-motion'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const testimonials = [
  {
    name: 'Eng. Roberto Mendes',
    role: 'Diretor de Obras · Construtora Mendes Engenharia',
    service: 'Estruturas Metálicas',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Fornecedor homologado em todas as nossas obras por seis anos. Cronograma cumprido, ART entregue em 100% dos itens estruturais. Referência absoluta para qualquer construtora séria.',
  },
  {
    name: 'Arq. Patricia Lima',
    role: 'Sócia · Lima & Associados Arquitetura',
    service: 'Projetos Sob Medida',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'A Metal Shark transformou projetos complexos em realidade com precisão que raramente vejo no mercado. Parceiro indispensável para escritórios de arquitetura que não aceitam imprecisão.',
  },
  {
    name: 'Julia Almeida',
    role: 'Sócia-Diretora · JA Comércio e Logística',
    service: 'Estruturas Metálicas',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    text: 'Construímos a cobertura metálica do nosso galpão logístico com a Metal Shark. Entrega antes do prazo, documentação técnica completa e qualidade bem acima do esperado.',
  },
  {
    name: 'Marcos Andrade',
    role: 'Gerente de Projetos · Tegma Gestão Logística',
    service: 'Galpões e Coberturas',
    image: 'https://randomuser.me/api/portraits/men/48.jpg',
    text: 'Galpão industrial de 3.500m² entregue em 58 dias, dentro do escopo e sem nenhum aditivo de contrato. Isso é gestão de obra de verdade.',
  },
  {
    name: 'Carlos Ferreira',
    role: 'Engenheiro Responsável · CF Engenharia',
    service: 'Portões e Grades',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    text: 'Parceiro de confiança em três empreendimentos comerciais consecutivos. Instalação impecável, ART no prazo e acompanhamento pós-obra real. Não terceirizam nada.',
  },
  {
    name: 'Ricardo Yamamoto',
    role: 'Administrador · Condomínio Empresarial Jardins',
    service: 'Portões e Segurança',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    text: 'Reformamos toda a segurança perimetral do condomínio empresarial. Qualidade do aço, acabamento e a documentação para a administradora foram impecáveis.',
  },
  {
    name: 'Eduardo Costa',
    role: 'Facilities Manager · Grupo Costa Alimentos',
    service: 'Manutenção e Estruturas',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    text: 'Responsáveis pela manutenção das estruturas de três plantas industriais nossas. Equipe técnica qualificada, laudos em dia e resposta rápida para qualquer chamado.',
  },
  {
    name: 'Dra. Sandra Figueiredo',
    role: 'Diretora Comercial · Incorporadora SF',
    service: 'Escadas e Mezaninos',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    text: 'Escadas metálicas e mezanino corporativo entregues com acabamento de alto padrão. A documentação de ART e conformidade ABNT chegou junto com a obra. Diferencial real.',
  },
  {
    name: 'Eng. Gustavo Pires',
    role: 'Coordenador Técnico · VBA Construções',
    service: 'Estruturas Metálicas',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
    text: 'Contratamos para projeto executivo e instalação de estruturas em aço. Nenhum retrabalho, nenhuma não-conformidade. É raro assim no mercado.',
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
            Quem trabalha com a gente
          </div>

          <h2
            id="testimonials-heading"
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#0f172a',
              margin: '0 0 1.5rem',
            }}
          >
            A voz de quem{' '}
            <span style={{ color: '#f97316' }}>aprova</span>{' '}
            na prática.
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
            color: '#64748b',
            lineHeight: 1.6,
            margin: '0 0 2.5rem',
            maxWidth: '340px',
          }}>
            Construtoras, gestores industriais e escritórios de arquitetura que colocam a Metal Shark como fornecedor homologado. Mais de 5.000 estruturas entregues desde 2004.
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
