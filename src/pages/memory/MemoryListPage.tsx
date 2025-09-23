import { useCallback, useEffect, useState } from 'react'
import { Album, SortByTime } from '@solar-icons/react'

import { useMemoryList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import NoContentFallback from '@/components/common/NoContentFallback'
import MemoryListItem, {
  MemoryListItemSkeleton,
} from '@/components/memory/MemoryListItem'
import GreetingPopup from '@/components/popup/GreetingPopup'
import useHeader from '@/hooks/useHeader'
import { ROUTES } from '@/routes/ROUTES'
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
    useMemoryList(1)
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

  const content = !data ? (
    <div>
      {Array.from({ length: 3 }).map((_, idx) => (
        <MemoryListItemSkeleton key={idx} isGrid={memoryListView == 'grid'} />
      ))}
    </div>
  ) : memories.length === 0 ? (
    <NoContentFallback
      size='full'
      message='아직 등록된 기억이 없어요. 소중한 기억을 추가해보세요!'
      image
      action={{
        label: '기억 등록하러 가기',
        to: ROUTES.MEMORY_REGISTER,
      }}
    />
  ) : (
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
  )

  return (
    <>
      <GreetingPopup />
      {content}
    </>
  )
}
