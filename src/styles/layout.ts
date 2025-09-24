import { css, type Theme } from '@emotion/react'

export const SAFE_AREA_TOP = 'env(safe-area-inset-top)'
export const SAFE_AREA_BOTTOM = 'env(safe-area-inset-bottom)'

export const mainStyle = css({
  width: '100%',
  height: `calc(100vh - (56px + ${SAFE_AREA_TOP}))`,
  paddingTop: `calc(56px + ${SAFE_AREA_TOP})`,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
})

export const headerStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: `calc(56px + ${SAFE_AREA_TOP})`,
    padding: `${SAFE_AREA_TOP} 16px 0 16px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderBottom: `1px solid ${theme.colors.stone[150]}`,
    zIndex: 20,
  })
