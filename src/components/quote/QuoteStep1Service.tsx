import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const services = [
  { value: 'portoes', label: 'Portões', icon: '🚪', desc: 'Ferro, alumínio e inox' },
  { value: 'grades_e_cercas', label: 'Grades e Cercas', icon: '🔒', desc: 'Janelas, muros, perímetro' },
  { value: 'escadas', label: 'Escadas', icon: '🏗️', desc: 'Retas, L, U, helicoidais' },
  { value: 'corrimoes', label: 'Corrimões', icon: '⚙️', desc: 'Guarda-corpos e corrimões' },
  { value: 'estruturas_metalicas', label: 'Estruturas', icon: '🏭', desc: 'Galpões e coberturas' },
  { value: 'sob_medida', label: 'Sob Medida', icon: '✏️', desc: 'Qualquer projeto' },
]

interface Props {
  selected: string[]
  onChange: (services: string[]) => void
  onNext: () => void
}

export default function QuoteStep1Service({ selected, onChange, onNext }: Props) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="bg-graphite border border-metal-dark/30 rounded-2xl p-8">
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        O que você quer executar?
      </h2>
      <p className="text-metal text-sm mb-8">Pode marcar mais de um</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {services.map((s) => {
          const isSelected = selected.includes(s.value)
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => toggle(s.value)}
              className={cn(
                'flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-brand bg-amber-brand/10 text-white'
                  : 'border-metal-dark/30 bg-steel/20 text-metal-light hover:border-amber-brand/40 hover:bg-steel/40',
              )}
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-metal mt-0.5">{s.desc}</p>
              </div>
              {isSelected && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-amber-brand rounded-full text-carbon text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>

      <Button
        onClick={onNext}
        disabled={selected.length === 0}
        className="w-full bg-amber-brand hover:bg-amber-light text-carbon font-bold py-4 h-auto disabled:opacity-40"
      >
        Continuar — {selected.length} serviço{selected.length !== 1 ? 's' : ''} selecionado{selected.length !== 1 ? 's' : ''}
      </Button>
    </div>
  )
}
