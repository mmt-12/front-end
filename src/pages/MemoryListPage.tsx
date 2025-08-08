import GreetingPopup from '@/components/common/popup/GreetingPopup'
import MemoryListItem from '@/components/memory/MemoryListItem'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { type IHeaderItem } from '@/types'
import { Album, SortByTime } from '@solar-icons/react'
import { useCallback, useEffect, useState } from 'react'

export default function MemoryListPage() {
  const [isGrid, setIsGrid] = useState(true)
  const [leftItem, setLeftItem] = useState<IHeaderItem>({
    icon: SortByTime,
    onClick: () => toggleViewMode(),
  })

  useHeader({
    routeName: '기억',
    leftItem: leftItem,
  })

  const toggleViewMode = useCallback(() => {
    setIsGrid(isGrid => !isGrid)
  }, [])

  useEffect(() => {
    if (!setLeftItem) return

    setLeftItem({
      icon: isGrid ? SortByTime : Album,
      onClick: () => toggleViewMode(),
    })
  }, [isGrid, setLeftItem, toggleViewMode])

  return (
    <div>
      <GreetingPopup />
      {MEMORIES.map(memory => (
        <MemoryListItem key={memory.id} {...memory} isGrid={isGrid} />
      ))}
    </div>
  )
}
