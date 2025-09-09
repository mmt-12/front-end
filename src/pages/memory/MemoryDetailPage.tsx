import { PenNewSquare } from '@solar-icons/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { usePostList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import MemoryInfo from '@/components/memory/MemoryInfo'
import Post, { PostSkeleton } from '@/components/memory/Post'
import useHeader from '@/hooks/useHeader'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function MemoryDetailPage() {
  const navigate = useNavigate()
  const memoryId = Number(useParams().memoryId!)
  const { communityId } = useUserStore()
  const { data: memory } = usePostList(communityId, memoryId)

  useHeader({
    routeName: memory?.title || '',
    rightItem: {
      icon: PenNewSquare,
      onClick: () => {
        navigate(ROUTES.POST_REGISTER(memory.id))
      },
    },
  })

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostList(1, memory.id)
  const posts = data?.pages.flatMap(page => page.posts) || []

  return (
    <>
      <header css={{ padding: '16px 12px' }}>
        <MemoryInfo {...memory} saveEnabled />
      </header>
      <InfiniteScroll
        fetchNext={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
      >
        <ol>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
            : posts.map(post => <Post key={post.id} {...post} />)}
        </ol>
      </InfiniteScroll>
    </>
  )
}
