import { useHeaderStore } from '@/store/headerStore'
import { headerStyle } from '@/styles/header'
import HeaderItem from './HeaderItem'

export default function Header() {
  const { leftItem, rightItem, routeName } = useHeaderStore()
  return (
    <div css={headerStyle}>
      <HeaderItem icon={leftItem.icon} onClick={leftItem.onClick} />
      <div>
        <span css={{ fontSize: '16px', fontWeight: 'bold' }}>{routeName}</span>
      </div>
      <HeaderItem icon={rightItem.icon} onClick={rightItem.onClick} />
    </div>
  )
}
