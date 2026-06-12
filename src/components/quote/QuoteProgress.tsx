import { Check } from 'lucide-react'

const steps = [
  { number: 1, label: 'Serviço' },
  { number: 2, label: 'Detalhes' },
  { number: 3, label: 'Contato' },
  { number: 4, label: 'Confirmação' },
]

export default function QuoteProgress({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 1 }}>
      {/* Track */}
      <div style={{
        position: 'absolute', top: '14px', left: 0, right: 0,
        height: '1px', background: 'rgba(15,23,42,0.12)', zIndex: 0,
      }} />
      {/* Fill */}
      <div style={{
        position: 'absolute', top: '14px', left: 0,
        height: '1px', background: '#f97316', zIndex: 0,
        width: `${progress}%`, transition: 'width 0.5s ease',
      }} />

      {steps.map((step) => {
        const done = currentStep > step.number
        const active = currentStep === step.number

        return (
          <div key={step.number} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              border: `1.5px solid ${done ? '#f97316' : active ? '#f97316' : 'rgba(15,23,42,0.2)'}`,
              background: done ? '#f97316' : active ? '#ffffff' : '#f4f4f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 0 4px #f4f4f0',
            }}>
              {done ? (
                <Check style={{ width: '13px', height: '13px', color: '#ffffff' }} />
              ) : (
                <span style={{
                  fontFamily: 'var(--font-ibm-mono)', fontSize: '11px', fontWeight: 600,
                  color: active ? '#f97316' : 'rgba(15,23,42,0.3)',
                }}>
                  {step.number}
                </span>
              )}
            </div>
            <span style={{
              fontFamily: 'var(--font-ibm-mono)', fontSize: '9px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: active ? '#0f172a' : done ? '#f97316' : 'rgba(15,23,42,0.35)',
              transition: 'color 0.3s',
            }}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
