import { css } from '@emotion/react'

import emailMascot from '@/assets/images/mascot/email.png'
import { useModal } from '@/hooks/useModal'
import { signupTitleStyle } from '@/styles/auth'
import Button from '../common/Button'
import Img from '../common/Img'
import Popup from './Popup'

export default function SignupRequestCompletePopup() {
  const { closeModal } = useModal()
  return (
    <Popup title='회원가입'>
      <div css={containerStyle}>
        <div css={signupTitleStyle}>
          <h1>가입 요청 완료</h1>
          <p>관리자가 12반이 맞는지 확인하고 있어요.</p>
          <p>금방 확인하고 알림으로 알려드릴게요!</p>
        </div>
        <div css={imageWrapperStyle}>
          <Img src={emailMascot} alt='email mascot' width={'80%'} />
        </div>
        <Button
          label='확인'
          type='secondary'
          customCss={buttonStyle}
          onClick={() => closeModal()}
        />
      </div>
    </Popup>
  )
}

const containerStyle = css({
  padding: '12px 0px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const imageWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
})

const buttonStyle = css({
  width: 'calc(100% - 32px)',
  margin: '12px 16px',
})
