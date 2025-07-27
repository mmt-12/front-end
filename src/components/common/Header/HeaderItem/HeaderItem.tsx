import type { IHeaderItem } from '@/types/common'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

const ItemStyle = (theme: Theme) =>
  css({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.stone[500],
  })

export default function HeaderItem({ icon, onClick }: IHeaderItem) {
  const Icon = icon
  return (
    <div css={ItemStyle} onClick={onClick}>
      {Icon && <Icon size={32} weight='Bold' />}
    </div>
  )
}
