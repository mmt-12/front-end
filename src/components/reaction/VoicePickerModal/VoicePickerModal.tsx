import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import InputField from '@/components/common/InputField'
import Spacing from '@/components/common/Spacing'
import Text from '@/components/common/Text'
import { useModal } from '@/hooks/useModal'
import { voices } from '@/mocks/data/reaction'
import Voice from '../Voice'
import VoiceRegisterModal from '../VoiceRegisterModal/VoiceRegisterModal'

interface Props {
  id: string
}

export default function VoicePickerModal({ id }: Props) {
  const { closeModal, openModal } = useModal()
  const [searchKey, setSearchKey] = useState('')

  const handleRegisterVoiceClick = () => {
    openModal('voice-register', <VoiceRegisterModal id='voice-add' />)
  }

  return (
    <BottomDrawer close={() => closeModal(id)}>
      <Text customCss={spanStyle} withPadding>
        최근 사용
      </Text>
      <div css={voiceListStyle} className='no-scrollbar'>
        {voices.slice(0, 6).map(voice => (
          <Voice key={voice.id} {...voice} amount={undefined} />
        ))}
      </div>
      <Spacing height={4} />
      <InputField label='검색' onChange={(v: string) => setSearchKey(v)} />
      <Spacing height={6} />
      <div css={[voiceListStyle, { flexWrap: 'wrap' }]}>
        {voices.map(voice => (
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
