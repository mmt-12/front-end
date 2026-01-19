import { useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import { useLogin } from '@/api'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import Logo from '@/components/common/Logo/Logo'
import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/userStore'
import { flexGap } from '@/styles/common'
import HelpButton from '../common/HelpButton/HelpButton'
import Popup from './Popup'
import SignupPopup from './SignupPopup'

export default function LoginPopup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [logInFailed, setLogInFailed] = useState(false)

  const error = useMemo(() => {
    if (!isSubmitted) return ''
    if (logInFailed) return '이메일 또는 비밀번호가 올바르지 않습니다.'
    if (!email) return '이메일을 입력해주세요.'
    if (!password) return '비밀번호를 입력해주세요.'
    return ''
  }, [email, password, isSubmitted, logInFailed])

  const { openModal } = useModal()
  const { mutate: loginMutate } = useLogin()
  const navigate = useNavigate()
  const login = useUserStore(s => s.login)

  return (
    <Popup title='로그인'>
      <div css={[flexGap(48), containerStyle]}>
        <Logo />
        <div css={flexGap(4)}>
          <InputField
            label='이메일'
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setLogInFailed(false)
            }}
          />
          <InputField
            label='비밀번호'
            type='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setLogInFailed(false)
            }}
          />
        </div>
        <div css={[flexGap(28), { width: '100%', padding: '20px 0px' }]}>
          <span css={errorStyle}>{error}</span>
          <div css={flexGap(8)}>
            <Button
              label='로그인'
              onClick={() => {
                setIsSubmitted(true)
                loginMutate(
                  { email, password },
                  {
                    onSuccess: res => {
                      login(res)
                      navigate('/')
                    },
                    onError: () => {
                      setLogInFailed(true)
                    },
                  },
                )
              }}
              customCss={buttonStyle}
            />
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
  padding: '16px 0px',
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
    height: '20px',
  })
