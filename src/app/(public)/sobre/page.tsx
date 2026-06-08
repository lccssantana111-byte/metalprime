import type { Metadata } from 'next'
import { Award, Users, Wrench, Target, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

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
    description: 'Cada milímetro é calculado. ART em 100% dos projetos estruturais — sem exceção, sem negociação.',
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

const differentials = [
  'Equipe própria de engenheiros e soldadores certificados',
  'Fabricação própria — sem terceirizar nenhuma etapa',
  'ART em 100% dos projetos estruturais (você não se preocupa com a vistoria)',
  'Atendemos toda Grande São Paulo e interior',
  'Garantia de 5 anos em peças estruturais',
  '+500 condomínios que renovam contratos conosco',
]

export default function SobrePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative bg-carbon overflow-hidden">
        {/* Background diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, #8c97a0 0px, #8c97a0 1px, transparent 0px, transparent 60px)',
          }}
        />
        <div className="absolute top-0 bottom-0 right-[20%] w-px bg-gradient-to-b from-amber-brand/20 via-amber-brand/10 to-transparent" />

        <div className="container mx-auto px-4 sm:px-8 py-28 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Quem somos</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-foreground leading-none mb-8 max-w-3xl">
            Começamos com uma oficina.<br />
            <span className="text-metal/30">Viramos referência.</span>
          </h1>

          <p className="text-metal-light text-lg sm:text-xl leading-relaxed max-w-xl">
            Em 20 anos de obra feita direito, construímos reputação junto com condomínios,
            construtoras e arquitetos que precisam de um parceiro confiável — não de mais um fornecedor.
          </p>
        </div>

        {/* Large background number */}
        <div className="absolute right-8 bottom-0 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-black text-[20vw] leading-none text-transparent"
            style={{ WebkitTextStroke: '1px rgba(210,205,198,0.9)' }}
          >
            2004
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-graphite border-y border-foreground/8">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {[
              { value: '+20', label: 'Anos de mercado' },
              { value: '+5.000', label: 'Projetos entregues' },
              { value: '+500', label: 'Condomínios' },
              { value: '100%', label: 'Com ART' },
            ].map((stat, i) => (
              <div key={i} className="py-10 px-6 sm:px-10">
                <div className="font-display font-black text-4xl lg:text-5xl text-foreground leading-none mb-1.5">
                  {stat.value}
                </div>
                <p className="text-xs text-metal-dark tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-carbon">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-amber-brand" />
                <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Nossa história</span>
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-foreground leading-none mb-8">
                Uma oficina.<br />
                <span className="text-metal/40">Uma obsessão.</span>
              </h2>
              <div className="space-y-5 text-metal leading-relaxed">
                <p>
                  Em 2004, um engenheiro mecânico com zero tolerância para trabalho ruim
                  fundou a Metalprime no Morumbi. O objetivo era simples: fazer em metal
                  o que ninguém fazia direito.
                </p>
                <p>
                  A qualidade falou mais alto. Condomínios, construtoras e escritórios de
                  arquitetura passaram a nos chamar porque sabiam o que iam receber —
                  entrega no prazo, ART em dia e sem surpresas na nota.
                </p>
                <p>
                  Hoje somos mais de 30 especialistas, com estrutura industrial própria
                  e mais de 5.000 obras executadas. A escala mudou. A obsessão com
                  qualidade continua a mesma.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-brand/40 via-metal-dark/30 to-transparent" />
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={m.year} className="relative pl-16 pb-10 last:pb-0">
                    <div className="absolute left-0 top-1 w-12 h-12 border border-amber-brand/30 bg-carbon flex items-center justify-center">
                      <span className="font-display font-bold text-[11px] text-amber-brand">{m.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2">{m.title}</h3>
                    <p className="text-sm text-metal leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-graphite relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#8c97a0 1px, transparent 1px), linear-gradient(90deg, #8c97a0 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">O que nos move</span>
          </div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-foreground leading-none mb-16">
            O que não abrimos mão
          </h2>

          <div className="divide-y divide-white/5">
            {values.map((v) => (
              <div key={v.title} className="py-8 flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
                <span className="font-display font-black text-5xl text-foreground/10 leading-none shrink-0 w-16">{v.number}</span>
                <div className="flex items-start gap-6 flex-1">
                  <div className="w-10 h-10 border border-amber-brand/30 flex items-center justify-center shrink-0 mt-1">
                    <v.icon className="w-5 h-5 text-amber-brand" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">{v.title}</h3>
                    <p className="text-metal text-sm leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-28 bg-carbon">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-amber-brand" />
                <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Por que a Metalprime</span>
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-foreground leading-none mb-6">
                O que você não encontra<br />
                <span className="text-metal/40">em qualquer serralheria</span>
              </h2>
              <p className="text-metal leading-relaxed mb-12">
                A maioria terceiriza, improvisa e entrega sem ART. Aqui é diferente.
              </p>
              <Link
                href="/orcamento"
                className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-8 py-4 transition-colors duration-200"
              >
                Solicitar Orçamento Gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {differentials.map((d, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-foreground/8 last:border-0">
                  <CheckCircle className="w-5 h-5 text-amber-brand shrink-0 mt-0.5" />
                  <span className="text-metal-light text-sm leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-graphite relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-steel/20 to-transparent" />
        <div className="container mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h2 className="font-display font-black text-4xl lg:text-5xl text-foreground leading-none mb-6">
            Pronto para começar?
          </h2>
          <p className="text-metal max-w-md mx-auto mb-10">
            Fale com um engenheiro. Visita técnica gratuita, orçamento em 24h, sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/orcamento"
              className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-10 py-4 transition-colors duration-200"
            >
              Solicitar Orçamento Gratuito
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground/15 hover:border-foreground/22 text-metal-light hover:text-foreground text-sm px-8 py-4 transition-all duration-200"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
