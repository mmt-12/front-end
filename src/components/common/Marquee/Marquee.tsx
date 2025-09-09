import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { css, keyframes } from '@emotion/react'

interface Props {
  children: ReactNode
  className?: string
  speed?: number // pixels per second
  gap?: number // px between duplicates
  pauseOnHover?: boolean
}

export default function Marquee({
  children,
  className,
  speed = 40,
  gap = 24,
  pauseOnHover = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // Observe size changes to enable/disable marquee dynamically
  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const measure = () => {
      setContentWidth(content.scrollWidth)
      setContainerWidth(container.clientWidth)
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(content)
    return () => ro.disconnect()
  }, [])

  const shouldScroll = contentWidth > containerWidth
  const duration = useMemo(() => {
    if (!shouldScroll || speed <= 0) return 0
    return (contentWidth + gap) / speed
  }, [shouldScroll, contentWidth, gap, speed])

  return (
    <div
      ref={containerRef}
      className={className}
      css={[containerStyle, pauseOnHover && pauseOnHoverStyle]}
    >
      {shouldScroll ? (
        <div
          css={trackStyle}
          style={{
            ['--marquee-distance' as any]: `-${contentWidth + gap}px`,
            ['--marquee-duration' as any]: `${duration}s`,
            gap: `${gap}px`,
          }}
        >
          <div ref={contentRef} css={itemStyle}>
            {children}
          </div>
          <div css={itemStyle} aria-hidden>
            {children}
          </div>
        </div>
      ) : (
        <div ref={contentRef} css={staticContentStyle}>
          {children}
        </div>
      )}
    </div>
  )
}

const containerStyle = css({
  position: 'relative',
  overflow: 'hidden',
})

const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(var(--marquee-distance)); }
`

const trackStyle = css({
  display: 'flex',
  alignItems: 'center',
  width: 'max-content',
  whiteSpace: 'nowrap',
  animation: `${slide} var(--marquee-duration) linear infinite`,
})

const pauseOnHoverStyle = css({
  '&:hover > div': {
    animationPlayState: 'paused',
  },
})

const itemStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 'max-content',
})

const staticContentStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 0,
  whiteSpace: 'nowrap',
})
