import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BottomButton from '@/components/common/BottomButton'
import DateInputField from '@/components/common/DateInputField'
import InputField from '@/components/common/InputField'
import Spacing from '@/components/common/Spacing'
import { MEMBERS } from '@/consts/SSAFY_12_MEMBERS'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { signupTitleStyle } from '@/styles/signupTitle'
import { dateToId } from '@/utils/date'

export default function SignupPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState<Date | null>(null)

  const userStore = useUserStore()

  const isValid = useMemo(() => {
    const id = dateToId(birthDate)
    if (id === null) return false
    if (MEMBERS[id] === undefined) return false

    return name.length > 0 && password == '오렌지' && birthDate !== null
  }, [name, password, birthDate])

  return (
    <>
      <div css={signupTitleStyle}>
        <h1>당신은 누구인가요?</h1>
        <p>지금은 싸피 12기 12반만 가입할 수 있어요.</p>
      </div>
      <Spacing height={8} />
      <InputField
        label='이름'
        onChange={(v: string) => {
          setName(v)
        }}
      />
      <Spacing height={8} />
      <DateInputField
        label='생년월일'
        onChange={date => {
          setBirthDate(date)
        }}
      />
      <Spacing height={8} />
      <InputField
        label='암호 - 우리반 반장님이 뱉은 주스는?'
        onChange={(v: string) => {
          setPassword(v)
        }}
      />
      <Spacing height={8} />
      <BottomButton
        label='입장하기'
        type={isValid ? 'primary' : 'disabled'}
        onClick={() => {
          userStore.login(birthDate)
          navigate(ROUTES.MEMORY_LIST)
        }}
      />
    </>
  )
}
