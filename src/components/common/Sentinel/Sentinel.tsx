import { useEffect, useRef } from 'react'
import { css } from '@emotion/react'

export default function Sentinel({
  horizontal,
  onVisible,
}: {
  horizontal: boolean
  onVisible: () => void
}) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinelRef.current) return

    const el = sentinelRef.current

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (!entry.isIntersecting) return

        onVisible()
      },
      { root: null, rootMargin: '200px' },
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [onVisible])

  return <div ref={sentinelRef} css={sentinelStyle(horizontal)} />
}

const sentinelStyle = (horizontal: boolean) =>
  css({
    transform: horizontal ? 'translateX(-50vw)' : 'translateY(-50vh)',
  })
