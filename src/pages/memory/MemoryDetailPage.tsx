import { PenNewSquare } from '@solar-icons/react'
import { useNavigate, useParams } from 'react-router-dom'

import { usePostList } from '@/api'
import { useMemoryDetail } from '@/api/memory'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import NoContentFallback from '@/components/common/NoContentFallback'
import MemoryInfo from '@/components/memory/MemoryInfo'
import MemoryInfoSkeleton from '@/components/memory/MemoryInfo/MemoryInfo.Skeleton'
import PostListItem, {
  PostListItemSkeleton,
} from '@/components/memory/PostListItem'
import useHeader from '@/hooks/useHeader'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function MemoryDetailPage() {
  const navigate = useNavigate()
  const memoryId = Number(useParams().memoryId)
  const { communityId } = useUserStore()
  const { data: memory } = useMemoryDetail(communityId, memoryId)

  useHeader({
    routeName: memory?.title || '',
    rightItem: {
      icon: PenNewSquare,
      onClick: () => {
        navigate(ROUTES.POST_REGISTER(memoryId))
      },
    },
  })

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostList(1, memoryId)
  const posts = data?.pages.flatMap(page => page.posts) || []
  const isEmpty = !isLoading && posts.length === 0

  return (
    <>
      <header css={{ padding: '4px' }}>
        {memory ? (
          <MemoryInfo {...memory} saveEnabled />
        ) : (
          <MemoryInfoSkeleton saveEnabled description />
        )}
      </header>
      <InfiniteScroll
        fetchNext={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
        disabled={isEmpty}
      >
        {isLoading ? (
          <ol>
            {Array.from({ length: 3 }).map((_, i) => (
              <PostListItemSkeleton key={i} />
            ))}
          </ol>
        ) : posts.length > 0 ? (
          <ol>
            {posts.map(post => (
              <PostListItem key={post.id} {...post} />
            ))}
          </ol>
        ) : (
          <NoContentFallback size='block' message='아직 작성된 글이 없어요. 🥲' />
        )}
      </InfiniteScroll>
    </>
  )
}
