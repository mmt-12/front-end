import { useRef } from 'react'
import { css, type Theme } from '@emotion/react'

import { useModal } from '@/hooks/useModal'
import { slideUp } from '@/styles/animation'

interface Props {
  children: React.ReactNode
}

export default function BottomModal({ children }: Props) {
  const { closeModal } = useModal()

  const modalRef = useRef<HTMLDivElement>(null)
  const dx = useRef(0)
  const dy = useRef(0)
  const isDragging = useRef(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    dx.current = e.touches[0].clientX
    dy.current = e.touches[0].clientY
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!modalRef.current) return
    const deltaX = (e.touches[0].clientX - dx.current) * 0.25
    const deltaY = (e.touches[0].clientY - dy.current) * 0.25

    modalRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    modalRef.current.style.transition = 'transform 0s'
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!modalRef.current) return
    isDragging.current = false
    modalRef.current.style.transform = `translate(0, 0)`
    modalRef.current.style.transition = 'transform 0.3s ease'
    if (e.changedTouches[0].clientY - dy.current > 100) {
      closeModal()
    }
  }

  return (
    <div
      key={children?.toString()}
      css={[containerBaseStyle, animationStyle]}
      onClick={e => e.stopPropagation()}
      ref={modalRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div css={barStyle} />
      {children}
    </div>
  )
}

const containerBaseStyle = (theme: Theme) =>
  css({
    width: 'calc(100% - 32px)',
    height: 'fit-content',
    maxWidth: `calc(${theme.maxWidth} - 64px)`,
    padding: '0px 18px 16px 18px',
    margin: '24px 16px',

    backgroundColor: theme.colors.white,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',

    borderRadius: '24px',

    overflowY: 'scroll',
  })

const barStyle = (theme: Theme) =>
  css({
    margin: '16px auto 20px auto',
    width: '36px',
    height: '4px',
    backgroundColor: theme.colors.stone[300],
    borderRadius: '2px',
  })

const animationStyle = css({
  animation: `${slideUp} 220ms cubic-bezier(0.22, 1, 0.36, 1)`,
  willChange: 'transform, opacity',
})
