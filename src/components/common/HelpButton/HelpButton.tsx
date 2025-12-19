import { css, useTheme, type Theme } from '@emotion/react'
import { QuestionCircle } from '@solar-icons/react'

import { useModal } from '@/hooks/useModal'

interface Props {
  label: string
}

export default function HelpButton({ label }: Props) {
  const theme = useTheme()
  const { alert } = useModal()

  return (
    <button
      css={buttonStyle}
      onClick={() => {
        alert(
          '김지호, 유선우, 이중혁, 이정현, 최성환 <br /> 카카오톡으로 문의해주세요!',
        )
      }}
    >
      <QuestionCircle
        weight='Bold'
        size={24}
        color={theme.colors.stone[400]}
        width={16}
      />
      <span css={smallLabelStyle}>{label}</span>
    </button>
  )
}

const smallLabelStyle = (theme: Theme) =>
  css({
    color: theme.colors.stone[600],
    fontSize: 15,
    paddingTop: 2,
  })

const buttonStyle = css({
  width: 'calc(100% - 32px)',
  margin: '0 16px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  borderRadius: '12px',
})
