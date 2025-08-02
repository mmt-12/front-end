import { useUserStore } from '@/store/userStore'
import { css, type Theme } from '@emotion/react'
import { useEffect, useState } from 'react'
import greetingMascot from '@/assets/mascot/greeting.png'
import { MEMBERS } from '@/consts/SSAFY_12_MEMBERS'
import { signupTitleStyle } from '@/styles/signupTitle'

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
      <div css={signupTitleStyle}>
        <h1>환영합니다!</h1>
        <p>
          {MEMBERS[userStore.birthDate]?.greeting ||
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
    zIndex: 2,
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.bg,
    pointerEvents: 'none',
    transition: 'opacity 1s ease-in-out',
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
