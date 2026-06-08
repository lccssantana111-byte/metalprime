'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const shown = sessionStorage.getItem('preloader-shown')
    if (shown) {
      setVisible(false)
      return
    }
    sessionStorage.setItem('preloader-shown', '1')
    const timer = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-carbon"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#8c97a0 1px, transparent 1px), linear-gradient(90deg, #8c97a0 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            {/* Animated logo mark */}
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 border border-amber-brand/20 rotate-45"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.div
                className="absolute inset-3 border border-amber-brand/50 rotate-45"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.div
                className="absolute inset-6 bg-amber-brand rotate-45"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              {/* Spinning outer ring */}
              <motion.div
                className="absolute -inset-3 border-t border-amber-brand/30 rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              />
            </div>

            {/* Brand name letter-by-letter */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-0.5"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                {'METALPRIME'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-display font-black text-lg tracking-[0.4em] text-foreground/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Loading bar */}
            <motion.div
              className="w-40 h-px bg-foreground/5 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full bg-amber-brand"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ delay: 0.8, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
