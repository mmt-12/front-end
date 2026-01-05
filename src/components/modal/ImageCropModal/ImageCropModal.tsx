import { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import Cropper, { type Area } from 'react-easy-crop'

import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'
import getCroppedImg, { getCroppedGif } from '@/utils/image'
import BottomButton from '../../common/BottomButton'

interface Props {
  imageSrc: string
  imageType: string
  onCrop: (_image: File) => void
}

export default function ImageCropModal({ imageSrc, imageType, onCrop }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { closeModal } = useModal()

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

  const handleCrop = async () => {
    if (imageSrc && croppedAreaPixels && !isProcessing) {
      try {
        setIsProcessing(true)
        const croppedImage =
          imageType === 'image/gif'
            ? await getCroppedGif(imageSrc, croppedAreaPixels)
            : await getCroppedImg(imageSrc, croppedAreaPixels)
        onCrop(croppedImage)
        closeModal()
      } catch (e) {
        console.error('Failed to crop image', e)
        setIsProcessing(false)
      }
    }
  }

  return (
    <BottomDrawer>
      <div css={cropperWrapperStyle}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <BottomButton
        label={isProcessing ? '처리 중...' : '적용'}
        onClick={handleCrop}
        type={isProcessing ? 'disabled' : 'primary'}
      />
    </BottomDrawer>
  )
}

const cropperWrapperStyle = css({
  position: 'relative',
  width: '100%',
  height: '400px',
  marginBottom: '8px',
})
