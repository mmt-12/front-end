import { useEffect, useState } from 'react'
import { css } from '@emotion/react'

import greetingMascot from '@/assets/images/mascot/greeting.jpeg'
import Img from '@/components/common/Img'
import { MEMBERS } from '@/consts/SSAFY_12_MEMBERS'
import { useUserStore } from '@/store/userStore'
import { signupTitleStyle } from '@/styles/auth'
import { modalStyle } from '@/styles/modal'

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
    <div css={[modalStyle, containerStyle]} style={{ opacity }}>
      <div css={signupTitleStyle}>
        <h1>환영합니다!</h1>
        <p>
          {MEMBERS[userStore.birthDate]?.greeting ||
            '우리 소중한 기억을 간직해보아요.'}
        </p>
      </div>
      <div css={mascotWrapperStyle}>
        <Img
          src={greetingMascot}
          alt='Greeting Mascot'
          customCss={mascotStyle}
        />
      </div>
    </div>
  )
}

const containerStyle = css({
  pointerEvents: 'none',
  transition: 'opacity 1s ease-in-out',
})

const mascotWrapperStyle = css({
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '80px',
  overflow: 'hidden',
})

const mascotStyle = css({
  width: '76%',
  objectFit: 'contain',
})
