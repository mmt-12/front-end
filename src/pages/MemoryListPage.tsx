import useHeader from '@/hooks/useHeader'
import { Bell, SortByTime } from '@solar-icons/react'

export default function MemoryListPage() {
  useHeader({
    routeName: '기억',
    leftItem: {
      icon: <SortByTime weight='Bold' size={32} />,
      onClick: () => console.log('list clicked'),
    },
    rightItem: {
      icon: <Bell weight='Bold' size={32} />,
      onClick: () => console.log('Bell clicked'),
    },
  })

  return <div>memory list page</div>
}
