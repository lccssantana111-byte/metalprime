'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND_NAME } from '@/lib/constants'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const shown = sessionStorage.getItem('preloader-shown')
    if (shown) {
      setVisible(false)
      return
    }
    sessionStorage.setItem('preloader-shown', '1')
    const timer = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#060809',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Subtle noise texture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.025,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Ambient glow behind logo */}
          <motion.div
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>

            {/* Logo */}
            <motion.div
              style={{ position: 'relative' }}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glint ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  border: '1px solid rgba(249,115,22,0.25)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0.4], scale: [0.8, 1.05, 1] }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
              <img
                src="/logo.png"
                alt="Metal Shark"
                style={{ width: '100px', height: '100px', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 900,
                fontSize: '22px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}>
                {BRAND_NAME.split(' ')[0].toUpperCase()}
              </div>
              <div style={{
                fontFamily: 'var(--font-ibm-mono)',
                fontSize: '9px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#f97316',
              }}>
                Engenharia em Aço
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              style={{
                width: '120px',
                height: '1px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '99px',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                  borderRadius: '99px',
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
