'use client'

import React, { createContext, useContext, useRef, useState } from 'react'

interface MouseEnterContextType {
  isMouseEntered: boolean
}

const MouseEnterContext = createContext<MouseEnterContextType>({ isMouseEntered: false })

export function CardContainer({
  children,
  className,
  containerClassName,
  style,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 18
    const y = (e.clientY - top - height / 2) / 18
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
    containerRef.current.style.transition = 'transform 0.05s linear'
  }

  const handleMouseLeave = () => {
    setIsMouseEntered(false)
    if (!containerRef.current) return
    containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
    containerRef.current.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)'
  }

  return (
    <MouseEnterContext.Provider value={{ isMouseEntered }}>
      <div
        style={{ perspective: '900px', ...style }}
        className={containerClassName}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={className}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export function CardBody({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  )
}

export function CardItem({
  children,
  className,
  style,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  translateX?: number
  translateY?: number
  translateZ?: number
}) {
  const { isMouseEntered } = useContext(MouseEnterContext)

  const transform = isMouseEntered
    ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`
    : 'translateX(0px) translateY(0px) translateZ(0px)'

  return (
    <div
      className={className}
      style={{
        transform,
        transition: isMouseEntered ? 'transform 0.12s ease-out' : 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
