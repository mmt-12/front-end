import type { IReaction } from '@/types/reaction'
import { css, useTheme, type Theme } from '@emotion/react'
import { PlayCircle } from '@solar-icons/react'
import { useRef } from 'react'

interface Props extends IReaction {
  content: string
}

export default function Voice({
  url: audioUrl,
  amount,
  isActive,
  content,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const theme = useTheme()
  return (
    <div css={containerStyle} className={isActive ? 'active' : ''}>
      <audio src={audioUrl} ref={audioRef} />
      <div css={playButtonWrapperStyle}>
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.play()
            }
          }}
          css={playButtonStyle}
        >
          <PlayCircle weight='Bold' size={28} color={theme.white} />
        </button>
        <p className='stardust'>{content}</p>
      </div>
      {amount && <span>{amount}</span>}
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  gap: '4px',
})

const playButtonStyle = css({
  width: '32px',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const playButtonWrapperStyle = (theme: Theme) =>
  css({
    padding: '3px 14px 3px 4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '24px',
    backgroundColor: theme.stone[600],
    p: {
      color: theme.white,
      fontWeight: 300,
    },
  })
