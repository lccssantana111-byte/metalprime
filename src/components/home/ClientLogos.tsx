const clients = [
  { name: 'Cyrela', type: 'Construtora' },
  { name: 'MRV Engenharia', type: 'Construtora' },
  { name: 'Even', type: 'Construtora' },
  { name: 'Cond. Alphaville', type: 'Condomínio' },
  { name: 'JHSF', type: 'Incorporadora' },
  { name: 'Brookfield', type: 'Incorporadora' },
  { name: 'Living', type: 'Construtora' },
  { name: 'Eztec', type: 'Incorporadora' },
  { name: 'Tegma', type: 'Logística' },
  { name: 'Votorantim', type: 'Industrial' },
]

const duplicated = [...clients, ...clients]

export default function ClientLogos() {
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: '#0c0e11', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container mx-auto px-5 sm:px-8 mb-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase shrink-0" style={{ color: 'rgba(180,188,198,0.25)' }}>
            Empresas que confiam na Metalprime
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>

      <div className="relative group/marquee">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0c0e11, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0c0e11, transparent)' }} />

        <div
          className="flex gap-0 animate-marquee group-hover/marquee:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {duplicated.map((client, i) => (
            <div
              key={i}
              className="px-12 py-4 flex items-center gap-3 shrink-0"
              style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="w-1.5 h-1.5 shrink-0" style={{ background: 'rgba(196,160,64,0.3)', transform: 'rotate(45deg)' }} />
              <div>
                <span className="font-display font-semibold text-[15px] whitespace-nowrap" style={{ color: 'rgba(180,188,198,0.45)' }}>
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
