import { useHeaderStore } from '@/store/headerStore'
import { headerStyle } from '@/styles/header'
import HeaderItem from './HeaderItem'
import { useEffect } from 'react'

export default function Header() {
  const { leftItem, rightItem, routeName } = useHeaderStore()
  useEffect(() => {
    return () => {
      useHeaderStore.setState({
        leftItem: { icon: null, onClick: () => {} },
        rightItem: { icon: null, onClick: () => {} },
        routeName: '',
      })
    }
  }, [])
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
