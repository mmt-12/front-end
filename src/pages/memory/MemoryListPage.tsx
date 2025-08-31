import { useCallback, useEffect, useState } from 'react'
import { Album, SortByTime } from '@solar-icons/react'

import { useMemoryList } from '@/api'
import MemoryListItem from '@/components/memory/MemoryListItem'
import GreetingPopup from '@/components/popup/GreetingPopup'
import useHeader from '@/hooks/useHeader'
import { useSettingStore } from '@/store/settingStore'
import { type IHeaderItem } from '@/types'

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

  const { data } = useMemoryList(1, {
    cursor: 0,
    size: 10,
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
    <>
      <GreetingPopup />
      {data ? (
        data.memories.map(memory => (
          <MemoryListItem
            key={memory.id}
            {...memory}
            isGrid={memoryListView == 'grid'}
          />
        ))
      ) : (
        <></>
      )}
    </>
  )
}
