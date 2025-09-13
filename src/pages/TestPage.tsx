import Button from '@/components/common/Button'
import Alert from '@/components/modal/Alert/Alert'
import Confirm from '@/components/modal/Confirm'
import { useModal } from '@/hooks/useModal'
import { slideDown } from '@/styles/animation'

export default function TestPage() {
  const { openModal } = useModal()

  const handleAlert = async () => {
    await openModal(<Alert>닫아주세요.</Alert>, slideDown)
    console.log('Modal closed')
  }

  const handleConfirm = async () => {
    const confirmed = await openModal(
      <Confirm>확인해주세요.</Confirm>,
      slideDown,
    )
    console.log('Modal closed with', confirmed)
  }
  return (
    <>
      HI
      <div>
        <Button label='open alert' onClick={handleAlert} />
        <Button label='open confirm' onClick={handleConfirm} />
      </div>
    </>
  )
}
