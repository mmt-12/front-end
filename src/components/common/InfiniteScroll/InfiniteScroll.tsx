import { useEffect, useRef } from 'react'
import type { Interpolation, Theme } from '@emotion/react'

interface Props {
  children: React.ReactNode
  fetchNext: () => void | Promise<unknown>
  customCSS?: Interpolation<Theme>
  hasNextPage?: boolean
  isFetchingNext?: boolean
  rootMargin?: string
  loader?: React.ReactNode
  disabled?: boolean
}

export default function InfiniteScroll({
  children,
  fetchNext,
  hasNextPage,
  isFetchingNext,
  rootMargin = '200px',
  loader,
  disabled = false,
  customCSS,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinelRef.current) return

    const el = sentinelRef.current

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (!entry.isIntersecting) return
        if (disabled) return
        if (!hasNextPage) return
        if (isFetchingNext) return

        fetchNext()
      },
      { root: null, rootMargin },
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [fetchNext, hasNextPage, isFetchingNext, rootMargin, disabled])

  return (
    <div css={customCSS}>
      {children}
      <div ref={sentinelRef} />
      {isFetchingNext &&
        (loader ?? <div style={{ padding: 8 }}>Loading...</div>)}
    </div>
  )
}
