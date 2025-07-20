import { useHeaderStore } from '@/store/headerStore'
import { useTheme } from '@emotion/react'
import { Bell } from '@solar-icons/react'
import { useEffect } from 'react'

export default function CalendarPage() {
  const theme = useTheme()
  const { setRouteName, setRightItem, setLeftItem } = useHeaderStore(
    state => state,
  )

  useEffect(() => {
    setRouteName('달력')
    setRightItem({
      icon: <Bell weight='Bold' size={32} color={theme.stone[500]} />,
      onClick: () => console.log('Bell clicked'),
    })
    setLeftItem({
      icon: null,
      onClick: () => console.log('nothing happens'),
    })
  }, [])
  return <div>calendar page</div>
}
