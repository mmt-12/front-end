import useHeader from '@/hooks/useHeader'

export default function NotificationPage() {
  useHeader({
    routeName: '알림함',
    rightItem: {
      icon: null,
    },
  })

  throw new Error('(test) 알림함 페이지는 아직 개발 중입니다.')

  return <div>notification pages</div>
}
