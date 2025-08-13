import {
  Box,
  SmileSquare,
  Soundwave,
  UsersGroupRounded,
} from '@solar-icons/react'
import BottomDrawer from '../BottomDrawer'
import Button from '../Button'
import { css, useTheme } from '@emotion/react'
import { useCelebration } from '@/hooks/useCelebration'

interface Props {
  isDrawerOpen: boolean
  setIsDrawerOpen: (_isOpen: boolean) => void
}

export default function CreateButtonsModal({
  isDrawerOpen,
  setIsDrawerOpen,
}: Props) {
  const theme = useTheme()
  const { triggerCelebration } = useCelebration()
  return (
    <BottomDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)}>
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
        <Button
          type='primary'
          size='md'
          label='기억'
          icon={<Box weight='Bold' size={28} />}
          onClick={async () => {
            await triggerCelebration({
              title: '업적 달성!',
              message: '축하드립니다. 첫 기억 생성 업적을 달성했어요!',
            })
            console.log('팝업 닫힘')
          }}
        />
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
