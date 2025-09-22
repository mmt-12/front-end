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
import { useUserStore } from '@/store/userStore'
import { slideDown } from '@/styles/animation'
import Voice from '../Voice'
import VoiceRegisterModal from '../VoiceRegisterModal/VoiceRegisterModal'

export default function VoicePickerModal({
  comments,
}: {
  comments: Comment[]
}) {
  const { openModal, closeModal } = useModal()
  const [searchKey, setSearchKey] = useState('')
  const { communityId } = useUserStore()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useVoiceList(communityId, { keyword: searchKey })
  const voices = data?.pages.flatMap(page => page.voices) || []

  const { selectReaction } = useReactionPicker()

  const handleSelectVoice = (voiceId: number) => {
    selectReaction('VOICE', voiceId)
    closeModal()
  }

  const handleRegisterVoiceClick = () => {
    openModal(<VoiceRegisterModal />, slideDown)
  }

  return (
    <BottomDrawer>
      <p css={spanStyle}>최근 사용</p>
      <div
        css={[voiceListStyle, { flexWrap: 'nowrap', marginBottom: '4px' }]}
        className='no-scrollbar'
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width={120} height={36} radius={24} />
            ))
          : voices
              .slice(0, 6)
              .map(voice => (
                <Voice
                  key={voice.id}
                  {...voice}
                  onClick={(_e, id) => handleSelectVoice(id)}
                  involved={
                    comments.find(comment => comment.id === voice.id)?.involved
                  }
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
          customCSS={voiceListStyle}
        >
          {isLoading
            ? Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} width={150} height={34} radius={24} />
              ))
            : voices.map(voice => (
                <Voice
                  key={voice.id}
                  {...voice}
                  onClick={(_e, id) => handleSelectVoice(id)}
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

const voiceListStyle = css({
  padding: '4px 16px',
  marginTop: '6px',

  flexWrap: 'wrap',
  display: 'flex',
  gap: '8px 10px',

  overflow: 'scroll',
})
