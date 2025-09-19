import { css, type Keyframes } from '@emotion/react'

interface Props {
  children: React.ReactNode
  keyframe: Keyframes
}

export default function PageTransition({ children, keyframe }: Props) {
  const isModal = window.history.state?.modal
  return (
    <div
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
