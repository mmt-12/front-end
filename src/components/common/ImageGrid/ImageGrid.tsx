import { css, useTheme } from '@emotion/react'

import WavyBox from '@/components/guest-book/WavyBox'
import Img from '../Img'

interface Props {
  images: string[]
  onImageClick?: (_image: string) => void
  selectedImage?: string
}

export default function ImageGrid({
  images,
  onImageClick,
  selectedImage,
}: Props) {
  const theme = useTheme()

  return (
    <div css={imagesGridStyle}>
      {images.map((image, index) =>
        selectedImage === image ? (
          <WavyBox
            key={index}
            strokeColor={theme.colors.sky[500]}
            strokeWidth={3}
            borderRadius={4}
            childrenOnTop={false}
          >
            <Img
              onClick={() => onImageClick?.(image)}
              src={image}
              alt={`Memory image ${index + 1}`}
              css={{
                borderRadius: 4,
              }}
            />
          </WavyBox>
        ) : (
          <Img
            onClick={() => onImageClick?.(image)}
            key={index}
            src={image}
            alt={`Memory image ${index + 1}`}
          />
        ),
      )}
    </div>
  )
}

const imagesGridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '4px',
  img: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    overflow: 'hidden',
    objectPosition: 'center',
  },
})
