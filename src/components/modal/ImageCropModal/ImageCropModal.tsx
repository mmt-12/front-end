import { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import Cropper, { type Area } from 'react-easy-crop'

import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'
import getCroppedImg from '@/utils/image'
import BottomButton from '../../common/BottomButton'

interface Props {
  imageSrc: string
  onCrop: (_image: File) => void
}

export default function ImageCropModal({ imageSrc, onCrop }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const { closeModal } = useModal()

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

  const handleCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      onCrop(croppedImage)
      closeModal()
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
      <BottomButton label='적용' onClick={handleCrop} />
    </BottomDrawer>
  )
}

const cropperWrapperStyle = css({
  position: 'relative',
  width: '100%',
  height: '400px',
  marginBottom: '8px',
})
