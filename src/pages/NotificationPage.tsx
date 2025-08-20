import NotificationItem from '@/components/notification/NotificationItem'
import useHeader from '@/hooks/useHeader'
import { NOTIFICATIONS } from '@/mocks/data/notifications'

export default function NotificationPage() {
  useHeader({
    routeName: '알림함',
    rightItem: {
      icon: null,
    },
  })

  const notifications = NOTIFICATIONS

  return (
    <>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </>
  )
}
