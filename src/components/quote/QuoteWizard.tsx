'use client'

import { useReducer, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuoteStep1Service from './QuoteStep1Service'
import QuoteStep2Details from './QuoteStep2Details'
import QuoteStep3Contact from './QuoteStep3Contact'
import QuoteStep4Confirm from './QuoteStep4Confirm'
import QuoteProgress from './QuoteProgress'
import QuoteSuccess from './QuoteSuccess'

export interface WizardState {
  step: number
  services: string[]
  specs: Record<string, unknown>
  description: string
  reference_image_paths: string[]
  name: string
  phone: string
  email: string
  cep: string
  address: string
  city: string
  state: string
  quoteId: string | null
  leadId: string | null
}

type Action =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_SERVICES'; payload: string[] }
  | { type: 'SET_SPECS'; payload: Record<string, unknown> }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_IMAGES'; payload: string[] }
  | { type: 'SET_CONTACT'; payload: Partial<WizardState> }
  | { type: 'SET_RESULT'; payload: { quoteId: string; leadId: string } }
  | { type: 'HYDRATE'; payload: WizardState }

const INITIAL: WizardState = {
  step: 1,
  services: [],
  specs: {},
  description: '',
  reference_image_paths: [],
  name: '',
  phone: '',
  email: '',
  cep: '',
  address: '',
  city: '',
  state: 'SP',
  quoteId: null,
  leadId: null,
}

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'SET_STEP': return { ...state, step: action.payload }
    case 'SET_SERVICES': return { ...state, services: action.payload }
    case 'SET_SPECS': return { ...state, specs: action.payload }
    case 'SET_DESCRIPTION': return { ...state, description: action.payload }
    case 'SET_IMAGES': return { ...state, reference_image_paths: action.payload }
    case 'SET_CONTACT': return { ...state, ...action.payload }
    case 'SET_RESULT': return { ...state, quoteId: action.payload.quoteId, leadId: action.payload.leadId }
    case 'HYDRATE': return action.payload
    default: return state
  }
}

const STORAGE_KEY = 'quote-wizard-state'
// Fired once when user has name + phone (partial lead capture on abandonment)
const PARTIAL_KEY = 'quote-partial-sent'

async function sendPartialLead(state: WizardState) {
  const cleanPhone = state.phone.replace(/\D/g, '')
  if (!state.name || cleanPhone.length < 10) return
  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: state.name,
        phone: cleanPhone,
        email: state.email || undefined,
        service: state.services[0] || undefined,
        message: `[Abandono do wizard — step ${state.step}] Serviço: ${state.services.join(', ')}`,
      }),
      keepalive: true,
    })
  } catch {
    // best-effort
  }
}

export default function QuoteWizard() {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const partialSentRef = useRef(false)

  // Hydrate from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as WizardState
        if (parsed.step && parsed.step < 5) dispatch({ type: 'HYDRATE', payload: parsed })
      }
      partialSentRef.current = !!sessionStorage.getItem(PARTIAL_KEY)
    } catch {}
  }, [])

  // Persist to sessionStorage
  useEffect(() => {
    if (state.step < 5) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
    } else {
      try {
        sessionStorage.removeItem(STORAGE_KEY)
        sessionStorage.removeItem(PARTIAL_KEY)
      } catch {}
    }
  }, [state])

  // Partial lead capture: send once when user reaches step 4 (has name + phone)
  useEffect(() => {
    if (state.step >= 4 && state.name && state.phone && !partialSentRef.current && !state.leadId) {
      partialSentRef.current = true
      try { sessionStorage.setItem(PARTIAL_KEY, '1') } catch {}
      sendPartialLead(state)
    }
  }, [state.step, state.name, state.phone, state.leadId])

  const goTo = (step: number) => dispatch({ type: 'SET_STEP', payload: step })

  if (state.step === 5 && state.quoteId) {
    return <QuoteSuccess state={state} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <QuoteProgress currentStep={state.step} />

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {state.step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <QuoteStep1Service
                selected={state.services}
                onChange={(s) => dispatch({ type: 'SET_SERVICES', payload: s })}
                onNext={() => goTo(2)}
              />
            </motion.div>
          )}
          {state.step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <QuoteStep2Details
                services={state.services}
                specs={state.specs}
                description={state.description}
                images={state.reference_image_paths}
                onChange={(data) => dispatch({ type: 'SET_SPECS', payload: data.specs })}
                onDescriptionChange={(d) => dispatch({ type: 'SET_DESCRIPTION', payload: d })}
                onImagesChange={(imgs) => dispatch({ type: 'SET_IMAGES', payload: imgs })}
                onNext={() => goTo(3)}
                onBack={() => goTo(1)}
              />
            </motion.div>
          )}
          {state.step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <QuoteStep3Contact
                data={state}
                onChange={(data) => dispatch({ type: 'SET_CONTACT', payload: data })}
                onNext={() => goTo(4)}
                onBack={() => goTo(2)}
              />
            </motion.div>
          )}
          {state.step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <QuoteStep4Confirm
                state={state}
                onEdit={(step) => goTo(step)}
                onSuccess={(quoteId, leadId) => {
                  dispatch({ type: 'SET_RESULT', payload: { quoteId, leadId } })
                  dispatch({ type: 'SET_STEP', payload: 5 })
                }}
                onBack={() => goTo(3)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
