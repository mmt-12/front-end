import { css, useTheme, type Theme } from '@emotion/react'

import WavyBox from '@/components/guest-book/WavyBox'

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
      strokeColor={theme.colors.stone[700]}
      strokeWidth={2}
      backgroundColor={theme.colors.stone[700]}
      customCss={css({
        width: isFullWidth ? '100%' : 'fit-content',
      })}
    >
      <button css={buttonStyle} onClick={onClick}>
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
    padding: '8px 12px',
    fontSize: 16,
    fontFamily: 'PFStardust',
    color: 'white',
    wordBreak: 'keep-all',

    '&:active': {
      backgroundColor: theme.colors.stone[800],
    },
  })
