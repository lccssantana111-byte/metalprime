import React from 'react'
import { COLORS, DOT_GRID_STYLE, SPACING } from './tokens'

type SectionTheme = 'light' | 'dark' | 'paper' | 'transparent'
type PaddingY = 'sm' | 'md' | 'lg'

const BG_MAP: Record<SectionTheme, string | undefined> = {
  light: COLORS.bg.light,
  dark: COLORS.bg.dark,
  paper: COLORS.bg.paper,
  transparent: undefined,
}

const PADDING_MAP: Record<PaddingY, string> = {
  sm: SPACING.section.paddingYSm,
  md: SPACING.section.paddingY,
  lg: SPACING.section.paddingYLg,
}

interface SectionProps {
  children: React.ReactNode
  theme?: SectionTheme
  paddingY?: PaddingY
  dotGrid?: boolean
  as?: 'section' | 'div'
  id?: string
  'aria-labelledby'?: string
  style?: React.CSSProperties
  className?: string
}

export default function Section({
  children,
  theme = 'light',
  paddingY = 'md',
  dotGrid = false,
  as: Tag = 'section',
  id,
  'aria-labelledby': ariaLabelledBy,
  style,
  className,
}: SectionProps) {
  const bg = BG_MAP[theme]

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: `${PADDING_MAP[paddingY]} 0`,
        ...(bg ? { background: bg } : {}),
        ...style,
      }}
    >
      {dotGrid && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            ...DOT_GRID_STYLE,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </Tag>
  )
}
