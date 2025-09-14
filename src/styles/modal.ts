import { css, type Theme } from '@emotion/react'

export const modalStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    margin: '0 auto',
    maxWidth: theme.maxWidth,
    overflowY: 'hidden',
    background: theme.colors.bg,
    zIndex: 31,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  })
