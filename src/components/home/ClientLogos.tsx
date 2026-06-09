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
      style={{
        colorScheme: 'light',
        background: '#f8fafc',
        padding: '3.5rem 0',
        overflow: 'hidden',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      {/* Label */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto 2rem',
          padding: '0 clamp(1.25rem, 4vw, 2rem)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              flexShrink: 0,
            }}
          >
            Empresas que confiam na Metalprime
          </span>
          <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
        </div>
      </div>

      {/* Marquee */}
      <div className="group/marquee" style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '96px',
            zIndex: 10,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, #f8fafc, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '96px',
            zIndex: 10,
            pointerEvents: 'none',
            background: 'linear-gradient(to left, #f8fafc, transparent)',
          }}
        />

        <div
          className="animate-marquee group-hover/marquee:[animation-play-state:paused]"
          style={{ display: 'flex', width: 'max-content' }}
        >
          {duplicated.map((client, i) => (
            <div
              key={i}
              style={{
                padding: '0 3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexShrink: 0,
                borderRight: '1px solid #e2e8f0',
              }}
            >
              {/* Diamond */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  background: '#f97316',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                  opacity: 0.5,
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '15px',
                    whiteSpace: 'nowrap',
                    color: '#475569',
                  }}
                >
                  {client.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    marginLeft: '8px',
                  }}
                >
                  {client.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
