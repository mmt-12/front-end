import {
  Box,
  SmileSquare,
  Soundwave,
  UsersGroupRounded,
} from '@solar-icons/react'
import BottomDrawer from '../../common/BottomDrawer'
import Button from '../../common/Button'
import { css, useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/ROUTES'
import { useModal } from '@/hooks/useModal'

interface Props {
  id: string
}

export default function CreateButtonsModal({ id }: Props) {
  const theme = useTheme()
  const { closeModal } = useModal()
  return (
    <BottomDrawer close={() => closeModal(id)}>
      <span
        style={{
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
            onClick={() => closeModal(id)}
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
        />
      </div>
    </BottomDrawer>
  )
}

const contentStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  width: '100%',
})
