import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { useVoiceList, type Comment } from '@/api'
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
import type { Reaction } from '@/types/api'
import Voice from '../Voice'
import VoiceRegisterModal from '../VoiceRegisterModal/VoiceRegisterModal'

export default function VoicePickerModal({
  comments,
}: {
  comments: Comment[]
}) {
  const { openModal, closeModal } = useModal()
  const [searchKey, setSearchKey] = useState('')
  const { communityId, memberId } = useUserStore()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useVoiceList(communityId, { keyword: searchKey })
  const voices: Reaction[] = data?.pages.flatMap(page => page.voices) || []

  const { selectReaction } = useReactionPicker()
  const contextKey = createRecentReactionContextKey({ memberId, communityId })
  const recentVoices =
    useRecentReactionStore(
      state => state.recentsByContext[contextKey]?.voices,
    ) || []
  const addRecentVoice = useRecentReactionStore(state => state.addRecentVoice)

  const handleSelectVoice = (voice: Reaction) => {
    addRecentVoice(voice, { memberId, communityId })
    selectReaction('VOICE', voice.id)
    closeModal()
  }

  const handleRegisterVoiceClick = () => {
    openModal(<VoiceRegisterModal />)
  }

  return (
    <BottomDrawer>
      <p css={spanStyle}>최근 사용</p>
      <div
        css={[voiceListStyle, { flexWrap: 'nowrap', marginBottom: '4px' }]}
        className='no-scrollbar'
      >
        {recentVoices.length ? (
          recentVoices.map(voice => (
            <Voice
              key={`recent-${voice.id}`}
              {...voice}
              onClick={() => handleSelectVoice(voice)}
              involved={
                comments.find(comment => comment.id === voice.id)?.involved
              }
            />
          ))
        ) : isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width={120} height={36} radius={24} />
          ))
        ) : (
          <p css={emptyRecentStyle}>최근 사용한 보이스가 없어요</p>
        )}
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
          customCSS={voiceListStyle}
        >
          {isLoading
            ? Array.from({ length: 7 }).map((_, i) => (
                <Skeleton
                  key={i}
                  width={150}
                  height={34}
                  radius={24}
                  css={{ flexGrow: 1 }}
                />
              ))
            : voices.map(voice => (
                <Voice
                  key={voice.id}
                  {...voice}
                  onClick={() => handleSelectVoice(voice)}
                />
              ))}
        </InfiniteScroll>
      </div>
      <BottomButton
        type='secondary'
        label='보이스 만들기'
        onClick={handleRegisterVoiceClick}
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
    padding: '8px 0',
    textAlign: 'center',
    fontSize: '14px',
    color: theme.colors.stone[400],
    flexShrink: 0,
  })

const voiceListStyle = css({
  padding: '4px 16px',
  marginTop: '6px',

  flexWrap: 'wrap',
  display: 'flex',
  gap: '8px 10px',

  overflow: 'scroll',
})
