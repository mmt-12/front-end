import { css, useTheme, type Theme } from '@emotion/react'
import { CloseCircle, Crop } from '@solar-icons/react'

import Img from '../Img'

interface ImagePreviewProps {
  image: File | string
  showCropButton: boolean
  showDeleteButton: boolean
  onCrop: () => void
  onDelete: () => void
}

export default function ImagePreview({
  image,
  showCropButton,
  showDeleteButton,
  onCrop,
  onDelete,
}: ImagePreviewProps) {
  const theme = useTheme()
  const imageSrc =
    typeof image === 'string' ? image : URL.createObjectURL(image)

  return (
    <div css={[imageWrapperStyle, showCropButton && cropImageStyle]}>
      <Img src={imageSrc} alt='preview image' />
      {showDeleteButton && (
        <CloseCircle
          css={deleteButtonStyle}
          weight='Bold'
          size={48}
          color={theme.colors.white}
          onClick={onDelete}
        />
      )}
      {showCropButton && (
        <div css={cropButtonWrapperStyle} onClick={onCrop}>
          <Crop weight='Bold' size={24} color={theme.colors.white} />
        </div>
      )}
    </div>
  )
}

const imageWrapperStyle = (theme: Theme) =>
  css({
    position: 'relative',
    width: '100%',
    maxWidth: theme.maxWidth,
    aspectRatio: '1 / 1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    scrollSnapAlign: 'center',
    backgroundColor: theme.colors.stone[150],
  })

const cropImageStyle = css({
  img: {
    width: '100%',
    objectFit: 'cover',
  },
})

const baseIconStyle = css({
  position: 'absolute',
  cursor: 'pointer',
  zIndex: 12,
})

const deleteButtonStyle = css(baseIconStyle, {
  top: 8,
  right: 8,
  filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))',
})

const cropButtonWrapperStyle = (theme: Theme) =>
  css(baseIconStyle, {
    bottom: 12,
    right: 10,
    backgroundColor: theme.colors.stone[600],
    borderRadius: '50%',
    width: 42,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)',
  })
