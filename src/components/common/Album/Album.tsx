import { css, type Theme } from '@emotion/react'

export interface Props {
  images: string[]
}

export default function Album({ images }: Props) {
  return (
    <div css={albumContainerStyle}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Album image ${index}`} />
        </div>
      ))}
    </div>
  )
}

const albumContainerStyle = (theme: Theme) =>
  css({
    width: '100%',
    maxWidth: theme.maxWidth,
    height: '100vw',
    maxHeight: theme.maxWidth,
    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
    display: 'flex',
    gap: '12px',
    div: {
      width: '100vw',
      maxWidth: theme.maxWidth,
      height: '100vw',
      maxHeight: theme.maxWidth,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,

      overflow: 'hidden',
      scrollSnapAlign: 'center',
    },
    img: {
      width: '100%',
      objectFit: 'cover',
    },
  })
