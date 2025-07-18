import { UsersGroupTwoRounded } from '@solar-icons/react'

export const ACHIEVEMENTS: { [name: string]: IBadge } = {
  프로참석러: {
    name: '프로참석러',
    color: '#f0f',
    backgroundColor: '#323',
    border: '#f00',
    icon: <UsersGroupTwoRounded size={24} color='#f0f' weight='Bold' />,
  },
}

interface IBadge {
  name: string
  color: string
  backgroundColor: string
  border: string
  icon: any
}
