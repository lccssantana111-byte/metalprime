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
    description: 'Cada peça entregue reflete nosso compromisso com a qualidade máxima, sem concessões.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Precisão',
    description: 'Engenharia rigorosa em cada milímetro. Projetos com ART de engenheiro responsável.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Parceria',
    description: 'Trabalhamos lado a lado com arquitetos, construtoras e clientes em cada etapa.',
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Inovação',
    description: 'Tecnologia de fabricação moderna para soluções que unem funcionalidade e design.',
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
  'Estrutura industrial com controle de qualidade em cada etapa',
  'ART (Anotação de Responsabilidade Técnica) em projetos estruturais',
  'Atendemos toda Grande São Paulo e interior',
  'Garantia de 5 anos em peças estruturais',
  'Mais de 500 condomínios atendidos',
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

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-8 max-w-3xl">
            Transformando aço em arte<br />
            <span className="text-metal/30">há 20 anos</span>
          </h1>

          <p className="text-metal-light text-lg sm:text-xl leading-relaxed max-w-xl">
            Fundada em São Paulo, crescemos de uma pequena oficina para uma das principais
            referências em serralheria premium do estado.
          </p>
        </div>

        {/* Large background number */}
        <div className="absolute right-8 bottom-0 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-black text-[20vw] leading-none text-transparent"
            style={{ WebkitTextStroke: '1px rgba(30,35,40,0.9)' }}
          >
            2004
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-graphite border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {[
              { value: '+20', label: 'Anos de mercado' },
              { value: '+5.000', label: 'Projetos entregues' },
              { value: '+500', label: 'Condomínios' },
              { value: '100%', label: 'Com ART' },
            ].map((stat, i) => (
              <div key={i} className="py-10 px-6 sm:px-10">
                <div className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-1.5">
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
              <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-8">
                Uma oficina.<br />
                <span className="text-metal/40">Uma obsessão.</span>
              </h2>
              <div className="space-y-5 text-metal leading-relaxed">
                <p>
                  Fundada em 2004 por um engenheiro mecânico apaixonado por design industrial,
                  a Metalprime começou atendendo residências de alto padrão no bairro do Morumbi.
                </p>
                <p>
                  A qualidade do trabalho e o rigor técnico abriram portas para condomínios de
                  luxo, construtoras e escritórios de arquitetura que buscavam um parceiro
                  confiável para projetos estruturais complexos.
                </p>
                <p>
                  Hoje, com mais de 5.000 projetos entregues, contamos com estrutura industrial
                  própria, equipe de engenheiros e soldadores certificados, atendendo clientes
                  em toda a Grande São Paulo e interior.
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
                    <h3 className="font-display font-bold text-white text-lg mb-2">{m.title}</h3>
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
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-16">
            Nossos valores
          </h2>

          <div className="divide-y divide-white/5">
            {values.map((v) => (
              <div key={v.title} className="py-8 flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
                <span className="font-display font-black text-5xl text-white/10 leading-none shrink-0 w-16">{v.number}</span>
                <div className="flex items-start gap-6 flex-1">
                  <div className="w-10 h-10 border border-amber-brand/30 flex items-center justify-center shrink-0 mt-1">
                    <v.icon className="w-5 h-5 text-amber-brand" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{v.title}</h3>
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
              <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-6">
                Nossos<br />
                <span className="text-metal/40">diferenciais</span>
              </h2>
              <p className="text-metal leading-relaxed mb-12">
                Mais do que executar projetos, entregamos tranquilidade, precisão e parceria
                duradoura em cada obra.
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
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
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
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-6">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-metal max-w-md mx-auto mb-10">
            Solicite um orçamento gratuito ou entre em contato pelo WhatsApp.
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
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-metal-light hover:text-white text-sm px-8 py-4 transition-all duration-200"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
