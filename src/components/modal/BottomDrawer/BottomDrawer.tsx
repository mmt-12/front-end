import { css, type Theme } from '@emotion/react'

import { slideUp } from '@/styles/animation'

interface Props {
  children: React.ReactNode
}

export default function BottomDrawer({ children }: Props) {
  return (
    <div
      css={[containerBaseStyle, animationStyle]}
      onClick={e => e.stopPropagation()}
    >
      <div css={barStyle} />
      {children}
    </div>
  )
}

const containerBaseStyle = (theme: Theme) =>
  css({
    width: '100%',
    height: 'fit-content',
    maxWidth: `calc(${theme.maxWidth} - 32px)`,
    padding: '0px 18px 24px 18px',

    backgroundColor: theme.colors.white,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',

    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',

    overflowY: 'scroll',
  })

const barStyle = (theme: Theme) =>
  css({
    margin: '16px auto',
    width: '40px',
    height: '4px',
    backgroundColor: theme.colors.stone[300],
    borderRadius: '2px',
  })

const animationStyle = css({
  animation: `${slideUp} 220ms cubic-bezier(0.22, 1, 0.36, 1)`,
  willChange: 'transform, opacity',
})
