import { useTheme } from '@emotion/react'

interface Props {
  color?: string
  height?: number
}
export default function Border({ color, height = 1 }: Props) {
  const theme = useTheme()
  if (!color) color = theme.stone[150]

  return <div style={{ borderBottom: `${height}px solid ${color}` }} />
}
