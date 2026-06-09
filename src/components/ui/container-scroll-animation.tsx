'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate   = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale    = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.04, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? '52rem' : '72rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 clamp(1rem, 4vw, 3rem)',
      }}
    >
      <div style={{ width: '100%', position: 'relative', perspective: '1200px' }}>
        {/* Title floats up as you scroll */}
        <motion.div
          style={{ translateY, textAlign: 'center', marginBottom: '3rem', maxWidth: '52rem', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {titleComponent}
        </motion.div>

        {/* 3D card */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformOrigin: 'top center',
            boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026',
            maxWidth: '72rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '2px solid #1e293b',
            borderRadius: 24,
            overflow: 'hidden',
            background: '#0f172a',
          }}
        >
          <div style={{ width: '100%', height: isMobile ? '22rem' : '38rem', overflow: 'hidden' }}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
