import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'
import BottomDrawer from '../BottomDrawer'

interface Props {
  children: React.ReactNode
}

export default function Alert({ children }: Props) {
  const { closeModal } = useModal()
  return (
    <BottomDrawer>
      {children}
      <Button label='확인' onClick={closeModal} />
    </BottomDrawer>
  )
}
