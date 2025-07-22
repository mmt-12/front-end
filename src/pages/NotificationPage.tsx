import useHeader from '@/hooks/useHeader'

export default function NotificationPage() {
  useHeader({
    routeName: '알림함',
    rightItem: {
      icon: null,
    },
  })

  return <div>notification page</div>
}
