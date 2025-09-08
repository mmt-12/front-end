import { useRef, useState, type MouseEvent } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { PauseCircle, PlayCircle } from '@solar-icons/react'

import Marquee from '@/components/common/Marquee'
import type { IReaction } from '@/types/reaction'

export default function Voice({
  id,
  url: audioUrl,
  amount,
  isActive = false,
  involved = false,
  name,
  onClick,
}: IReaction) {
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
      css={containerStyle(theme, involved, isActive, !!amount)}
      onClick={e => onClick?.(e, id)}
    >
      <div css={playButtonWrapperStyle}>
        <button onClick={handleButtonClick} css={playButtonStyle}>
          {isPlaying ? (
            <PauseCircle weight='Bold' size={36} color={theme.white} />
          ) : (
            <PlayCircle weight='Bold' size={36} color={theme.white} />
          )}
        </button>
        <div css={marqueeStyle}>
          <Marquee speed={20} className='stardust'>
            <p css={nameStyle}>{name}</p>
          </Marquee>
        </div>
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
  involved: boolean,
  isActive: boolean,
  isAmount: boolean,
) =>
  css({
    padding: isAmount ? (isActive ? '4px 12px 4px 4px' : '2px') : 0,

    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',

    borderRadius: '24px',
    backgroundColor: isActive ? theme.stone[200] : 'transparent',
    outline: involved
      ? isAmount
        ? 'none'
        : `3px solid ${theme.sky[300]}`
      : 'none',

    span: {
      fontWeight: involved ? 'bold' : 'normal',
      color: involved ? theme.sky[500] : theme.black,
    },
  })

const playButtonWrapperStyle = (theme: Theme) =>
  css({
    padding: '3px 12px 3px 4px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    gap: '4px',
    borderRadius: '24px',
    backgroundColor: theme.stone[600],
  })

const marqueeStyle = css({
  width: 'fit-content',
  maxWidth: '100px',
})

const nameStyle = css({
  marginRight: '8px',
  width: 'fit-content',
  color: 'white',
  fontSize: '17px',
})

const playButtonStyle = css({
  width: '38px',
  aspectRatio: '1 / 1',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
})
