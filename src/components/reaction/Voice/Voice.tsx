import { useRef, useState, type MouseEvent } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { PauseCircle, PlayCircle } from '@solar-icons/react'

import Marquee from '@/components/common/Marquee'
import type { IReaction } from '@/types/reaction'

interface Props extends IReaction {
  isPost?: boolean
}

export default function Voice({
  id,
  url: audioUrl,
  isActive = false,
  involved = false,
  name = '',
  isPost = false,
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
      css={containerStyle}
      onClick={e => onClick?.(e, id)}
      className='button'
    >
      <div css={playButtonWrapperStyle(theme, involved)}>
        <button onClick={handleButtonClick} css={playButtonStyle}>
          {isPlaying ? (
            <PauseCircle weight='Bold' size={36} color={theme.colors.white} />
          ) : (
            <PlayCircle weight='Bold' size={36} color={theme.colors.white} />
          )}
        </button>
        <div css={marqueeStyle}>
          <Marquee speed={20} className='stardust'>
            <p css={nameStyle}>{name}</p>
          </Marquee>
        </div>
      </div>
      {isPost && <div css={activeBarStyle(theme, isActive)} />}
      <audio
        src={audioUrl}
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}

const containerStyle = css({
  padding: 0,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  gap: 6,
  flexGrow: 1,

  borderRadius: 24,
})

const playButtonWrapperStyle = (theme: Theme, involved: boolean) =>
  css({
    width: '100%',
    padding: '3px 12px 3px 4px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    gap: '4px',
    borderRadius: '24px',
    backgroundColor: theme.colors.stone[600],

    border: involved ? `3px solid ${theme.colors.sky[300]}` : 'none',
    filter: involved ? 'sepia(10%);' : 'none',
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
  width: '34px',
  aspectRatio: '1 / 1',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
})

const activeBarStyle = (theme: Theme, isActive: boolean) =>
  css({
    width: isActive ? 24 : 0,
    height: isActive ? 4 : 0,
    borderRadius: 2,
    backgroundColor: theme.colors.stone[300],
    transition: 'height 0.2s ease-in-out, width 0.2s ease-in-out',
  })
