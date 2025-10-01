import { useCallback, useMemo } from 'react'
import { Bell } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import { useUnreadNotifications } from '@/api'
import BellUnread from '@/assets/images/icons/BellUnread.svg?react'
import { ROUTES } from '@/routes/ROUTES'
import type { IHeaderItem } from '@/types'

export default function useNotificationHeaderItem() {
  const navigate = useNavigate()

  const { data } = useUnreadNotifications()

  const goNotifications = useCallback(
    () => navigate(ROUTES.NOTIFICATION_LIST),
    [navigate],
  )

  const defaultRight = useMemo<IHeaderItem>(
    () => ({
      icon: data?.hasUnread ? BellUnread : Bell,
      onClick: goNotifications,
    }),
    [goNotifications, data?.hasUnread],
  )

  return defaultRight
}
