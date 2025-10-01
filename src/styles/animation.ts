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
  from: { transform: 'translateY(160px)', opacity: 0.5 },
  to: { transform: 'translateY(0)', opacity: 1 },
})

export const slideDown = keyframes({
  from: { transform: 'translateY(0)', opacity: 1 },
  to: { transform: 'translateY(160px)', opacity: 0.5 },
})


export const slideInRight = keyframes({
  from: { transform: 'translateX(160px)', opacity: 0.5 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

export const rotation = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export const flipIn = keyframes({
  from: { transform: 'perspective(1000px) rotateY(90deg)', opacity: 0 },
  to: { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
})

export const flipOut = keyframes({
  from: { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
  to: { transform: 'perspective(1000px) rotateY(90deg)', opacity: 0 },
})