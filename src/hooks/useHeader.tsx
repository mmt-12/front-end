import type { IHeaderItem } from '@/types'
import { ROUTES } from '@/routes/ROUTES'
import { useHeaderStore } from '@/store/headerStore'
import { ArrowLeft, Bell } from '@solar-icons/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  routeName: string
  leftItem?: IHeaderItem
  rightItem?: IHeaderItem
}

const DEFAULT_LEFT_ITEM: IHeaderItem = {
  icon: ArrowLeft,
  onClick: () => {},
}

const DEFAULT_RIGHT_ITEM: IHeaderItem = {
  icon: Bell,
  onClick: () => {},
}

export default function useHeader({ routeName, leftItem, rightItem }: Props) {
  const navigate = useNavigate()

  const { setRouteName, setLeftItem, setRightItem } = useHeaderStore(
    state => state,
  )

  useEffect(() => {
    DEFAULT_LEFT_ITEM.onClick = () => {
      navigate(-1)
    }
    DEFAULT_RIGHT_ITEM.onClick = () => {
      navigate(ROUTES.NOTIFICATION)
    }
  }, [navigate])

  useEffect(() => {
    setRouteName(routeName)
    setLeftItem(leftItem || DEFAULT_LEFT_ITEM)
    setRightItem(rightItem || DEFAULT_RIGHT_ITEM)
  }, [routeName, setRouteName, setLeftItem, setRightItem, leftItem, rightItem])
}
