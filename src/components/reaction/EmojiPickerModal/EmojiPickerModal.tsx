import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { useEmojiList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import InputField from '@/components/common/InputField'
import { Skeleton } from '@/components/common/Skeleton'
import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'
import { useReactionPicker } from '@/hooks/useReactionPicker'
import {
  createRecentReactionContextKey,
  useRecentReactionStore,
} from '@/store/recentReactionStore'
import { useUserStore } from '@/store/userStore'
import { slideDown } from '@/styles/animation'
import type { Emoji as EmojiType } from '@/types/api'
import Emoji from '../Emoji/Emoji'
import EmojiRegisterModal from '../EmojiRegisterModal'

export default function EmojiPickerModal() {
  const { openModal, closeModal } = useModal()
  const [searchKey, setSearchKey] = useState('')
  const { communityId, memberId } = useUserStore()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEmojiList(communityId, {
      keyword: searchKey,
    })
  const emojis: EmojiType[] = data?.pages.flatMap(page => page.emojis) || []

  const { selectReaction } = useReactionPicker()
  const contextKey = createRecentReactionContextKey({ memberId, communityId })
  const recentEmojis =
    useRecentReactionStore(
      state => state.recentsByContext[contextKey]?.emojis,
    ) || []
  const addRecentEmoji = useRecentReactionStore(state => state.addRecentEmoji)

  const handleSelectEmoji = (emoji: EmojiType) => {
    addRecentEmoji(emoji, { memberId, communityId })
    selectReaction('EMOJI', emoji.id)
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
          : recentEmojis.map(emoji => (
              <Emoji
                key={`recent-${emoji.id}`}
                {...emoji}
                onClick={() => handleSelectEmoji(emoji)}
              />
            ))}
      </div>
      {!isLoading && recentEmojis.length === 0 && (
        <p css={emptyRecentStyle}>최근 사용한 이모지가 없어요</p>
      )}
      <InputField
        label='검색'
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      <div
        css={{
          maxHeight: '240px',
          overflow: 'auto',
          marginBottom: '6px',
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
                  onClick={() => handleSelectEmoji(emoji)}
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
    color: theme.colors.stone[600],
  })

const emptyRecentStyle = (theme: Theme) =>
  css({
    width: '100%',
    padding: '12px 0',
    textAlign: 'center',
    fontSize: '14px',
    color: theme.colors.stone[400],
  })

const emojiListStyle = css({
  padding: '0px 16px',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
  gap: '8px 18px',
})
