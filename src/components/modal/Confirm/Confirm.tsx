import { css } from '@emotion/react'

import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import BottomModal from '../BottomModal'

interface Props {
  children: React.ReactNode
}

export default function Confirm({ children }: Props) {
  const { closeModal } = useModal()
  return (
    <BottomModal>
      <div css={[flexGap(24), containerStyle]}>
        {children}
        <div css={[flexGap(8, 'row'), { width: '100%' }]}>
          <Button
            size='md'
            label='확인'
            onClick={() => closeModal(true)}
            customCss={{ borderRadius: 16 }}
          />
          <Button
            size='md'
            label='취소'
            onClick={() => closeModal(false)}
            type='secondary'
            customCss={{ borderRadius: 16 }}
          />
        </div>
      </div>
    </BottomModal>
  )
}

const containerStyle = css({
  padding: '6px',
  alignItems: 'center',
})
