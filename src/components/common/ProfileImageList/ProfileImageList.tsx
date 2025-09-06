import { css, useTheme } from '@emotion/react'
import { CloseCircle } from '@solar-icons/react'

import WavyBox from '@/components/guest-book/WavyBox'
import type { IProfileImage } from '@/types'
import Img from '../Img'

interface Props {
  images: IProfileImage[]
  onImageClick?: (_image: IProfileImage) => void
  selectedImageUrl?: string
}

export default function ProfileImageList({
  images,
  onImageClick,
  selectedImageUrl,
}: Props) {
  const theme = useTheme()
  const props = (isSelected: boolean) =>
    isSelected
      ? {
          strokeColor: theme.sky[500],
          strokeWidth: 3,
          borderRadius: 4,
        }
      : { strokeWidth: 0, strokeColor: 'transparent' }

  return (
    <div css={imagesGridStyle}>
      {images.map((image, index) => (
        <WavyBox
          key={index}
          {...props(selectedImageUrl == image.url)}
          childrenOnTop={false}
        >
          <Img
            onClick={() => onImageClick?.(image)}
            src={image.url}
            alt={`Memory image ${index + 1}`}
            css={imageStyle(selectedImageUrl == image.url)}
          />
          {image.register && (
            <CloseCircle
              css={deleteButtonStyle}
              weight='Bold'
              size={34}
              color={theme.white}
              onClick={() => {}}
            />
          )}
        </WavyBox>
      ))}
    </div>
  )
}

const imagesGridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '4px',
})

const imageStyle = (isSelected: boolean) =>
  css({
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    overflow: 'hidden',
    objectPosition: 'center',
    borderRadius: isSelected ? '4px' : 0,
  })

const deleteButtonStyle = css({
  position: 'absolute',
  padding: 4,
  top: 2,
  right: 2,
  cursor: 'pointer',
  zIndex: 12,
  filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))',
})
