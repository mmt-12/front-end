import { css, type Theme } from '@emotion/react'

export const signupTitleStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 16px 20px 16px',
    marginTop: '36px',
    gap: '8px',
    h1: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.colors.stone[700],
      margin: '0',
    },
    p: {
      fontSize: 18,
      color: theme.colors.stone[600],
    },
  })
