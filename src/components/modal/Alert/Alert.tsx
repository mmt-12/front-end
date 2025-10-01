import { css } from '@emotion/react'

import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import BottomModal from '../BottomModal'

interface Props {
  children: React.ReactNode
}

export default function Alert({ children }: Props) {
  const { closeModal } = useModal()
  return (
    <BottomModal>
      <div css={[flexGap(24), containerStyle]}>
        {children}
        <Button label='확인' onClick={closeModal} />
      </div>
    </BottomModal>
  )
}

const containerStyle = css({
  padding: '6px',
  alignItems: 'center',
})
