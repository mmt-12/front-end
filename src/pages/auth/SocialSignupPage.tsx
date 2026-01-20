import { useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { useKakaoSignup } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import DateInputField from '@/components/common/DateInputField'
import InputField from '@/components/common/InputField'
import Loader from '@/components/common/Loader'
import { MEMBERS } from '@/consts/SSAFY_12_MEMBERS'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { signupTitleStyle } from '@/styles/auth'
import { flexGap } from '@/styles/common'
import { dateToId } from '@/utils/date'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [secret, setSecret] = useState('')
  const [birthDate, setBirthDate] = useState<Date>()

  const navigate = useNavigate()
  const userStore = useUserStore()
  const { mutate: signup, isPending, error } = useKakaoSignup()

  const isValid = useMemo(() => {
    if (!birthDate || !MEMBERS[dateToId(birthDate)]) return false
    return name.length > 0
  }, [birthDate, name])

  return (
    <>
      {isPending && <Loader size='full' />}
      <div css={flexGap(8)}>
        <div css={signupTitleStyle}>
          <h1>당신은 누구인가요?</h1>
          <p>지금은 싸피 12기 12반만 가입할 수 있어요.</p>
        </div>
        <InputField
          label='이름'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <DateInputField
          label='생년월일'
          onChange={date => {
            setBirthDate(date)
          }}
        />
        <InputField
          label='암호 - 우리반 반장님이 뱉은 주스는?'
          value={secret}
          onChange={e => setSecret(e.target.value)}
        />
        <BottomButton
          label='입장하기'
          type={isValid ? 'primary' : 'disabled'}
          onClick={() => {
            if (!birthDate) return

            signup(
              {
                birthday: birthDate,
                name,
                secret,
                email: userStore.email,
              },
              {
                onSuccess: res => {
                  userStore.signup(birthDate)
                  userStore.socialLogin(res)
                  navigate(ROUTES.MEMORY_LIST, { replace: true })
                },
              },
            )
          }}
        />

        {!!error && (
          <p role='alert' css={errorStyle}>
            {(error as AxiosError<{ message: string }>).response?.data
              ?.message || '회원가입에 실패했습니다.'}
          </p>
        )}
      </div>
    </>
  )
}

const errorStyle = (theme: Theme) =>
  css({
    color: theme.colors.danger,
    textAlign: 'center',
    fontSize: '15px',
    height: '20px',
  })
