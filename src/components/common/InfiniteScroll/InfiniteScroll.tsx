import { useEffect, useRef } from 'react'

import Loader from '../Loader/Loader'

interface Props {
  children: React.ReactNode
  fetchNext: () => void | Promise<unknown>
  hasNextPage?: boolean
  isFetchingNext?: boolean
  rootMargin?: string
  threshold?: number
  className?: string
  loader?: React.ReactNode
  disabled?: boolean
}

export default function InfiniteScroll({
  children,
  fetchNext,
  hasNextPage,
  isFetchingNext,
  rootMargin = '200px',
  threshold = 0,
  className,
  loader,
  disabled = false,
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
      { root: null, rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [fetchNext, hasNextPage, isFetchingNext, rootMargin, threshold, disabled])

  return (
    <div className={className}>
      {children}
      {isFetchingNext && (loader ?? <Loader />)}
      <div ref={sentinelRef} />
    </div>
  )
}
