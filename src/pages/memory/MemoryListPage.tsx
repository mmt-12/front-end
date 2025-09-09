import { useCallback, useEffect, useState } from 'react'
import { Album, SortByTime } from '@solar-icons/react'

import { useMemoryList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import MemoryListItem, {
  MemoryListItemSkeleton,
} from '@/components/memory/MemoryListItem'
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMemoryList(1, {
      cursor: 0,
      size: 10,
    })
  const memories = data?.pages.flatMap(page => page.memories) || []

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
        <InfiniteScroll
          fetchNext={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNext={isFetchingNextPage}
        >
          {memories.map(memory => (
            <MemoryListItem
              key={memory.id}
              {...memory}
              isGrid={memoryListView == 'grid'}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <div>
          {Array.from({ length: 6 }).map((_, idx) => (
            <MemoryListItemSkeleton
              key={idx}
              isGrid={memoryListView == 'grid'}
            />
          ))}
        </div>
      )}
    </>
  )
}
