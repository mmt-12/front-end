import { useCallback, useEffect, useMemo } from 'react'
import { ArrowLeft, Bell } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/routes/ROUTES'
import { useHeaderStore } from '@/store/headerStore'
import type { IHeaderItem } from '@/types'

interface Props {
  routeName?: string
  leftItem?: IHeaderItem
  rightItem?: IHeaderItem
}

export default function useHeader({ routeName, leftItem, rightItem }: Props) {
  const navigate = useNavigate()

  // setHeader만 가져옴으로써 리렌더링 방지
  const setHeader = useHeaderStore(s => s.setHeader)

  const goBack = useCallback(() => navigate(-1), [navigate])
  const goNotifications = useCallback(
    () => navigate(ROUTES.NOTIFICATION_LIST),
    [navigate],
  )

  const defaultLeft = useMemo<IHeaderItem>(
    () => ({ icon: ArrowLeft, onClick: goBack }),
    [goBack],
  )
  const defaultRight = useMemo<IHeaderItem>(
    () => ({ icon: Bell, onClick: goNotifications }),
    [goNotifications],
  )

  useEffect(() => {
    setHeader({
      routeName: routeName ?? '',
      leftItem: leftItem ?? defaultLeft,
      rightItem: rightItem ?? defaultRight,
    })
  }, [routeName, leftItem, rightItem, defaultLeft, defaultRight, setHeader])
}
