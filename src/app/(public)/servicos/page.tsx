import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Serviços de Serralheria Premium | ${BRAND_NAME}`,
  description:
    'Portões, grades, escadas metálicas, corrimões, estruturas metálicas e projetos sob medida. Especialistas em serralheria de alto padrão em São Paulo.',
}

const services = [
  {
    href: '/servicos/portoes',
    name: 'Portões',
    number: '01',
    tagline: 'Automático, manual ou de correr. Instalado com ART.',
    desc: 'Portões em ferro, alumínio e aço inox para residências, condomínios e empresas. Motorização de todas as marcas, instalação com ART.',
    tags: ['Ferro', 'Alumínio', 'Inox', 'Automação'],
  },
  {
    href: '/servicos/grades-e-cercas',
    name: 'Grades e Cercas',
    number: '02',
    tagline: 'Proteção sem abrir mão do design',
    desc: 'Grades para janelas, muros e perímetro. Cercas decorativas e de segurança com acabamento premium em diferentes estilos.',
    tags: ['Janelas', 'Muros', 'Perímetro', 'Guardrails'],
  },
  {
    href: '/servicos/escadas',
    name: 'Escadas Metálicas',
    number: '03',
    tagline: 'Projeto estrutural incluso. Do reto ao helicoidal.',
    desc: 'Escadas retas, em L, em U, helicoidais e flutuantes. Combinadas com madeira, vidro e concreto. Projeto estrutural incluso.',
    tags: ['Retas', 'Helicoidais', 'Flutuantes', 'Com vidro'],
  },
  {
    href: '/servicos/corrimoes',
    name: 'Corrimões e Guarda-corpos',
    number: '04',
    tagline: 'Conformidade ABNT. Acabamento impecável.',
    desc: 'Corrimões e guarda-corpos em aço inox, ferro e alumínio. Conformidade com normas ABNT. Acabamento polido, escovado ou pintado.',
    tags: ['Inox', 'Ferro', 'Alumínio', 'ABNT'],
  },
  {
    href: '/servicos/estruturas-metalicas',
    name: 'Estruturas Metálicas',
    number: '05',
    tagline: 'ART inclusa. Fabricação própria.',
    desc: 'Galpões industriais, coberturas, mezaninos, marquises, pérgolas e estruturas para fachadas. ART de engenheiro responsável inclusa.',
    tags: ['Galpões', 'Coberturas', 'Mezaninos', 'ART'],
  },
  {
    href: '/servicos/sob-medida',
    name: 'Projetos Sob Medida',
    number: '06',
    tagline: 'Sua ideia, nossa execução precisa',
    desc: 'Qualquer projeto em metal conforme sua especificação. Trabalhamos com arquitetos e decoradores para projetos únicos de alto padrão.',
    tags: ['Projetos únicos', 'Todos os metais', 'Com arquiteto'],
  },
]

export default function ServicosPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-28 bg-carbon relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, #8c97a0 0px, #8c97a0 1px, transparent 0px, transparent 60px)',
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-brand/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-brand" />
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">O que fazemos</span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-6 max-w-2xl">
            6 especialidades.<br />
            <span className="text-metal/30">Um padrão.</span>
          </h1>
          <p className="text-metal text-lg max-w-xl leading-relaxed">
            Do projeto à ART — tudo em casa, sem terceirizar. Fabricação própria, equipe certificada, entrega no prazo.
          </p>
        </div>

        <div className="absolute right-8 bottom-0 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-black text-[18vw] leading-none text-transparent"
            style={{ WebkitTextStroke: '1px rgba(30,35,40,0.8)' }}
          >
            06
          </span>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-carbon">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="divide-y divide-white/5">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="group block py-10 sm:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="font-display font-black text-5xl text-white/10 group-hover:text-amber-brand/20 transition-colors leading-none">
                      {s.number}
                    </span>
                  </div>

                  {/* Name + tagline */}
                  <div className="lg:col-span-4">
                    <h2 className="font-display font-black text-3xl lg:text-4xl text-metal-light group-hover:text-white transition-colors duration-300 leading-none mb-3">
                      {s.name}
                    </h2>
                    <p className="text-amber-brand text-sm font-semibold leading-snug">{s.tagline}</p>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-5">
                    <p className="text-metal text-sm leading-relaxed">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-metal-dark border border-metal-dark/30 group-hover:border-amber-brand/20 px-2.5 py-1 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="lg:col-span-2 flex justify-end items-start">
                    <div className="w-12 h-12 border border-white/10 group-hover:bg-amber-brand group-hover:border-amber-brand flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-metal group-hover:text-carbon transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-graphite border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-6">
            Tem um projeto fora do padrão?
          </h2>
          <p className="text-metal max-w-md mx-auto mb-10">
            Nossa especialidade são justamente os projetos complexos. Nos diga o que você precisa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/orcamento"
              className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-10 py-4 transition-colors duration-200"
            >
              Solicitar Orçamento Gratuito
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
