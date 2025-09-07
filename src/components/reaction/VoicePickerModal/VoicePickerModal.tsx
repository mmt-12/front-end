import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { useVoiceList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import InputField from '@/components/common/InputField'
import { useModal } from '@/hooks/useModal'
import { useReactionPicker } from '@/hooks/useReactionPicker'
import { useUserStore } from '@/store/userStore'
import { slideDown } from '@/styles/animation'
import Voice from '../Voice'
import VoiceRegisterModal from '../VoiceRegisterModal/VoiceRegisterModal'

export default function VoicePickerModal() {
  const { openModal, closeModal } = useModal()
  const [searchKey, setSearchKey] = useState('')
  const { communityId } = useUserStore()
  const { data } = useVoiceList(communityId, {})
  const voices = data?.pages.flatMap(page => page.voices) || []

  const { selectReaction } = useReactionPicker('VOICE')

  const handleSelectVoice = (voiceId: number) => {
    selectReaction(voiceId)
    closeModal()
  }

  const handleRegisterVoiceClick = () => {
    openModal(<VoiceRegisterModal />, slideDown)
  }

  return (
    <BottomDrawer>
      <p css={spanStyle}>최근 사용</p>
      <div
        css={[voiceListStyle, { marginBottom: '4px' }]}
        className='no-scrollbar'
      >
        {voices.slice(0, 6).map(voice => (
          <Voice
            key={voice.id}
            {...voice}
            amount={undefined}
            onClick={(_e, id) => handleSelectVoice(id)}
          />
        ))}
      </div>
      <InputField
        label='검색'
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      <div css={[voiceListStyle, { flexWrap: 'wrap', marginTop: '6px' }]}>
        {voices
          .filter(voice => voice.name.includes(searchKey))
          .map(voice => (
            <Voice
              key={voice.id}
              {...voice}
              amount={undefined}
              onClick={(_e, id) => handleSelectVoice(id)}
            />
          ))}
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
    color: theme.stone[600],
  })

const voiceListStyle = css({
  padding: '4px 16px',

  display: 'flex',
  gap: '8px',
  overflowX: 'auto',
})
