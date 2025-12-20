import { useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { Spacing } from 'sam-react-modal'

import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import { useModal } from '@/hooks/useModal'
import { flexGap } from '@/styles/common'
import DateInputField from '../common/DateInputField'
import Popup from './Popup'
import SignupRequestCompletePopup from './SignupRequestCompletePopup'

export default function SignupPopup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState(new Date())
  const [secretCode, setSecretCode] = useState('')

  const error = useMemo(() => {
    if (!email) return '이메일을 입력해주세요.'
    if (!password) return '비밀번호를 입력해주세요.'
    if (password !== passwordCheck) return '비밀번호가 일치하지 않습니다.'
    if (!name) return '이름을 입력해주세요.'
    if (!birthdate) return '생일을 입력해주세요.'
    if (!secretCode) return '초대코드를 입력해주세요.'
    return ''
  }, [email, password, passwordCheck, name, birthdate, secretCode])

  const { openModal, closeModal } = useModal()

  return (
    <Popup title='회원가입'>
      <div css={containerStyle}>
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
          <InputField
            label='비밀번호 확인'
            type='password'
            value={passwordCheck}
            onChange={e => setPasswordCheck(e.target.value)}
          />
          <Spacing height={24} />
          <InputField
            label='이름'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <DateInputField
            label='생일'
            value={birthdate}
            onChange={v => setBirthdate(v)}
          />
          <InputField
            label='초대코드'
            value={secretCode}
            onChange={e => setSecretCode(e.target.value)}
          />
        </div>
        <span css={errorStyle}>{error}</span>
        <Button
          label='가입 요청'
          type={error ? 'disabled' : 'secondary'}
          onClick={async () => {
            closeModal()
            openModal(<SignupRequestCompletePopup />)
          }}
          customCss={buttonStyle}
        />
      </div>
    </Popup>
  )
}

const containerStyle = css({
  padding: '16px 0',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const buttonStyle = {
  width: 'calc(100% - 32px)',
  margin: '4px 16px',
}

const errorStyle = (theme: Theme) =>
  css({
    color: theme.colors.sky[500],
    textAlign: 'center',
    fontSize: '15px',
  })
