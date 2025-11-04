import { css, type Theme } from '@emotion/react'
import {
  Box,
  SmileSquare,
  Soundwave,
  UsersGroupRounded,
} from '@solar-icons/react'
import { Link } from 'react-router-dom'

import Button from '@/components/common/Button'
import BottomDrawer from '@/components/modal/BottomDrawer'
import EmojiRegisterModal from '@/components/reaction/EmojiRegisterModal'
import VoiceRegisterModal from '@/components/reaction/VoiceRegisterModal/VoiceRegisterModal'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { withSafeAreaBottom } from '@/styles/common'

export default function CreateButtonsModal() {
  const { openModal } = useModal()

  return (
    <BottomDrawer>
      <p css={titleStyle}>생성하기</p>
      <div css={contentStyle}>
        <Link to={ROUTES.MEMORY_REGISTER}>
          <Button
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
  padding: `0px 18px ${withSafeAreaBottom(24)} 18px`,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
})

const titleStyle = (theme: Theme) =>
  css({
    marginBottom: '14px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    color: theme.colors.stone[800],
  })
