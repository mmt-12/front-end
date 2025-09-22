import type { ReactNode } from 'react'
import { css, keyframes, useTheme, type Theme } from '@emotion/react'

type Size = number | string

export interface SkeletonProps {
  width?: Size
  height?: Size
  radius?: number | string
  className?: string
  children?: ReactNode
}

export default function Skeleton({
  width,
  height,
  radius = 8,
  className,
}: SkeletonProps) {
  const theme = useTheme()
  return (
    <div css={baseStyle(theme, width, height, radius)} className={className} />
  )
}

export function SkeletonCircle({
  size = 40,
  className,
}: {
  size?: Size
  className?: string
}) {
  const theme = useTheme()
  return <div css={baseStyle(theme, size, size, '50%')} className={className} />
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
          css={{ marginTop: idx ? 8 : 0 }}
        />
      ))}
    </div>
  )
}

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const baseStyle = (
  theme: Theme,
  width: Size = '100%',
  height: Size = '1em',
  radius: Size,
) =>
  css({
    display: 'block',
    width: width ?? '100%',
    height: height ?? '1em',
    borderRadius: radius,
    backgroundColor: theme.colors.stone[150],
    backgroundImage: `linear-gradient(90deg, ${theme.colors.stone[150]} 0%, ${theme.colors.stone[100]} 50%, ${theme.colors.stone[150]} 100%)`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.2s ease-in-out infinite`,
  })
