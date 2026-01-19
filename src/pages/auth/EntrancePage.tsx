import { useEffect } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import kakaoIcon from '@/assets/images/icons/kakao.png'
import mainMascot from '@/assets/images/mascot/main.png'
import Button from '@/components/common/Button'
import HelpButton from '@/components/common/HelpButton/HelpButton'
import Img from '@/components/common/Img'
import Logo from '@/components/common/Logo/Logo'
import LoginPopup from '@/components/popup/LoginPopup'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { flexGap } from '@/styles/common'
import { getToken } from '@/utils/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function EntrancePage() {
  const { openModal } = useModal()
  const navigate = useNavigate()
  useEffect(() => {
    if (getToken()) {
      navigate(ROUTES.MEMORY_LIST, { replace: true })
    }
  }, [navigate])

  return (
    <div css={containerStyle}>
      <Logo subtitle />
      <div css={mascotWrapperStyle}>
        <Img
          src={mainMascot}
          alt='memento mascot main'
          customCss={mascotStyle}
        />
      </div>
      <div css={[flexGap(20), { width: '100%' }]}>
        <Button
          label='일반 로그인'
          onClick={() => openModal(<LoginPopup />)}
          customCss={buttonStyle}
        />
        <a
          href={`${BASE_URL}/v1/sign-in`}
          css={[buttonStyle, kakaoButtonStyle]}
        >
          <Img src={kakaoIcon} alt='kakao icon' customCss={kakaoIconStyle} />
          <p>카카오 로그인</p>
        </a>
        <HelpButton label='관리자에게 문의하기' />
      </div>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100dvh',
  padding: '52px 0px 40px 0px',
})

const buttonStyle = css({
  width: 'calc(100% - 32px)',
  height: '60px',
  margin: '0 16px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  borderRadius: '12px',
})

const kakaoButtonStyle = css({
  backgroundColor: '#FFEB3B',
  gap: '24px',
  fontSize: '16px',
})

const mascotWrapperStyle = css({
  width: '76%',
  maxHeight: '400px',
  height: 'auto',
})

const mascotStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
})

const kakaoIconStyle = css({
  width: '24px',
  height: '24px',
})
