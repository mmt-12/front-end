import { useEffect } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { QuestionCircle } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import kakaoIcon from '@/assets/images/icons/kakao.png'
import mainMascot from '@/assets/images/mascot/main.png'
import Img from '@/components/common/Img'
import { ROUTES } from '@/routes/ROUTES'
import { getToken } from '@/utils/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function LoginPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  useEffect(() => {
    if (getToken()) {
      navigate(ROUTES.MEMBER_LIST)
    }
  }, [navigate])

  return (
    <div css={containerStyle}>
      <div css={titlesStyle}>
        <p css={subTitleStyle}>우리의 추억을 위한 공간</p>
        <p css={titleStyle}>Memento</p>
      </div>
      <div css={mascotWrapperStyle}>
        <Img
          src={mainMascot}
          alt='memento mascot main'
          customCss={mascotStyle}
        />
      </div>
      <div css={buttonsContainerStyle}>
        <a
          href={`${BASE_URL}/v1/sign-in`}
          css={[buttonStyle, kakaoButtonStyle]}
        >
          <Img src={kakaoIcon} alt='kakao icon' customCss={kakaoIconStyle} />
          <p>카카오 로그인</p>
        </a>
        <button css={buttonStyle}>
          <QuestionCircle
            weight='Bold'
            size={24}
            color={theme.colors.stone[400]}
            width={16}
          />
          <span css={smallLabelStyle}>관리자에게 문의하기</span>
        </button>
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
})

const titlesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '108px 16px 4px 16px',
})

const subTitleStyle = css({ fontSize: 18, padding: 0, margin: 0 })

const titleStyle = (theme: Theme) =>
  css({
    fontSize: '48px',
    color: theme.colors.stone[700],
    margin: '0',
    fontFamily: 'Pacifico, cursive',
  })

const buttonsContainerStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  padding: '32px 0px',
})

const buttonStyle = css({
  width: 'calc(100% - 72px)',
  maxWidth: '360px',
  padding: '4px 20px',
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
  height: '60px',
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

const smallLabelStyle = (theme: Theme) =>
  css({
    color: theme.colors.stone[600],
    fontSize: 13,
    paddingTop: 2,
  })
