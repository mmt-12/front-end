import useHeader from '@/hooks/useHeader'
import { Bell } from '@solar-icons/react'

export default function CalendarPage() {
  useHeader({
    routeName: '달력',
    leftItem: {
      icon: null,
      onClick: () => console.log('nothing happens'),
    },
    rightItem: {
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
    },
  })

  return <div>calendar page</div>
}
