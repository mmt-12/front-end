import { fixedWithMargin, withSafeAreaBottom } from '@/styles/common'
import type { ButtonProps } from '@/types'
import Button from '../Button'

export default function BottomButton(props: ButtonProps) {
  return (
    <div css={{ position: 'relative', height: withSafeAreaBottom(80) }}>
      <div css={[fixedWithMargin(16), { bottom: withSafeAreaBottom(20) }]}>
        <Button {...props} size='full' icon={null} />
      </div>
    </div>
  )
}
