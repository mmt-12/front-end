import { css, type Theme } from '@emotion/react'

export const mainStyle = css({
  width: '100%',
  height: 'calc(100vh - 56px)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
})

export const headerStyle = (theme: Theme) =>
  css({
    height: '56px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderBottom: `1px solid ${theme.colors.stone[150]}`,
  })
