import { css } from '@emotion/react'

import defaultProfile from '@/assets/images/mascot/default-profile.png'

interface Props {
  alt: string
  src?: string
  onClick?: () => void
  css?: any
  onError?: (_e: React.SyntheticEvent<HTMLImageElement>) => void
  width?: string | number
  height?: string | number
}

export default function Img(props: Props) {
  const src = props.src || defaultProfile
  return (
    <img
      {...props}
      css={[defaultStyle, props.css]}
      src={src}
      onError={e => {
        e.currentTarget.src = defaultProfile
        props.onError?.(e)
      }}
    />
  )
}

const defaultStyle = css({
  objectFit: 'cover',
})
