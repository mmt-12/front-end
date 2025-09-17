import { css, type Keyframes } from '@emotion/react'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  keyframe: Keyframes
}

export default function PageTransition({ children, keyframe }: Props) {
  const location = useLocation()
  const isModal = window.history.state?.modal
  console.log(isModal)
  return (
    <div
      key={location.key}
      css={[
        containerStyle,
        isModal ? {} : { animation: `${keyframe} 180ms ease-out` },
      ]}
    >
      {children}
    </div>
  )
}

const containerStyle = css({
  flex: 1,
})
