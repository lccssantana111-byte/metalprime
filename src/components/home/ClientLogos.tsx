const clients = [
  'Construtora Camargo',
  'Cond. Alphaville',
  'MRV Engenharia',
  'Cyrela',
  'Rodobens',
  'Brookfield',
  'Tecnisa',
  'EZTec',
  'Rossi Residencial',
  'Even',
]

export default function ClientLogos() {
  return (
    <section className="py-14 bg-carbon border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 mb-8 flex items-center gap-6">
        <div className="w-8 h-px bg-white/10 shrink-0" />
        <p className="text-[11px] font-semibold tracking-[0.35em] text-metal-dark uppercase whitespace-nowrap">
          Empresas que confiam na Metalprime
        </p>
        <div className="h-px bg-white/5 flex-1" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-carbon to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-carbon to-transparent z-10 pointer-events-none" />

        <div className="flex gap-0 animate-marquee w-max">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-10 shrink-0"
            >
              <div className="w-1.5 h-1.5 bg-amber-brand/30 rotate-45 shrink-0" />
              <span className="text-sm font-medium text-metal-dark/70 whitespace-nowrap tracking-wide hover:text-metal transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
