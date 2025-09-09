import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { useEmojiList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import InputField from '@/components/common/InputField'
import { Skeleton } from '@/components/common/Skeleton'
import { useModal } from '@/hooks/useModal'
import { useReactionPicker } from '@/hooks/useReactionPicker'
import { useUserStore } from '@/store/userStore'
import { slideDown } from '@/styles/animation'
import Emoji from '../Emoji/Emoji'
import EmojiRegisterModal from '../EmojiRegisterModal'

export default function EmojiPickerModal() {
  const { openModal, closeModal } = useModal()
  const [searchKey, setSearchKey] = useState('')
  const { communityId } = useUserStore()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEmojiList(communityId, {
      keyword: searchKey,
    })
  const emojis = data?.pages.flatMap(page => page.emoji) || []

  const { selectReaction } = useReactionPicker('EMOJI')

  const handleSelectEmoji = (emojiId: number) => {
    selectReaction(emojiId)
    closeModal()
  }

  const handleRegisterEmojiClick = () => {
    openModal(<EmojiRegisterModal />, slideDown)
  }

  return (
    <BottomDrawer>
      <p css={spanStyle}>최근 사용</p>
      <div css={[emojiListStyle, { marginBottom: '4px' }]}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} width={48} height={48} radius={12} />
            ))
          : emojis
              .slice(0, 6)
              .map(emoji => (
                <Emoji
                  key={emoji.id}
                  {...emoji}
                  amount={undefined}
                  onClick={(_e, id) => handleSelectEmoji(id)}
                />
              ))}
      </div>
      <InputField
        label='검색'
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      <div
        css={{
          maxHeight: '240px',
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          fetchNext={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNext={isFetchingNextPage}
          customCSS={emojiListStyle}
        >
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} width={52} height={52} radius={12} />
              ))
            : emojis.map(emoji => (
                <Emoji
                  key={emoji.id}
                  {...emoji}
                  amount={undefined}
                  onClick={(_e, id) => handleSelectEmoji(id)}
                />
              ))}
        </InfiniteScroll>
      </div>
      <BottomButton
        type='secondary'
        label='이모티콘 만들기'
        onClick={handleRegisterEmojiClick}
      />
    </BottomDrawer>
  )
}

const spanStyle = (theme: Theme) =>
  css({
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    color: theme.stone[600],
  })

const emojiListStyle = css({
  padding: '0px 16px',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
  gap: '16px 18px',
})
