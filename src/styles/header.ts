import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

export const headerStyle = (theme: Theme) =>
  css({
    height: '56px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    borderBottom: '1px solid #eee',
  })
