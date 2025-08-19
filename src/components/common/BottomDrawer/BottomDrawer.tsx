import { css, type Theme } from '@emotion/react'

interface Props {
  children: React.ReactNode
  close: () => void
}

export default function BottomDrawer({ children }: Props) {
  return (
    <div css={containerStyle} onClick={e => e.stopPropagation()}>
      <div css={barStyle} />
      {children}
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    width: '100%',
    maxWidth: `calc(${theme.maxWidth} - 32px)`,
    padding: '0px 2px 8px 2px',

    backgroundColor: 'white',
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
