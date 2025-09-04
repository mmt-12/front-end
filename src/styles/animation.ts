import { keyframes } from '@emotion/react'

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

export const slideUp = keyframes({
  from: { transform: 'translateY(16px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
})

export const slideDown = keyframes({
  from: { transform: 'translateY(0)', opacity: 1 },
  to: { transform: 'translateY(16px)', opacity: 0 },
})

export const scaleIn = keyframes({
  from: { transform: 'scale(0.98)', opacity: 0 },
  to: { transform: 'scale(1)', opacity: 1 },
})

export const flipInY = keyframes({
  from: { transform: 'perspective(1000px) rotateY(90deg)', opacity: 0 },
  to: { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
})

export const flipOutY = keyframes({
  from: { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
  to: { transform: 'perspective(1000px) rotateY(90deg)', opacity: 0 },
})

export const slideInRight = keyframes({
  from: { transform: 'translateX(16px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})
