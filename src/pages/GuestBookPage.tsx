import useHeader from '@/hooks/useHeader'
import { Bell, UsersGroupRounded } from '@solar-icons/react'

export default function GuestBookPage() {
  useHeader({
    routeName: '방명록',
    leftItem: {
      icon: UsersGroupRounded,
      onClick: () => console.log('Group clicked'),
    },
    rightItem: {
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
    },
  })

  return <div>guest book page</div>
}
