import { useState } from 'react'
import { css, type Interpolation } from '@emotion/react'
import type { Theme } from '@emotion/react'

import defaultProfile from '@/assets/images/mascot/default-profile.png'
import { Skeleton } from '../Skeleton'

interface Props {
  alt?: string
  src?: string
  onClick?: () => void
  customCss?: Interpolation<Theme>
  onError?: (_e: React.SyntheticEvent<HTMLImageElement>) => void
  width?: string | number
  height?: string | number
}

export default function Img({
  alt = '',
  src = defaultProfile,
  onClick,
  customCss,
  onError,
  width = '100%',
  height = '100%',
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <img
        alt={alt}
        width={width}
        height={height}
        onClick={onClick}
        css={[defaultStyle(isLoaded), customCss]}
        src={src}
        onError={e => {
          e.currentTarget.src = defaultProfile
          onError?.(e)
        }}
        onLoad={() => {
          setIsLoaded(true)
        }}
      />
      {!isLoaded && (
        <Skeleton
          width={width || '100%'}
          height={height || '100%'}
          css={customCss}
        />
      )}
    </>
  )
}

const defaultStyle = (isLoaded: boolean) =>
  css({
    objectFit: 'cover',
    display: isLoaded ? 'block' : 'none',
  })
