import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'

interface Props {
  serviceName: string
}

export default function ServiceCta({ serviceName }: Props) {
  return (
    <section className="py-24 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-steel/20 to-transparent" />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-10 h-10">
        <div className="absolute top-0 left-0 w-4 h-px bg-amber-brand/50" />
        <div className="absolute top-0 left-0 w-px h-4 bg-amber-brand/50" />
      </div>
      <div className="absolute top-8 right-8 w-10 h-10">
        <div className="absolute top-0 right-0 w-4 h-px bg-amber-brand/50" />
        <div className="absolute top-0 right-0 w-px h-4 bg-amber-brand/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10 text-center max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber-brand" />
          <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Próximo passo</span>
          <div className="w-8 h-px bg-amber-brand" />
        </div>
        <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-none mb-6">
          Pronto para seu projeto<br />
          <span className="text-metal/40">de {serviceName.toLowerCase()}?</span>
        </h2>
        <p className="text-metal leading-relaxed mb-12 max-w-md mx-auto">
          Orçamento gratuito, visita técnica sem compromisso e entrega com ART de
          engenheiro responsável.
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
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse em ${serviceName.toLowerCase()}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-metal-light hover:text-white text-sm px-8 py-4 transition-all duration-200"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
