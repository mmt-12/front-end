import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { useVoiceList } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import InputField from '@/components/common/InputField'
import { useModal } from '@/hooks/useModal'
import Voice from '../Voice'
import VoiceRegisterModal from '../VoiceRegisterModal/VoiceRegisterModal'

export default function VoicePickerModal() {
  const { closeModal, openModal } = useModal()
  const [searchKey, setSearchKey] = useState('')
  const { data } = useVoiceList(1, {})
  const voices = data?.pages.flatMap(page => page.voices) || []

  const handleRegisterVoiceClick = () => {
    openModal(<VoiceRegisterModal />)
  }

  return (
    <BottomDrawer close={closeModal}>
      <p css={spanStyle}>최근 사용</p>
      <div
        css={[voiceListStyle, { marginBottom: '4px' }]}
        className='no-scrollbar'
      >
        {voices.slice(0, 6).map(voice => (
          <Voice key={voice.id} {...voice} amount={undefined} />
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
            <Voice key={voice.id} {...voice} amount={undefined} />
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
