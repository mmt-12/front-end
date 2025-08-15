import type { IReaction } from '@/types/reaction'
import { css, useTheme, type Theme } from '@emotion/react'
import { PauseCircle, PlayCircle } from '@solar-icons/react'
import { useRef, useState, type MouseEvent } from 'react'

interface Props extends IReaction {
  content: string
}

export default function Voice({
  id,
  url: audioUrl,
  amount,
  isActive = false,
  iReacted = false,
  content,
  onClick,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const theme = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (audioRef.current) {
      if (audioRef.current.paused) {
        setIsPlaying(true)
        audioRef.current.play()
      } else {
        setIsPlaying(false)
        audioRef.current.pause()
      }
    }
  }
  return (
    <div
      css={containerStyle(theme, iReacted, isActive, !!amount)}
      onClick={e => onClick?.(e, id)}
    >
      <div css={playButtonWrapperStyle}>
        <button onClick={handleButtonClick} css={playButtonStyle}>
          {isPlaying ? (
            <PauseCircle weight='Bold' size={28} color={theme.white} />
          ) : (
            <PlayCircle weight='Bold' size={28} color={theme.white} />
          )}
        </button>
        <p className='stardust'>{content}</p>
      </div>
      {amount && <span>{amount}</span>}
      <audio
        src={audioUrl}
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}

const containerStyle = (
  theme: Theme,
  iReacted: boolean,
  isActive: boolean,
  isAmount: boolean,
) =>
  css({
    width: 'fit-content',
    padding: isAmount ? '6px' : 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    gap: '4px',

    borderRadius: '24px',
    backgroundColor: isActive ? theme.stone[200] : 'transparent',
    outline: iReacted
      ? isAmount
        ? 'none'
        : `3px solid ${theme.sky[300]}`
      : 'none',

    span: {
      paddingRight: '10px',
      fontWeight: iReacted ? 'bold' : 'normal',
      color: iReacted ? theme.sky[500] : theme.black,
    },
  })

const playButtonWrapperStyle = (theme: Theme) =>
  css({
    padding: '3px 12px 3px 4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '24px',
    backgroundColor: theme.stone[600],
    p: {
      color: theme.white,
    },
  })

const playButtonStyle = css({
  width: '32px',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
