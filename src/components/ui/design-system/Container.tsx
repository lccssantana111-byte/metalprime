import React from 'react'
import { SPACING } from './tokens'

type ContainerSize = 'sm' | 'md' | 'lg' | 'full'

const MAX_WIDTH_MAP: Record<ContainerSize, string> = {
  sm: '800px',
  md: SPACING.container.maxWidth,
  lg: '1600px',
  full: 'none',
}

interface ContainerProps {
  children: React.ReactNode
  size?: ContainerSize
  className?: string
  style?: React.CSSProperties
}

export default function Container({
  children,
  size = 'md',
  className,
  style,
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: MAX_WIDTH_MAP[size],
        margin: '0 auto',
        padding: `0 ${SPACING.container.paddingX}`,
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
