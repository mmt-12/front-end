import { theme } from '@/styles/theme'
import { css, type SerializedStyles } from '@emotion/react'

interface Props {
  label: string
  icon?: React.ReactNode
  type?: 'primary' | 'secondary' | 'disabled'
  size?: 'sm' | 'md' | 'lg' | 'full'
  onClick?: () => void
  customCss?: SerializedStyles
}

export default function Button({
  label,
  icon,
  type = 'primary',
  size = 'full',
  onClick,
  customCss,
}: Props) {
  return (
    <button
      css={[buttonStyle, sizeStyles[size], typeStyles(type, size), customCss]}
      onClick={onClick}
      disabled={type === 'disabled'}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

const buttonStyle = css({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  border: 'none',
  fontFamily: 'inherit',
})

const sizeStyles = {
  sm: css({
    padding: '10px 16px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 700,
  }),
  md: css({
    width: '100%',
    padding: '16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 700,
  }),
  lg: css({
    width: '280px',
    height: '280px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 700,
  }),
  full: css({
    width: '100%',
    padding: '16px 22px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 500,
  }),
}

const typeStyles = (type: Props['type'], size: Props['size']) => {
  if (type === 'primary') {
    return css({
      backgroundColor: theme.sky[500],
      color: 'white',
      '&:hover': {
        backgroundColor: theme.sky[600],
      },
    })
  }
  if (type === 'secondary') {
    return css({
      backgroundColor: 'white',
      color: theme.sky[500],
      borderWidth: size === 'lg' ? '3px' : '2px',
      borderStyle: 'solid',
      borderColor: theme.sky[500],
      '&:hover': {
        backgroundColor: theme.sky[100],
      },
    })
  }
  if (type === 'disabled') {
    return css({
      backgroundColor: theme.stone[200],
      color: theme.stone[400],
      '&:hover': {
        backgroundColor: theme.stone[300],
      },
    })
  }
}
