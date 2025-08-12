import {
  css,
  useTheme,
  type SerializedStyles,
  type Theme,
} from '@emotion/react'
import type { JSX } from '@emotion/react/jsx-runtime'

interface Props {
  label: string | number
  Icon: JSX.ElementType
  onClick?: () => void
  customCss?: SerializedStyles
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

    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 6px',
    borderRadius: '20px',
    backgroundColor: theme.stone[150],
    border: clickable ? `1px solid ${theme.stone[800]}` : 'none',

    p: {
      color: theme.stone[900],
      fontSize: '13px',
    },
  })
