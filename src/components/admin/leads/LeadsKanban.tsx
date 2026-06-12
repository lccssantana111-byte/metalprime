'use client'

import { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { LeadCard } from './LeadCard'
import { LEAD_STATUS_LABELS } from '@/lib/constants'
import type { Lead, LeadStatus } from '@/types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const COLUMNS: LeadStatus[] = [
  'novo',
  'em_contato',
  'proposta_enviada',
  'em_negociacao',
  'ganho',
  'perdido',
]

const COLUMN_COLORS: Record<LeadStatus, string> = {
  novo: 'border-blue-200',
  em_contato: 'border-orange-200',
  proposta_enviada: 'border-purple-200',
  em_negociacao: 'border-orange-200',
  ganho: 'border-green-200',
  perdido: 'border-red-200',
  sem_interesse: 'border-slate-200',
}

const COLUMN_HEADER_COLORS: Record<LeadStatus, string> = {
  novo: 'bg-blue-50 text-blue-600',
  em_contato: 'bg-orange-50 text-orange-600',
  proposta_enviada: 'bg-purple-50 text-purple-600',
  em_negociacao: 'bg-orange-50 text-orange-600',
  ganho: 'bg-green-50 text-green-700',
  perdido: 'bg-red-50 text-red-600',
  sem_interesse: 'bg-slate-50 text-slate-500',
}

interface LeadsKanbanProps {
  initialLeads: Lead[]
}

export function LeadsKanban({ initialLeads }: LeadsKanbanProps) {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(initialLeads)

  const getColumnLeads = (status: LeadStatus) =>
    leads.filter((l) => l.status === status)

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { draggableId, destination } = result
      if (!destination) return

      const newStatus = destination.droppableId as LeadStatus
      const lead = leads.find((l) => l.id === draggableId)
      if (!lead || lead.status === newStatus) return

      setLeads((prev) =>
        prev.map((l) => (l.id === draggableId ? { ...l, status: newStatus } : l))
      )

      try {
        const res = await fetch(`/api/admin/leads/${draggableId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        })
        if (!res.ok) throw new Error()
        router.refresh()
      } catch {
        setLeads((prev) =>
          prev.map((l) => (l.id === draggableId ? { ...l, status: lead.status } : l))
        )
        toast.error('Erro ao mover lead.')
      }
    },
    [leads, router]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4 min-h-[calc(100vh-220px)]">
        {COLUMNS.map((col) => {
          const colLeads = getColumnLeads(col)
          return (
            <div
              key={col}
              className={`flex-shrink-0 w-64 bg-slate-50 border rounded-xl flex flex-col ${COLUMN_COLORS[col]}`}
            >
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-t-xl ${COLUMN_HEADER_COLORS[col]}`}>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {LEAD_STATUS_LABELS[col]}
                </span>
                <span className="text-xs font-bold bg-black/10 rounded-full px-2 py-0.5">
                  {colLeads.length}
                </span>
              </div>

              <Droppable droppableId={col}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-2 space-y-2 transition-colors rounded-b-xl ${
                      snapshot.isDraggingOver ? 'bg-white/80' : ''
                    }`}
                  >
                    {colLeads.map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.85 : 1,
                            }}
                          >
                            <LeadCard lead={lead} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {colLeads.length === 0 && !snapshot.isDraggingOver && (
                      <div className="text-center py-6">
                        <p className="text-xs text-slate-400">Sem leads aqui</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
