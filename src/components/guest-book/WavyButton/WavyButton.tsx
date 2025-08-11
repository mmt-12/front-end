import WavyBox from '@/components/common/WavyBox'
import { css, useTheme, type Theme } from '@emotion/react'

interface Props {
  label: string
  isFullWidth?: boolean
  onClick?: () => void
}

export default function WavyButton({
  label,
  isFullWidth = false,
  onClick,
}: Props) {
  const theme = useTheme()

  return (
    <WavyBox
      strokeColor={theme.stone[700]}
      strokeWidth={2}
      backgroundColor={theme.stone[700]}
      customCss={css({
        width: isFullWidth ? '100%' : 'fit-content',
      })}
    >
      <button css={buttonStyle} onClick={onClick} className='stardust'>
        <span>{label}</span>
      </button>
    </WavyBox>
  )
}

const buttonStyle = (theme: Theme) =>
  css({
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    wordBreak: 'keep-all',

    '&:active': {
      backgroundColor: theme.stone[800],
    },
  })
