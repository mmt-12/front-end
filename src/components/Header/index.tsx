import { useHeaderStore } from '@/store/headerStore'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

export default function Header() {
  const headerState = useHeaderStore(state => state)
  return (
    <div css={headerStyle}>
      <HeaderItem
        icon={headerState.items.left.icon}
        onClick={headerState.items.left.onClick}
      />
      <div>
        <span css={{ fontSize: '16px', fontWeight: 'bold' }}>
          {headerState.routeName || '페이지 제목'}
        </span>
      </div>
      <HeaderItem
        icon={headerState.items.right.icon}
        onClick={headerState.items.right.onClick}
      />
    </div>
  )
}

const headerStyle = (theme: Theme) =>
  css({
    height: '56px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.bg,
    borderBottom: '1px solid #eee',
  })

const ItemStyle = (theme: Theme) =>
  css({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.stone[500],
  })

interface IHeaderItem {
  icon: React.ReactNode
  onClick: () => void
}

function HeaderItem({ icon, onClick }: IHeaderItem) {
  return (
    <div css={ItemStyle} onClick={onClick}>
      {icon}
    </div>
  )
}
