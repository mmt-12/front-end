import { useHeaderStore } from '@/store/headerStore'
import { useTheme } from '@emotion/react'
import { Bell } from '@solar-icons/react'
import { useEffect } from 'react'

export default function MapPage() {
  const theme = useTheme()
  const headerState = useHeaderStore(state => state)

  useEffect(() => {
    headerState.setRouteName('지도')
    headerState.setRightItem({
      icon: <Bell weight='Bold' size={32} color={theme.stone[500]} />,
      onClick: () => console.log('Bell clicked'),
    })
    headerState.setLeftItem({
      icon: null,
      onClick: () => console.log('nothing happens'),
    })
  }, [])
  return <div>map page</div>
}
