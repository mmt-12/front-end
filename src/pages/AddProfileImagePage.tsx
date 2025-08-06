import useHeader from '@/hooks/useHeader'

export default function AddProfileImagePage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  return <div>add profile image page</div>
}
