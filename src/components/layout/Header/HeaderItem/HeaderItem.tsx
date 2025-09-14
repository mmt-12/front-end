import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import type { IHeaderItem } from '@/types/common'

const ItemStyle = (theme: Theme) =>
  css({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.stone[500],
    borderRadius: '50%',
    transition: 'transform 120ms ease, background-color 160ms ease',
    ':active': {
      transform: 'scale(0.94)',
      backgroundColor: theme.colors.stone[100],
    },
  })

export default function HeaderItem({ icon, onClick }: IHeaderItem) {
  const Icon = icon
  return (
    <button css={ItemStyle} onClick={onClick} data-testid='header-item'>
      {Icon && <Icon size={32} weight='Bold' />}
    </button>
  )
}
