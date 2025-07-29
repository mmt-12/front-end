import { css, type Theme } from '@emotion/react'

interface Props {
  isOpen: boolean
  children: React.ReactNode
  close: () => void
}

export default function BottomDrawer({ children, isOpen, close }: Props) {
  if (!isOpen) return null
  return (
    <div css={backgroundStyle} onClick={close} data-testid='modal-background'>
      <div css={containerStyle} onClick={e => e.stopPropagation()}>
        <div css={barStyle} />
        {children}
      </div>
    </div>
  )
}

const backgroundStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})

const containerStyle = (theme: Theme) =>
  css({
    width: '100%',
    maxWidth: `calc(${theme.maxWidth} - 32px)`,
    padding: '14px 16px 48px 16px',
    backgroundColor: 'white',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    transform: 'translateY(16px)',
  })

const barStyle = (theme: Theme) =>
  css({
    width: '40px',
    height: '4px',
    backgroundColor: theme.stone[300],
    borderRadius: '2px',
  })
