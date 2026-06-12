import React from 'react'
import { COLORS, TYPOGRAPHY } from './tokens'

interface SectionLabelProps {
  label: string
  variant?: 'default' | 'dark'
  bordered?: boolean
  withBrackets?: boolean
  style?: React.CSSProperties
}

export default function SectionLabel({
  label,
  variant = 'default',
  bordered = false,
  withBrackets = false,
  style,
}: SectionLabelProps) {
  const text = withBrackets ? `[ ${label} ]` : label
  const color = variant === 'dark' ? COLORS.text.muted : COLORS.brand.orange

  return (
    <span
      style={{
        fontFamily: TYPOGRAPHY.families.mono,
        fontSize: TYPOGRAPHY.sizes.label,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color,
        display: bordered ? 'inline-block' : 'block',
        border: bordered ? `1px solid ${COLORS.brand.dimBorder}` : undefined,
        borderRadius: bordered ? '4px' : undefined,
        padding: bordered ? '4px 14px' : undefined,
        lineHeight: 1,
        ...style,
      }}
    >
      {text}
    </span>
  )
}
