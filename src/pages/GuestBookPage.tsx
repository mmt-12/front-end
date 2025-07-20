import { useHeaderStore } from '@/store/headerStore'
import { Bell, UsersGroupRounded } from '@solar-icons/react'
import { useEffect } from 'react'

export default function GuestBookPage() {
  const headerState = useHeaderStore(state => state)

  useEffect(() => {
    headerState.setRouteName('방명록')
    headerState.setRightItem({
      icon: <Bell weight='Bold' size={32} />,
      onClick: () => console.log('Bell clicked'),
    })
    headerState.setLeftItem({
      icon: <UsersGroupRounded weight='Bold' size={32} />,
      onClick: () => console.log('Group clicked'),
    })
  }, [])
  return <div>guest book page</div>
}
