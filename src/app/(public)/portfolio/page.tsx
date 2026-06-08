import type { Metadata } from 'next'
import { getAllPortfolio } from '@/lib/queries/portfolio'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { BRAND_NAME } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Portfólio | ${BRAND_NAME}`,
  description:
    'Conheça nossos projetos de serralheria premium: portões, escadas, grades e estruturas metálicas em São Paulo.',
}

export default async function PortfolioPage() {
  const items = await getAllPortfolio().catch(() => [])

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
            <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Nossos projetos</span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl text-foreground leading-none mb-6 max-w-2xl">
            Projetos<br />
            <span className="text-metal/30">executados</span>
          </h1>
          <p className="text-metal text-lg max-w-lg leading-relaxed">
            Cada obra aqui foi entregue no prazo, com ART e com o padrão que nossos clientes reconhecem como diferencial.
          </p>
        </div>

        <div className="absolute right-8 bottom-0 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-black text-[18vw] leading-none text-transparent"
            style={{ WebkitTextStroke: '1px rgba(210,205,198,0.8)' }}
          >
            5K+
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-carbon">
        <div className="container mx-auto px-4 sm:px-8">
          {items.length > 0 ? (
            <PortfolioGrid items={items} />
          ) : (
            <div className="py-32 text-center">
              <div className="w-16 h-16 border border-amber-brand/20 flex items-center justify-center mx-auto mb-6">
                <div className="w-6 h-6 bg-amber-brand/20 rotate-45" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-3">Portfólio em construção</h2>
              <p className="text-metal">Em breve novos projetos serão publicados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
