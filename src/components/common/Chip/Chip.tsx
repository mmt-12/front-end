import type { JSX } from 'react'
import { css, useTheme, type Interpolation, type Theme } from '@emotion/react'

interface Props {
  label: string | number
  Icon: JSX.ElementType
  onClick?: () => void
  customCss?: Interpolation<Theme>
}

export default function Chip({ label, onClick, Icon, customCss }: Props) {
  const theme = useTheme()
  return (
    <div css={[chipStyle(theme, !!onClick), customCss]} onClick={onClick}>
      <Icon weight='Bold' size={19} color={theme.stone[600]} />
      <p>{label}</p>
    </div>
  )
}

const chipStyle = (theme: Theme, clickable: boolean) =>
  css({
    width: 'fit-content',
    padding: '3px 6px',

    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,

    borderRadius: '14px',
    backgroundColor: theme.stone[150],
    border: clickable ? `1px solid ${theme.stone[800]}` : 'none',

    p: {
      color: theme.stone[900],
      fontSize: '13px',
    },
  })
