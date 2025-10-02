import Button from '@/components/common/Button'
import NewBadgeModal from '@/components/modal/NewBadgeModal'
import { useModal } from '@/hooks/useModal'

export default function TestPage() {
  const { openOverlay, alert } = useModal()
  const handleClick = () => {
    openOverlay(<NewBadgeModal id={1} type='OPEN' />)
  }

  return (
    <>
      <div>
        <Button label='업적 달성!' onClick={handleClick} />
        <Button label='alert!' onClick={() => alert('!!!')} />
      </div>
    </>
  )
}
