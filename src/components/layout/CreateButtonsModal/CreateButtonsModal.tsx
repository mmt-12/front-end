import { css, useTheme } from '@emotion/react'
import {
  Box,
  SmileSquare,
  Soundwave,
  UsersGroupRounded,
} from '@solar-icons/react'
import { Link } from 'react-router-dom'

import BottomDrawer from '@/components/common/BottomDrawer'
import Button from '@/components/common/Button'
import EmojiRegisterModal from '@/components/reaction/EmojiRegisterModal'
import VoiceRegisterModal from '@/components/reaction/VoiceRegisterModal/VoiceRegisterModal'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'

export default function CreateButtonsModal({ closing }: { closing?: boolean }) {
  const theme = useTheme()
  const { closeModal, openModal } = useModal()

  return (
    <BottomDrawer closing={closing}>
      <span
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '16px',
          color: theme.stone[800],
        }}
      >
        생성하기
      </span>
      <div css={contentStyle}>
        <Link to={ROUTES.MEMORY_REGISTER}>
          <Button
            onClick={closeModal}
            type='primary'
            size='md'
            label='기억'
            icon={<Box weight='Bold' size={28} />}
          />
        </Link>
        <Button
          type='secondary'
          size='md'
          label='이모티콘'
          icon={<SmileSquare weight='Bold' size={28} />}
          onClick={() => openModal(<EmojiRegisterModal />)}
        />
        <Button
          type='disabled'
          size='md'
          label='약속'
          icon={<UsersGroupRounded weight='Bold' size={28} />}
        />
        <Button
          type='secondary'
          size='md'
          label='보이스'
          icon={<Soundwave weight='Bold' size={28} />}
          onClick={() => openModal(<VoiceRegisterModal />)}
        />
      </div>
    </BottomDrawer>
  )
}

const contentStyle = css({
  width: '100%',
  padding: '16px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
})
