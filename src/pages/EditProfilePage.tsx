import useHeader from '@/hooks/useHeader'

export default function EditProfilePage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  return <div>edit profile page</div>
}
