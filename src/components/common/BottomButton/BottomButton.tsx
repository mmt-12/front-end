import { fixedWithMargin } from '@/styles/fixed'
import type { ButtonProps } from '@/types'
import Button from '../Button'

export default function BottomButton(props: ButtonProps) {
  return (
    <div css={{ position: 'relative', height: '80px' }}>
      <div css={[fixedWithMargin(16), { bottom: '20px' }]}>
        <Button {...props} size='full' icon={null} />
      </div>
    </div>
  )
}
