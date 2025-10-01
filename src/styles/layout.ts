import { css, type Theme } from '@emotion/react'

import { SAFE_AREA_TOP, withSafeAreaTop } from './common'

export const headerStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    top: 0,
    width: '100%',
    maxWidth: '720px',
    height: withSafeAreaTop(56),
    padding: `${SAFE_AREA_TOP} 16px 0 16px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderBottom: `1px solid ${theme.colors.stone[150]}`,
    zIndex: 20,
  })
