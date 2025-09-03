import { useNotificationList } from '@/api'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import NotificationItem from '@/components/notification/NotificationItem'
import useHeader from '@/hooks/useHeader'

export default function NotificationPage() {
  useHeader({
    routeName: '알림함',
    rightItem: {
      icon: null,
    },
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotificationList({})
  const notifications =
    data?.pages.flatMap(page => page.notifications) || []

  return (
    <>
      <InfiniteScroll
        fetchNext={() => fetchNextPage()}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNextPage}
      >
        {notifications.map(notification => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </InfiniteScroll>
    </>
  )
}
