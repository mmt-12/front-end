import { css } from '@emotion/react'

import { useGuestBookList } from '@/api/guestbook'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import Comment from '@/components/guest-book/Comment/Comment'
import { flexGap } from '@/styles/common'
import GuestBookBoardSkeleton from './GuestBookBoard.Skeleton'

interface Props {
  communityId: number
  associateId: number
}

export default function GuestBookBoard({ communityId, associateId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGuestBookList(communityId, associateId, { size: 10 })

  const comments = data?.pages.flatMap(page => page.guestBooks) || []

  if (isLoading) return <GuestBookBoardSkeleton />

  return (
    <div css={containerStyle}>
      <InfiniteScroll
        fetchNext={() => fetchNextPage()}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
      >
        <div css={flexGap(16)}>
          {comments.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

const containerStyle = css({
  width: '100%',
})
