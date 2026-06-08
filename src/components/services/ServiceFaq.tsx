'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { ServiceFaq as Faq } from '@/types'

interface Props {
  faq: Faq[]
}

export default function ServiceFaq({ faq }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  if (!faq.length) return null

  return (
    <section className="py-24 bg-carbon relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left label */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber-brand" />
              <span className="text-amber-brand text-xs font-semibold tracking-[0.35em] uppercase">FAQ</span>
            </div>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-foreground leading-none">
              Perguntas<br />
              <span className="text-metal/40">frequentes</span>
            </h2>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Accordion type="single" collapsible className="space-y-0">
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-foreground/10 last:border-b-0 data-[state=open]:border-amber-brand/20"
                >
                  <AccordionTrigger className="text-left text-metal-light hover:text-foreground hover:no-underline py-6 text-base font-medium gap-4">
                    <span className="text-metal-dark/50 font-mono text-xs mr-2 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-metal text-sm leading-relaxed pb-6 pl-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
