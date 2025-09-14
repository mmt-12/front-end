import { useState } from 'react'
import { css, type Interpolation } from '@emotion/react'
import type { Theme } from '@emotion/react'

import defaultProfile from '@/assets/images/mascot/default-profile.png'
import { Skeleton } from '../Skeleton'

interface Props {
  alt: string
  src?: string
  onClick?: () => void
  customCss?: Interpolation<Theme>
  onError?: (_e: React.SyntheticEvent<HTMLImageElement>) => void
  width?: string | number
  height?: string | number
}

export default function Img(props: Props) {
  const src = props.src || defaultProfile
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <img
        {...props}
        css={[defaultStyle(isLoaded), props.customCss]}
        src={src}
        onError={e => {
          e.currentTarget.src = defaultProfile
          props.onError?.(e)
        }}
        onLoad={() => {
          setIsLoaded(true)
        }}
      />
      {!isLoaded && (
        <Skeleton
          width={props.width || '100%'}
          height={props.height || '100%'}
          css={props.customCss}
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
