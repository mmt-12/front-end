import { css } from '@emotion/react'
import { useLocation } from 'react-router-dom'

import { fadeIn, slideInRight } from '@/styles/animation'

interface Props {
  children: React.ReactNode
  mode?: 'fade' | 'slide'
}

export default function PageTransition({ children, mode = 'fade' }: Props) {
  const location = useLocation()
  return (
    <div
      key={location.key}
      css={[
        containerStyle,
        mode === 'fade'
          ? { animation: `${fadeIn} 180ms ease-out` }
          : {
              animation: `${slideInRight} 220ms cubic-bezier(0.22, 1, 0.36, 1)`,
            },
      ]}
    >
      {children}
    </div>
  )
}

const containerStyle = css({
  flex: 1,
})
