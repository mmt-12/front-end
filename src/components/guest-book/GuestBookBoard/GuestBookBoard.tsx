import { useState } from 'react'
import { css, useTheme } from '@emotion/react'
import { CloseCircle, RoundArrowUp } from '@solar-icons/react'

import { useCreateGuestBookText, useGuestBookList } from '@/api/guestbook'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import InputField from '@/components/common/InputField'
import Comment from '@/components/guest-book/Comment'
import ReactBar from '@/components/memory/ReactBar/ReactBar'
import { flexGap } from '@/styles/common'
import GuestBookBoardSkeleton from './GuestBookBoard.Skeleton'

interface Props {
  communityId: number
  associateId: number
}

export default function GuestBookBoard({ communityId, associateId }: Props) {
  const [inputValue, setInputValue] = useState<string>('')
  const theme = useTheme()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGuestBookList(communityId, associateId, { size: 10 })
  const { mutate: createComment, isPending } = useCreateGuestBookText(
    communityId,
    associateId,
  )

  const comments = data?.pages.flatMap(page => page.guestBooks) || []

  const handleCommentSubmit = () => {
    if (inputValue.trim() === '' || isPending) return
    createComment(
      { type: 'TEXT', content: inputValue },
      {
        onSuccess: () => {
          setInputValue('')
        },
      },
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleCommentSubmit()
    }
  }

  return (
    <div css={[containerStyle, flexGap(16)]}>
      <div css={inputFieldCss}>
        <InputField
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div css={inputActionsStyle}>
          {inputValue === '' ? (
            <ReactBar iconSize={32} customCss={reactBarStyle} />
          ) : (
            <div css={flexGap(4, 'row')}>
              <CloseCircle
                weight='Bold'
                size={32}
                color={theme.stone[300]}
                onClick={() => setInputValue('')}
              />
              <RoundArrowUp
                weight='Bold'
                size={32}
                color={theme.sky[500]}
                onClick={handleCommentSubmit}
              />
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <GuestBookBoardSkeleton />
      ) : (
        <InfiniteScroll
          fetchNext={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNext={isFetchingNextPage}
          customCSS={flexGap(16)}
        >
          {comments.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  )
}

const containerStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const inputFieldCss = css({
  position: 'relative',
  fontFamily: 'Pretendard Variable',
  '>div:nth-of-type(1)': {
    margin: '12px 0 !important',
    input: {
      padding: '14px 82px 14px 12px !important',
    },
  },
})

const inputActionsStyle = css({
  position: 'absolute',
  top: '50%',
  right: '8px',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
})

const reactBarStyle = css({
  display: 'flex',
  gap: '4px',
})
