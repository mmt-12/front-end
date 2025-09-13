import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'
import BottomDrawer from '../BottomDrawer'

interface Props {
  children: React.ReactNode
}

export default function Confirm({ children }: Props) {
  const { closeModal } = useModal()
  return (
    <BottomDrawer>
      {children}
      <Button label='확인' onClick={() => closeModal(true)} />
      <Button label='취소' onClick={() => closeModal(false)} />
    </BottomDrawer>
  )
}
