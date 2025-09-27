import { css, keyframes, type Theme } from '@emotion/react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import { Link } from 'react-router-dom'

import type { Achievement } from '@/api'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { fadeIn } from '@/styles/animation'
import { flexGap } from '@/styles/common'

type Props = Omit<Achievement, 'name' | 'obtained'>

export default function NewBadgeModal({ id, type }: Props) {
  const commonDecorateOptions = {
    scalar: 0.9,
    spread: 100,
    particleCount: 30,
    startVelocity: 40,
  }

  const associateId = useUserStore(s => s.associateId)

  return (
    <>
      <div css={sunStyle}>
        <div css={{ scale: 1.6 }}>
          <Badge id={id} />
        </div>
      </div>
      <div css={modalStyle}>
        <div css={[flexGap(20), { height: 120, justifyContent: 'flex-end' }]}>
          {type !== 'OPEN' ? (
            <h2 css={hiddenSpanStyle}>히든 업적을 달성했어요!</h2>
          ) : (
            <h2>업적을 달성했어요!</h2>
          )}
        </div>
        <div css={badgePlaceholderStyle}></div>
        <div css={[flexGap(20), { height: 120 }]}>
          <p>칭호를 획득했습니다.</p>
          <Link to={ROUTES.GUEST_BOOK(associateId)}>
            <Button label='내 방명록 가기' />
          </Link>
        </div>
      </div>

      <Realistic
        autorun={{ speed: 0.3 }}
        decorateOptions={() => ({
          ...commonDecorateOptions,
          angle: 100,
          origin: { x: 1, y: 0.4 },
        })}
      />
      <Realistic
        autorun={{ speed: 0.2, delay: 400 }}
        decorateOptions={() => ({
          ...commonDecorateOptions,
          angle: 80,
          origin: { x: 0, y: 0.3 },
        })}
      />
      <Realistic
        autorun={{ speed: 0.1, delay: 800 }}
        decorateOptions={() => ({
          ...commonDecorateOptions,
          angle: 100,
          origin: { x: 1, y: 0.9 },
        })}
      />
      <Realistic
        autorun={{ speed: 0.2, delay: 900 }}
        decorateOptions={() => ({
          ...commonDecorateOptions,
          angle: 80,
          origin: { x: 0, y: 0.8 },
        })}
      />
    </>
  )
}

const rise = keyframes({
  '0%': { bottom: '-20%', scale: 0.4 },
  '100%': { bottom: '49%', scale: 1 },
})
const spin = keyframes({
  to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
})
const spinReverse = keyframes({
  to: { transform: 'translate(-50%, -50%) rotate(-360deg)' },
})
const grow = keyframes({
  to: { width: '75vh', height: '75vh' },
})

const split = keyframes({
  to: { gap: 120 },
})

const modalStyle = css({
  position: 'relative',
  height: '100vh',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,

  color: 'white',
  textAlign: 'center',
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  animation: `${split} 5s ease-in-out forwards`,
})

const badgePlaceholderStyle = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 220,
  height: 56,
  borderRadius: 32,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
  animation: `${fadeIn} 3.5s ease-in-out forwards`,
})

const hiddenSpanStyle = (theme: Theme) =>
  css({
    color: theme.colors.yellow,
  })

const sunStyle = css({
  position: 'absolute',
  left: '50%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,

  transform: 'translateX(-50%)',
  animation: `${rise} 5s ease-in-out forwards`,
  zIndex: 2, // warm glow under the rays
  borderRadius: 12,
  pointerEvents: 'none',
  // DENSE, THIN RAYS (layer 1)
  '::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '480px',
    height: '480px',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    // many thin rays all around the circle
    background: `repeating-conic-gradient( from 0deg, rgba(255, 235, 140, 0.45) 0deg 6deg, rgba(255, 235, 140, 0) 6deg 12deg )`,
    // cut a hole near the sun and fade the very outer edge
    maskImage:
      'radial-gradient(circle, transparent 0 70px, black 180px 280px, transparent 335px)',
    WebkitMaskImage:
      'radial-gradient(circle, transparent 0 70px, black 180px 280px, transparent 335px)',
    animation: `${spin} 18s linear infinite, ${grow} 5s ease-in-out forwards`,
    filter: 'blur(0.5px)',
    opacity: 0.9,
    zIndex: -1,
    willChange: 'transform',
  },
  // SOFTER, WIDER RAYS (layer 2)
  '::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '480px',
    height: '480px',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    background: `repeating-conic-gradient( from 10deg, rgba(255, 210, 120, 0.3) 0deg 10deg, rgba(255, 210, 120, 0.01) 10deg 20deg )`,
    maskImage:
      'radial-gradient(circle, transparent 0 90px, black 150px 0px, transparent 220px)',
    WebkitMaskImage:
      'radial-gradient(circle, transparent 0 90px, black 150px 0px, transparent 220px)',
    animation: `${spinReverse} 120s linear infinite, ${grow} 5s ease-in-out forwards`,
    filter: 'blur(6px)',
    opacity: 0.6,
    zIndex: -2,
    willChange: 'transform',
  },
})
