import { css, type Theme } from '@emotion/react'
import { slideUp, slideDown } from '@/styles/animation'

interface Props {
  children: React.ReactNode
  closing?: boolean
}

export default function BottomDrawer({ children, closing }: Props) {
  return (
    <div
      css={[
        containerBaseStyle,
        animationStyle(closing),
      ]}
      onClick={e => e.stopPropagation()}
    >
      <div css={barStyle} />
      {children}
    </div>
  )
}

const containerBaseStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    width: '100%',
    maxWidth: `calc(${theme.maxWidth} - 32px)`,
    padding: '0px 2px 8px 2px',

    backgroundColor: theme.white,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',

    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  })

const barStyle = (theme: Theme) =>
  css({
    margin: '16px auto',
    width: '40px',
    height: '4px',
    backgroundColor: theme.stone[300],
    borderRadius: '2px',
  })

const animationStyle = (closing?: boolean) =>
  css({
    animation: `${closing ? slideDown : slideUp} 220ms cubic-bezier(0.22, 1, 0.36, 1)`,
    willChange: 'transform, opacity',
  })
