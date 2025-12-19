import { useEffect } from 'react'
import { useTheme } from '@emotion/react'

import { useThemeColor } from '@/hooks/useThemeColor'
import { useHeaderStore } from '@/store/headerStore'
import { headerStyle } from '@/styles/layout'
import HeaderItem from './HeaderItem'

export default function Header() {
  const theme = useTheme()
  const { leftItem, rightItem, routeName } = useHeaderStore()
  useThemeColor(theme.colors.white)

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
        <span css={{ fontSize: '16px' }}>{routeName}</span>
      </div>
      <HeaderItem icon={rightItem.icon} onClick={rightItem.onClick} />
    </div>
  )
}
