import { useHeaderStore } from '@/store/headerStore'
import { Bell, SortByTime } from '@solar-icons/react'
import { useEffect } from 'react'

export default function MemoryListPage() {
  const headerState = useHeaderStore(state => state)

  useEffect(() => {
    headerState.setRouteName('기억')
    headerState.setLeftItem({
      icon: <SortByTime weight='Bold' size={32} />,
      onClick: () => console.log('list clicked'),
    })
    headerState.setRightItem({
      icon: <Bell weight='Bold' size={32} />,
      onClick: () => console.log('Bell clicked'),
    })
  }, [])

  return <div>memory list page</div>
}
