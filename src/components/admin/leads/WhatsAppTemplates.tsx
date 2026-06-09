'use client'

import { useState } from 'react'
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import type { LeadStatus, ServiceType } from '@/types'

const SERVICE_NAMES: Record<ServiceType, string> = {
  portoes: 'portões',
  grades_e_cercas: 'grades e cercas',
  escadas: 'escadas metálicas',
  corrimoes: 'corrimões e guarda-corpos',
  estruturas_metalicas: 'estruturas metálicas',
  sob_medida: 'projeto sob medida',
}

function buildTemplates(name: string, service: string, phone: string): Record<LeadStatus, { label: string; message: string }[]> {
  return {
    novo: [
      {
        label: 'Primeiro contato',
        message: `Olá, ${name}! Aqui é da equipe ${process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Metalprime Serralheria'}. Recebemos seu interesse em ${service} e gostaríamos de entender melhor seu projeto. Tem um momento para conversar?`,
      },
      {
        label: 'Agendamento de visita',
        message: `Olá, ${name}! Vi seu pedido de orçamento para ${service}. Podemos agendar uma visita técnica gratuita para avaliar o local e oferecer a melhor proposta. Qual seria um bom dia e horário para você?`,
      },
    ],
    em_contato: [
      {
        label: 'Follow-up',
        message: `Olá, ${name}! Tudo bem? Passando para saber se você tem mais alguma dúvida sobre o projeto de ${service}. Estou à disposição!`,
      },
      {
        label: 'Confirmar visita',
        message: `Olá, ${name}! Confirmo nossa visita técnica para amanhã. Estaremos no local no horário combinado. Qualquer imprevisto, é só me avisar aqui!`,
      },
    ],
    proposta_enviada: [
      {
        label: 'Confirmação de recebimento',
        message: `Olá, ${name}! Acabei de enviar a proposta para o seu projeto de ${service}. Por favor, confirme o recebimento. Fico à disposição para qualquer dúvida sobre os valores ou especificações.`,
      },
      {
        label: 'Follow-up da proposta',
        message: `Olá, ${name}! Tudo bem? Passando para saber se você teve a chance de avaliar a proposta para ${service}. Posso esclarecer qualquer ponto ou ajustar algo conforme sua necessidade.`,
      },
    ],
    em_negociacao: [
      {
        label: 'Condições especiais',
        message: `Olá, ${name}! Conseguimos verificar aqui internamente e temos flexibilidade para negociar as condições de pagamento do projeto de ${service}. Podemos conversar sobre isso?`,
      },
    ],
    ganho: [
      {
        label: 'Boas-vindas / Início',
        message: `Olá, ${name}! Fico muito feliz que vamos trabalhar juntos no seu projeto de ${service}. Em breve você receberá as informações sobre o cronograma de execução. Qualquer dúvida, estou aqui!`,
      },
    ],
    perdido: [
      {
        label: 'Reativação futura',
        message: `Olá, ${name}! Espero que esteja bem. Sei que por ora não seguimos em frente com o projeto de ${service}, mas caso precise de apoio no futuro, estarei à disposição. Abraço!`,
      },
    ],
    sem_interesse: [],
  }
}

interface Props {
  name: string
  phone: string
  service: ServiceType | null
  status: LeadStatus
  whatsappNumber: string
}

export function WhatsAppTemplates({ name, phone, service, status, whatsappNumber }: Props) {
  const [open, setOpen] = useState(false)
  const serviceName = service ? SERVICE_NAMES[service] : 'nossos serviços'
  const templates = buildTemplates(name, serviceName, phone)[status] ?? []

  if (templates.length === 0) return null

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-slate-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          Templates WhatsApp
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {open && (
        <div className="px-5 pb-4 space-y-3 border-t border-slate-100 pt-4">
          {templates.map((tpl) => (
            <div key={tpl.label} className="bg-slate-100 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-brand mb-1">{tpl.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{tpl.message}</p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tpl.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#1da851] transition-colors font-medium"
              >
                <MessageCircle className="w-3 h-3" />
                Enviar via WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
