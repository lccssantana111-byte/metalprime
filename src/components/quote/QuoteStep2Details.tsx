'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ChevronLeft } from 'lucide-react'

interface Props {
  services: string[]
  specs: Record<string, unknown>
  description: string
  images: string[]
  onChange: (data: { specs: Record<string, unknown> }) => void
  onDescriptionChange: (d: string) => void
  onImagesChange: (imgs: string[]) => void
  onNext: () => void
  onBack: () => void
}

export default function QuoteStep2Details({
  description,
  onDescriptionChange,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="bg-graphite border border-metal-dark/30 rounded-2xl p-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">Descreva com suas palavras</h2>
      <p className="text-metal text-sm mb-8">
        Sem precisar usar termos técnicos — nosso engenheiro interpreta. Foque no que você quer.
      </p>

      <div className="space-y-6 mb-8">
        <div>
          <Label htmlFor="description" className="text-metal-light mb-2 block">
            Descrição do projeto *
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Ex: Preciso de um portão de ferro de 3m de largura por 2,2m de altura com motor para uma residência. Gosto do estilo moderno com barras horizontais..."
            rows={6}
            className="bg-steel/30 border-metal-dark/40 focus:border-amber-brand/60 text-foreground placeholder:text-metal-dark resize-none"
          />
          <p className="text-xs text-metal-dark mt-2">
            Inclua dimensões aproximadas, material preferido e referências visuais se tiver
          </p>
        </div>

        <div className="bg-steel/20 border border-metal-dark/20 rounded-xl p-5">
          <p className="text-sm font-medium text-metal-light mb-2">💡 Dica</p>
          <p className="text-sm text-metal">
            Na visita técnica, nosso engenheiro tira todas as medidas. Por agora, uma descrição
            geral já basta para montarmos um orçamento inicial.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-metal-dark/50 text-metal-light hover:bg-steel/30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
        <Button
          onClick={onNext}
          disabled={description.trim().length < 10}
          className="flex-1 bg-amber-brand hover:bg-amber-light text-carbon font-bold disabled:opacity-40"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
