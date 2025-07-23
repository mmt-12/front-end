import { ROUTES } from '@/routes/ROUTES'
import { useHeaderStore } from '@/store/headerStore'
import type { IHeaderItem } from '@/types/IHeaderItem'
import { ArrowLeft, Bell } from '@solar-icons/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  routeName: string
  leftItem?: IHeaderItem
  rightItem?: IHeaderItem
}

export default function useHeader(props: Props) {
  const navigate = useNavigate()

  const DEFAULT_LEFT_ITEM = {
    icon: ArrowLeft,
    onClick: () => navigate(-1),
  }

  const DEFAULT_RIGHT_ITEM = {
    icon: Bell,
    onClick: () => navigate(ROUTES.NOTIFICATION),
  }

  const headerState = useHeaderStore(state => state)

  useEffect(() => {
    headerState.setRouteName(props.routeName)
    headerState.setLeftItem(props.leftItem || DEFAULT_LEFT_ITEM)
    headerState.setRightItem(props.rightItem || DEFAULT_RIGHT_ITEM)
  }, [])

  return {
    headerState,
  }
}
