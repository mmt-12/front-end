import { css, type Theme } from '@emotion/react'
import { useRef, useState, useEffect, Children } from 'react'

export interface Props {
  children: React.ReactNode
}

export default function Album({ children }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const albumContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const container = albumContainerRef.current
      if (!container) return

      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const newIndex = Math.round(scrollLeft / containerWidth)
      setCurrentIndex(newIndex)
    }

    const container = albumContainerRef.current
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div css={contianerStyle}>
      <div
        ref={albumContainerRef}
        css={albumContainerStyle}
        className='no-scrollbar'
      >
        {children}
      </div>
      <div css={dotContainerStyle}>
        {Children.map(children, (_, index) => {
          return (
            <div
              key={index}
              css={dotStyle}
              className={currentIndex === index ? 'active' : ''}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

const contianerStyle = (theme: Theme) =>
  css({
    width: '100%',
    maxWidth: theme.maxWidth,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })

const albumContainerStyle = (theme: Theme) =>
  css({
    width: '100%',
    maxWidth: theme.maxWidth,

    display: 'flex',
    gap: '4px',

    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
    div: {
      width: '100vw',
      maxWidth: theme.maxWidth,
      maxHeight: `min(calc(${theme.maxWidth} - 200px), 100vw)`,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,

      overflow: 'hidden',
      scrollSnapAlign: 'center',
      backgroundColor: theme.stone[150],
    },
    'div.action-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.bg,
    },
    img: {
      width: '100%',
      objectFit: 'cover',
    },
  })

const dotContainerStyle = css({
  padding: '12px 0px',
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
})

const dotStyle = (theme: Theme) =>
  css({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: theme.stone[300],
    transition: 'background-color 0.3s ease',

    '&.active': {
      backgroundColor: theme.stone[900],
    },
  })
