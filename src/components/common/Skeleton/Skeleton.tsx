import type { CSSProperties, ReactNode } from 'react'
import { css, keyframes, useTheme, type Theme } from '@emotion/react'

type Size = number | string

export interface SkeletonProps {
  width?: Size
  height?: Size
  radius?: number | string
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const baseStyle = (theme: Theme, width?: Size, height?: Size, radius?: Size) =>
  css({
    display: 'block',
    width: width ?? '100%',
    height: height ?? '1em',
    borderRadius: radius ?? 8,
    backgroundColor: theme.stone[150],
    backgroundImage: `linear-gradient(90deg, ${theme.stone[150]} 0%, ${theme.stone[100]} 50%, ${theme.stone[150]} 100%)`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.2s ease-in-out infinite`,
  })

export default function Skeleton({
  width,
  height,
  radius,
  style,
  className,
}: SkeletonProps) {
  const theme = useTheme()
  return (
    <div
      css={baseStyle(theme, width, height, radius)}
      style={style}
      className={className}
    />
  )
}

export function SkeletonCircle({
  size = 40,
  style,
  className,
}: {
  size?: Size
  style?: CSSProperties
  className?: string
}) {
  const theme = useTheme()
  return (
    <div
      css={baseStyle(theme, size, size, '50%')}
      style={style}
      className={className}
    />
  )
}

export function SkeletonText({
  lines = 1,
  width = '100%',
}: {
  lines?: number
  width?: Size
}) {
  const items = Array.from({ length: lines })
  return (
    <div>
      {items.map((_, idx) => (
        <Skeleton
          key={idx}
          height={15}
          width={idx === items.length - 1 ? width : '100%'}
          style={{ marginTop: idx ? 8 : 0 }}
        />
      ))}
    </div>
  )
}
