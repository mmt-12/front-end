import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'

export default function TestPage() {
  const { confirm, alert } = useModal()

  const handleAlert = async () => {
    await alert('닫아주세요.')
    console.log('Modal closed')
  }

  const handleConfirm = async () => {
    const confirmed = await confirm('확인해주세요.')
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
