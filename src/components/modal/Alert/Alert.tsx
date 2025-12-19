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
        <span css={textStyle}>{children}</span>
        <Button label='확인' onClick={closeModal} />
      </div>
    </BottomModal>
  )
}

const containerStyle = css({
  padding: '6px',
  alignItems: 'center',
})

const textStyle = css({
  textAlign: 'center',
  lineHeight: 1.8,
  textWrap: 'pretty',
})
