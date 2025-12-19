import { useState } from 'react'
import { css, type Theme } from '@emotion/react'

import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import Logo from '@/components/common/Logo/Logo'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import HelpButton from '../common/HelpButton/HelpButton'
import Popup from './Popup'
import SignupPopup from './SignupPopup'

export default function LoginPopup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error] = useState('승인 대기중인 회원이에요')

  const { openModal } = useModal()

  return (
    <Popup title='로그인'>
      <div css={[flexGap(48), containerStyle]}>
        <Logo />
        <div css={flexGap(4)}>
          <InputField
            label='이메일'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputField
            label='비밀번호'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div css={[flexGap(24), { width: '100%', padding: '12px 0px' }]}>
          <span css={errorStyle}>{error}</span>
          <div css={flexGap(8)}>
            <Button label='로그인' onClick={() => {}} customCss={buttonStyle} />
            <Button
              label='회원가입'
              type='secondary'
              onClick={() => {
                openModal(<SignupPopup />)
              }}
              customCss={buttonStyle}
            />
          </div>
          <HelpButton label='비밀번호를 분실했어요.' />
        </div>
      </div>
    </Popup>
  )
}

const containerStyle = {
  padding: '32px 0px',
  height: '100%',
  justifyContent: 'space-between',
}

const buttonStyle = {
  width: 'calc(100% - 32px)',
  margin: '4px 16px',
}
const errorStyle = (theme: Theme) =>
  css({
    color: theme.colors.danger,
    textAlign: 'center',
    fontSize: '15px',
  })
