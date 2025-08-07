import { css, useTheme, type Theme } from '@emotion/react'
import { SoundwaveSquare, StickerSmileSquare } from '@solar-icons/react'

export default function ReactBar() {
  const theme = useTheme()
  return (
    <div css={containerStyle}>
      <StickerSmileSquare weight='Bold' size={44} color={theme.yellow} />
      <SoundwaveSquare weight='Bold' size={44} color={theme.sky[400]} />
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    bottom: '16px',
    right: '20px',
    zIndex: 20,

    padding: '10px 12px',

    display: 'flex',
    gap: '20px',

    backgroundColor: theme.white,
    borderRadius: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  })
