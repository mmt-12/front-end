import { css, useTheme, type Theme } from '@emotion/react'
import { ROUTES } from '@/routes/ROUTES'
import { useNavigate } from 'react-router-dom'
import InputField from '@/components/common/InputField'
import DateInputField from '@/components/common/DateInputField'
import { useState } from 'react'
import Button from '@/components/common/Button'

export default function SignupPage() {
  const navigate = useNavigate()
  const theme = useTheme()

  const [birthDate, setBirthDate] = useState<Date | null>(null)
  return (
    <div css={containerStyle}>
      <div css={titlesStyle}>
        <h1 css={h1Style}>당신은 누구인가요?</h1>
        <p css={descriptionStyle}>지금은 싸피 12기 12반만 가입할 수 있어요.</p>
      </div>
      <div css={inputsStyle}>
        <InputField label='이름' onChange={() => {}} />
        <DateInputField
          label='생년월일'
          onChange={date => {
            setBirthDate(date)
          }}
        />
        <InputField
          label='암호 - 우리반 반장님이 뱉은 주스는?'
          onChange={() => {}}
        />
      </div>
      <div css={buttonWrapperStyle}>
        <Button
          label='입장하기'
          type='primary'
          onClick={() => {
            navigate(ROUTES.MEMORY_LIST)
          }}
        />
      </div>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
})

const titlesStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 28px',
  marginTop: '48px',
  gap: '8px',
})

const h1Style = (theme: Theme) =>
  css({
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.stone[700],
    margin: '0',
  })

const descriptionStyle = (theme: Theme) =>
  css({
    fontSize: 18,
    color: theme.stone[600],
  })

const inputsStyle = css({
  margin: '32px 0px',

  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

const buttonWrapperStyle = css({
  marginTop: 'auto',
  padding: '16px',
})
