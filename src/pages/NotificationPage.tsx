import { useNotificationList } from '@/api'
import NotificationItem from '@/components/notification/NotificationItem'
import useHeader from '@/hooks/useHeader'

export default function NotificationPage() {
  useHeader({
    routeName: '알림함',
    rightItem: {
      icon: null,
    },
  })

  const { data } = useNotificationList({})

  return (
    <>
      {data?.notifications.map(notification => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </>
  )
}
