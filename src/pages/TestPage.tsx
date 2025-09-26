import Button from '@/components/common/Button'
import NewBadgeModal from '@/components/modal/NewBadgeModal'
import { useModal } from '@/hooks/useModal'

export default function TestPage() {
  const { openModal } = useModal()

  const handleEvent = async (
    id: number,
    type: 'HIDDEN' | 'OPEN' | 'RESTRICTED',
  ) => {
    openModal(<NewBadgeModal id={id} type={type} />)
  }
  return (
    <>
      <div>
        <Button label='업적 달성!' onClick={() => handleEvent(1, 'HIDDEN')} />
        <Button label='업적 달성!' onClick={() => handleEvent(2, 'OPEN')} />
      </div>
    </>
  )
}
