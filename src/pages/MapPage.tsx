import useHeader from '@/hooks/useHeader'
import { Bell } from '@solar-icons/react'

export default function MapPage() {
  useHeader({
    routeName: '지도',
    leftItem: {
      icon: <Bell weight='Bold' size={32} />,
      onClick: () => console.log('Bell clicked'),
    },
    rightItem: {
      icon: null,
      onClick: () => console.log('nothing happens'),
    },
  })

  return <div>map page</div>
}
