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

export const SAFE_AREA_TOP = 'env(safe-area-inset-top)'
export const SAFE_AREA_BOTTOM = 'env(safe-area-inset-bottom)'

export const withSafeAreaBottom = (value: string | number = '0px') =>
  `calc(${typeof value === 'number' ? `${value}px` : value} + ${SAFE_AREA_BOTTOM})`

export const withSafeAreaTop = (value: string | number = '0px') =>
  `calc(${typeof value === 'number' ? `${value}px` : value} + ${SAFE_AREA_TOP})`
