import { useState } from 'react'
import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import InputField from '@/components/common/InputField'
import { useModal } from '@/hooks/useModal'
import { emojies } from '@/mocks/data/reaction'
import Emoji from '../Emoji/Emoji'
import EmojiRegisterModal from '../EmojiRegisterModal'

export default function EmojiPickerModal() {
  const { closeModal, openModal } = useModal()
  const [searchKey, setSearchKey] = useState('')

  const handleRegisterEmojiClick = () => {
    openModal(<EmojiRegisterModal />)
  }

  return (
    <BottomDrawer close={closeModal}>
      <p css={spanStyle}>최근 사용</p>
      <div css={[emojiListStyle, { marginBottom: '4px' }]}>
        {emojies.slice(0, 6).map(emoji => (
          <Emoji key={emoji.id} {...emoji} amount={undefined} />
        ))}
      </div>
      <InputField
        label='검색'
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      <div css={[emojiListStyle, { flexWrap: 'wrap', marginTop: '6px' }]}>
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
  gap: '16px',

  overflow: 'visible',
})
