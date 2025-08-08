import GreetingPopup from '@/components/common/popup/GreetingPopup'
import MemoryListItem from '@/components/memory/MemoryListItem'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { type IHeaderItem } from '@/types'
import { Album, SortByTime } from '@solar-icons/react'
import { useCallback, useEffect, useState } from 'react'

export default function MemoryListPage() {
  const [isGrid, setIsGrid] = useState(false)
  const [leftItem, setLeftItem] = useState<IHeaderItem>({
    icon: SortByTime,
    onClick: () => toggleViewMode(),
  })

  useHeader({
    routeName: '기억',
    leftItem: leftItem,
  })

  const toggleViewMode = useCallback(() => {
    console.log('toggleViewMode')
    console.log('isGrid', isGrid)
    setIsGrid(isGrid => !isGrid)
  }, [isGrid])

  useEffect(() => {
    if (!setLeftItem) return

    setLeftItem({
      icon: isGrid ? Album : SortByTime,
      onClick: () => toggleViewMode(),
    })
  }, [isGrid, setLeftItem, toggleViewMode])

  return (
    <div>
      <GreetingPopup />
      {MEMORIES.map(memory => (
        <MemoryListItem key={memory.id} {...memory} />
      ))}
    </div>
  )
}
