import { useAchieve } from '@/api'
import Button from '@/components/common/Button'
import { useModal } from '@/hooks/useModal'

export default function TestPage() {
  const { alert } = useModal()
  const { mutate: achieve } = useAchieve()
  const handleClick = () => {
    achieve('HOME')
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
