import GreetingPopup from '@/components/common/popup/GreetingPopup'
import useHeader from '@/hooks/useHeader'
import { SortByTime } from '@solar-icons/react'

export default function MemoryListPage() {
  useHeader({
    routeName: '기억',
    leftItem: {
      icon: SortByTime,
      onClick: () => console.log('list clicked'),
    },
  })

  return (
    <div>
      memory list page
      <GreetingPopup />
    </div>
  )
}
