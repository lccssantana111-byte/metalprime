'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { COLORS, RADIUS, SHADOWS, TYPOGRAPHY } from './tokens'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const PADDING_MAP: Record<ButtonSize, { noIcon: string; withIcon: string }> = {
  sm: { noIcon: '10px 20px', withIcon: '10px 12px 10px 20px' },
  md: { noIcon: '13px 28px', withIcon: '13px 14px 13px 26px' },
  lg: { noIcon: '16px 34px', withIcon: '16px 16px 16px 32px' },
}

const FONT_SIZE_MAP: Record<ButtonSize, string> = {
  sm: '12px',
  md: '14px',
  lg: '15px',
}

interface CTAButtonProps {
  variant: ButtonVariant
  size?: ButtonSize
  href?: string
  hrefExternal?: string
  onClick?: () => void
  children: React.ReactNode
  icon?: React.ReactNode
  iconCircle?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  onDark?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function CTAButton({
  variant,
  size = 'md',
  href,
  hrefExternal,
  onClick,
  children,
  icon,
  iconCircle = false,
  type = 'button',
  disabled = false,
  onDark = false,
  style,
  className,
}: CTAButtonProps) {
  const [hovered, setHovered] = useState(false)

  const padding = icon && iconCircle
    ? PADDING_MAP[size].withIcon
    : PADDING_MAP[size].noIcon

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size === 'sm' ? '8px' : '10px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    fontFamily: TYPOGRAPHY.families.body,
    fontWeight: 700,
    fontSize: FONT_SIZE_MAP[size],
    letterSpacing: '0.02em',
    padding,
    borderRadius: RADIUS.pill,
    transition: 'all 0.25s ease',
    opacity: disabled ? 0.5 : 1,
    transform: hovered && !disabled ? 'translateY(-1px)' : 'translateY(0)',
    ...style,
  }

  const variantStyle: React.CSSProperties = (() => {
    if (variant === 'primary') {
      return {
        background: hovered ? COLORS.brand.hover : COLORS.brand.orange,
        color: '#ffffff',
        boxShadow: hovered ? SHADOWS.primaryBtnHover : SHADOWS.primaryBtn,
      }
    }
    if (variant === 'secondary') {
      return {
        background: hovered
          ? 'rgba(255,255,255,0.12)'
          : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}`,
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'none',
      }
    }
    // ghost
    if (onDark) {
      return {
        background: hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.14)'}`,
        color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)',
        boxShadow: 'none',
      }
    }
    return {
      background: hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
      border: `1px solid ${hovered ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.12)'}`,
      color: hovered ? COLORS.text.dark : COLORS.text.muted,
      boxShadow: 'none',
    }
  })()

  const iconNode = icon ? (
    iconCircle ? (
      <span style={{
        width: size === 'sm' ? '28px' : '32px',
        height: size === 'sm' ? '28px' : '32px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </span>
    ) : (
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </span>
    )
  ) : null

  const combinedStyle = { ...baseStyle, ...variantStyle }

  const handlers = {
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  if (hrefExternal) {
    return (
      <a
        href={hrefExternal}
        target="_blank"
        rel="noopener noreferrer"
        style={combinedStyle}
        className={className}
        {...handlers}
      >
        {children}
        {iconNode}
      </a>
    )
  }

  if (href) {
    return (
      <Link
        href={href}
        style={combinedStyle}
        className={className}
        {...handlers}
      >
        {children}
        {iconNode}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={combinedStyle}
      className={className}
      {...handlers}
    >
      {children}
      {iconNode}
    </button>
  )
}
