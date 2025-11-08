import { useState } from 'react'
import { css } from '@emotion/react'

import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import BottomModal from '../BottomModal'

interface Props {
  children: React.ReactNode
  affirm?: {
    text: string
    answer: string
  }
}
export default function Confirm({ children, affirm }: Props) {
  const { closeModal } = useModal()
  const [affirmInput, setAffirmInput] = useState('')
  const isAffirmed = affirm ? affirmInput === affirm.answer : true
  return (
    <BottomModal>
      <div css={[flexGap(20), containerStyle]}>
        {children}
        {affirm && (
          <InputField
            label={affirm.text}
            placeholder={affirm.answer}
            value={affirmInput}
            onChange={e => setAffirmInput(e.target.value)}
            customCss={{ width: '100%' }}
          />
        )}
        <div css={[flexGap(8, 'row'), { width: '100%' }]}>
          <Button
            size='md'
            label='확인'
            onClick={() => closeModal(true)}
            customCss={{ borderRadius: 16 }}
            type={isAffirmed ? 'primary' : 'disabled'}
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
