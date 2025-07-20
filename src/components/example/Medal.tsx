import { UsersGroupTwoRounded } from '@solar-icons/react'

export interface IMedalProps {
  name: string
}

export default function Medal(props: IMedalProps) {
  switch (props.name) {
    case '프로참석러':
      return <UsersGroupTwoRounded size={24} color='#f0f' weight='Bold' />
    default:
      return null
  }
}
