import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSignUp } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import DateInputField from '@/components/common/DateInputField'
import InputField from '@/components/common/InputField'
import { MEMBERS } from '@/consts/SSAFY_12_MEMBERS'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { signupTitleStyle } from '@/styles/auth'
import { flexGap } from '@/styles/common'
import { dateToId, formatDate } from '@/utils/date'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState<Date>()

  const navigate = useNavigate()
  const userStore = useUserStore()
  const { mutate: signup } = useSignUp()

  const isValid = useMemo(() => {
    if (!birthDate || !MEMBERS[dateToId(birthDate)]) return false
    return name.length > 0 && password == '오렌지' && !!birthDate
  }, [name, password, birthDate])

  return (
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
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <BottomButton
        label='입장하기'
        type={isValid ? 'primary' : 'disabled'}
        onClick={() => {
          if (!birthDate) return

          signup(
            {
              birthday: formatDate(birthDate, '-'),
              name,
              email: userStore.email,
            },
            {
              onSuccess: res => {
                userStore.signup(birthDate)
                userStore.login(res)
                navigate(ROUTES.MEMORY_LIST)
              },
            },
          )
        }}
      />
    </div>
  )
}
