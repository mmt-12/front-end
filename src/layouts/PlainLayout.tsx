import { useTheme } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import PageTransition from '@/components/common/PageTransition'
import { useThemeColor } from '@/hooks/useThemeColor'
import { fadeIn } from '@/styles/animation'

export default function PlainLayout() {
  const theme = useTheme()
  useThemeColor(theme.colors.bg)

  return (
    <PageTransition keyframe={fadeIn}>
      <Outlet />
    </PageTransition>
  )
}
