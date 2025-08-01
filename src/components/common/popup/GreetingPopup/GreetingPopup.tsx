import { useUserStore } from '@/store/userStore'
import { css, type Theme } from '@emotion/react'
import { useEffect, useState } from 'react'
import greetingMascot from '@/assets/mascot/greeting.png'
import { MEMBERS } from '@/consts/SSAFY_12_MEMBERS'
import { dateToId } from '@/utils/date'

export default function GreetingPopup() {
  const userStore = useUserStore()
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    if (userStore.isNew) {
      setTimeout(() => {
        setOpacity(0)
      }, 2000)
      setTimeout(userStore.stale, 3000)
    }
  }, [userStore])

  if (!userStore.isNew) return null

  return (
    <div css={containerStyle} style={{ opacity }}>
      <div css={titlesStyle}>
        <h1 css={h1Style}>환영합니다!</h1>
        <p css={descriptionStyle}>
          {MEMBERS[dateToId(userStore.birthDate)]?.greeting ||
            '우리 소중한 기억을 간직해보아요.'}
        </p>
      </div>
      <div css={mascotWrapperStyle}>
        <img src={greetingMascot} alt='Greeting Mascot' css={mascotStyle} />
      </div>
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.bg,
    zIndex: 2,
    pointerEvents: 'none',
    transition: 'opacity 1s ease-in-out',
  })

const titlesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 28px',
  marginTop: '48px',
  gap: '8px',
})

const h1Style = (theme: Theme) =>
  css({
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.stone[700],
    margin: '0',
  })

const descriptionStyle = (theme: Theme) =>
  css({
    fontSize: 18,
    color: theme.stone[600],
  })
const mascotWrapperStyle = css({
  width: '100%',
  maxHeight: '400px',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '80px',
})

const mascotStyle = css({
  width: '76%',
  height: '100%',
  objectFit: 'contain',
})
