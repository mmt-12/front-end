import { css, type Theme } from '@emotion/react'
import { slideUp } from './animation'

export const modalStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100dvh',
    margin: '0 auto',
    maxWidth: theme.maxWidth,
    overflowY: 'hidden',
    background: theme.colors.bg,
    zIndex: 31,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    animation: `${slideUp} 220ms cubic-bezier(0.22, 1, 0.36, 1)`,
    willChange: 'transform, opacity',
  })
