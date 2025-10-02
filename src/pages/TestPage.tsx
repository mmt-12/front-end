import Button from '@/components/common/Button'
import NotificationModal from '@/components/modal/NotificationModal'
import { useModal } from '@/hooks/useModal'
import type { NotificationType } from '@/types/notification'

const notification = {
  type: 'GUESTBOOK' as NotificationType,
  actorId: null,
  postId: null,
  memoryId: null,
  title: '새로운 방명록이 도착했어요!',
  content: '방명록을 확인해보세요.',
}

export default function TestPage() {
  const { openModal, alert } = useModal()
  const handleClick = () => {
    openModal(<NotificationModal {...notification} />, {
      dimmBackground: false,
    })
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
