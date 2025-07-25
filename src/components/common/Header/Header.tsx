import { useHeaderStore } from '@/store/headerStore'
import { headerStyle } from '@/styles/header'
import HeaderItem from './HeaderItem'

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
