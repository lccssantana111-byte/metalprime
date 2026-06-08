const steps = [
  { number: 1, label: 'Serviço' },
  { number: 2, label: 'Detalhes' },
  { number: 3, label: 'Contato' },
  { number: 4, label: 'Confirmação' },
]

export default function QuoteProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between relative">
      <div className="absolute top-4 left-0 right-0 h-px bg-metal-dark/40 z-0" />
      <div
        className="absolute top-4 left-0 h-px bg-amber-brand z-0 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step) => {
        const done = currentStep > step.number
        const active = currentStep === step.number

        return (
          <div key={step.number} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                done
                  ? 'bg-amber-brand border-amber-brand text-carbon'
                  : active
                  ? 'bg-carbon border-amber-brand text-amber-brand'
                  : 'bg-carbon border-metal-dark/40 text-metal-dark'
              }`}
            >
              {done ? '✓' : step.number}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block transition-colors ${
                active ? 'text-foreground' : done ? 'text-amber-brand' : 'text-metal-dark'
              }`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
