import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import InputField from '@/components/common/InputField'
import Spacing from '@/components/common/Spacing'
import Text from '@/components/common/Text'
import { useModal } from '@/hooks/useModal'
import { emojies } from '@/mocks/data/reaction'
import Emoji from '../Emoji/Emoji'
import EmojiRegisterModal from '../EmojiRegisterModal'

interface Props {
  id: string
}

export default function EmojiPickerModal({ id }: Props) {
  const { closeModal, openModal } = useModal()
  const [searchKey, setSearchKey] = useState('')

  const handleRegisterEmojiClick = () => {
    openModal('emoji-register', <EmojiRegisterModal id='emoji-add' />)
  }

  return (
    <BottomDrawer close={() => closeModal(id)}>
      <Text customCss={spanStyle} withPadding>
        최근 사용
      </Text>
      <div css={emojiListStyle}>
        {emojies.slice(0, 6).map(emoji => (
          <Emoji key={emoji.id} {...emoji} amount={undefined} />
        ))}
      </div>
      <Spacing height={4} />
      <InputField label='검색' onChange={(v: string) => setSearchKey(v)} />
      <Spacing height={6} />
      <div css={[emojiListStyle, { flexWrap: 'wrap' }]}>
        {emojies
          .filter(emoji => emoji.name.includes(searchKey))
          .map(emoji => (
            <Emoji key={emoji.id} {...emoji} amount={undefined} />
          ))}
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
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    color: theme.stone[600],
  })

const emojiListStyle = css({
  padding: '0px 16px',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
  gap: '16px',

  overflow: 'visible',
})
