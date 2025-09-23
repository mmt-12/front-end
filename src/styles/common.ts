import { css } from '@emotion/react'

import { theme } from './theme'

export const fixedWithMargin = (margin: number) =>
  css({
    position: 'fixed',
    left: margin,
    right: margin,
    maxWidth: `calc(${theme.maxWidth} - ${margin * 2}px)`,
    margin: '0 auto',
    zIndex: 10,
  })

export const flexGap = (
  gap: number = 0,
  direction: 'row' | 'column' = 'column',
) =>
  css({
    display: 'flex',
    flexDirection: direction,
    gap: `${gap}px`,
  })