import React from 'react'
import { COLORS, TYPOGRAPHY } from './tokens'

type HeadingSize = 'hero' | 'large' | 'medium'
type HeadingTag = 'h1' | 'h2' | 'h3'

const SIZE_MAP: Record<HeadingSize, string> = {
  hero: TYPOGRAPHY.sizes.hero,
  large: TYPOGRAPHY.sizes.sectionLarge,
  medium: TYPOGRAPHY.sizes.sectionMedium,
}

interface SectionHeadingProps {
  children: React.ReactNode
  as?: HeadingTag
  size?: HeadingSize
  light?: boolean
  id?: string
  style?: React.CSSProperties
  className?: string
}

export default function SectionHeading({
  children,
  as: Tag = 'h2',
  size = 'large',
  light = false,
  id,
  style,
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={className}
      style={{
        fontFamily: TYPOGRAPHY.families.heading,
        fontWeight: 900,
        lineHeight: 0.92,
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
        margin: 0,
        color: light ? '#ffffff' : COLORS.text.dark,
        fontSize: SIZE_MAP[size],
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
