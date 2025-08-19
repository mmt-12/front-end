import MemoryListItem from '@/components/memory/MemoryListItem'
import GreetingPopup from '@/components/popup/GreetingPopup'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
import { useSettingStore } from '@/store/settingStore'
import { type IHeaderItem } from '@/types'
import { Album, SortByTime } from '@solar-icons/react'
import { useCallback, useEffect, useState } from 'react'

export default function MemoryListPage() {
  const { memoryListView, setMemoryListView } = useSettingStore()

  const [leftItem, setLeftItem] = useState<IHeaderItem>({
    icon: SortByTime,
    onClick: () => toggleViewMode(),
  })

  useHeader({
    routeName: '기억',
    leftItem: leftItem,
  })

  const toggleViewMode = useCallback(() => {
    setMemoryListView(memoryListView == 'grid' ? 'list' : 'grid')
  }, [memoryListView, setMemoryListView])

  useEffect(() => {
    if (!setLeftItem) return

    setLeftItem({
      icon: memoryListView == 'grid' ? SortByTime : Album,
      onClick: () => toggleViewMode(),
    })
  }, [memoryListView, setLeftItem, toggleViewMode])

  return (
    <div>
      <GreetingPopup />
      {MEMORIES.map(memory => (
        <MemoryListItem
          key={memory.id}
          {...memory}
          isGrid={memoryListView == 'grid'}
        />
      ))}
    </div>
  )
}
