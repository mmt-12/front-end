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
    zIndex: 20,
    position: 'fixed',
    bottom: '24px',
    right: '0%',
    marginRight: `calc(calc(calc(100vw - min(${theme.maxWidth}, 100vw)) / 2) + 24px)`,

    padding: '10px 16px',

    display: 'flex',
    gap: '24px',

    backgroundColor: theme.white,
    borderRadius: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  })
