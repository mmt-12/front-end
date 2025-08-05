import useHeader from '@/hooks/useHeader'
import { Bell } from '@solar-icons/react'

export default function MapPage() {
  useHeader({
    routeName: '지도',
    rightItem: {
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
    },
    leftItem: {
      icon: null,
    },
  })

  return <div>map page</div>
}
