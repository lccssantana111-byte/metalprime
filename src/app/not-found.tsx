import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-carbon relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #8c97a0 0px, #8c97a0 1px, transparent 0px, transparent 60px)',
        }}
      />

      {/* Large 404 background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display font-black text-[30vw] leading-none text-transparent"
          style={{ WebkitTextStroke: '1px rgba(30,35,40,0.9)' }}
        >
          404
        </span>
      </div>

      {/* Vertical rule */}
      <div className="absolute top-0 bottom-0 left-[20%] w-px bg-gradient-to-b from-transparent via-amber-brand/15 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-lg mx-auto">
        {/* Diamond decoration */}
        <div className="relative w-16 h-16 mx-auto mb-10">
          <div className="absolute inset-0 border border-amber-brand/20 rotate-45" />
          <div className="absolute inset-3 border border-amber-brand/40 rotate-45" />
          <div className="absolute inset-6 bg-amber-brand/30 rotate-45" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-px bg-amber-brand" />
          <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">
            Erro 404
          </span>
          <div className="w-8 h-px bg-amber-brand" />
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-none mb-5">
          Página<br />
          <span className="text-metal/40">não encontrada</span>
        </h1>

        <p className="text-metal text-base leading-relaxed mb-10">
          A página que você buscou não existe ou foi movida. Explore nosso site para encontrar o que precisa.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-amber-brand hover:bg-amber-light text-carbon font-bold text-sm tracking-wide px-8 py-4 transition-colors duration-200"
          >
            Voltar ao início
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/orcamento"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-metal-light hover:text-white text-sm px-8 py-4 transition-all duration-200"
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>
    </div>
  )
}
