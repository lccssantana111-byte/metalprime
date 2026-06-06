import type { Metadata } from 'next'
import { BRAND_NAME } from '@/lib/constants'
import QuoteWizard from '@/components/quote/QuoteWizard'
import { CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `Solicitar Orçamento | ${BRAND_NAME}`,
  description:
    'Solicite um orçamento gratuito para portões, grades, escadas e estruturas metálicas em São Paulo. Retorno em até 24 horas.',
  robots: { index: false, follow: false },
}

const benefits = [
  'Orçamento 100% gratuito',
  'Visita técnica sem compromisso',
  'Resposta em até 24 horas',
  'ART inclusa em projetos estruturais',
]

export default function OrcamentoPage() {
  return (
    <div className="min-h-screen pt-16 bg-carbon">
      {/* Hero strip */}
      <div className="bg-graphite border-b border-white/5 py-10">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-amber-brand" />
                <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">Orçamento gratuito</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-none">
                Solicite seu orçamento
              </h1>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-5">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                  <span className="text-xs text-metal">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wizard */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-8">
          <QuoteWizard />
        </div>
      </div>
    </div>
  )
}
