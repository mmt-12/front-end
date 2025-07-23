import useHeader from '@/hooks/useHeader'
import { UsersGroupRounded } from '@solar-icons/react'

export default function GuestBookPage() {
  useHeader({
    routeName: '방명록',
    leftItem: {
      icon: UsersGroupRounded,
      onClick: () => console.log('Group clicked'),
    },
  })

  return <div>guest book page</div>
}
