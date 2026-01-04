import { useRef } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { GalleryAdd } from '@solar-icons/react'
import imageCompression from 'browser-image-compression'

import { useModal } from '@/hooks/useModal'
import ImageCropModal from '../../modal/ImageCropModal'
import Album from '../Album'
import Button from '../Button'
import ImagePreview from './ImagePreview'

interface Props {
  images: (File | string)[]
  maxLength: number
  onChange: (_images: (File | string)[]) => void
  mode?: 'default' | 'crop'
}

export default function ImageInputField({
  images,
  onChange,
  maxLength,
  mode = 'default',
}: Props) {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const { alert, confirm, openModal } = useModal()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    try {
      const compressedFiles = await Promise.all(
        files.map(file => {
          if (file.type === 'image/gif') {
            return file
          }
          return imageCompression(file, {
            maxSizeMB: 2,
            useWebWorker: true,
          })
        }),
      )

      const newFiles = [...images, ...compressedFiles]
      if (newFiles.length > maxLength) {
        alert(`최대 ${maxLength}장까지만 업로드할 수 있습니다.`)
        // Remove oldest images if exceeding maxLength
        onChange(newFiles.slice(newFiles.length - maxLength))
      } else {
        onChange(newFiles)
      }
    } catch (error) {
      console.error('이미지 처리 중 오류 발생:', error)
      alert('이미지를 처리하는 중 오류가 발생했습니다.')
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleCrop = (image: File | string, index: number) => {
    const imageSrc =
      typeof image === 'string' ? image : URL.createObjectURL(image)
    const imageType = image instanceof File ? image.type : 'image/jpeg'

    openModal(
      <ImageCropModal
        imageSrc={imageSrc}
        imageType={imageType}
        onCrop={croppedImage => {
          const newImages = [...images]
          newImages[index] = croppedImage
          onChange(newImages)
        }}
      />,
    )
  }

  const handleDelete = async (index: number) => {
    if (!(await confirm('이 이미지를 삭제할까요?'))) return
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <>
      <Album>
        {images.map((image, index) => (
          <ImagePreview
            key={index}
            image={image}
            showCropButton={mode === 'crop'}
            showDeleteButton
            onCrop={() => handleCrop(image, index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
        {images.length < maxLength && (
          <div className='action-wrapper' css={imageWrapperStyle}>
            <Button
              size='lg'
              type='secondary'
              label=''
              icon={
                <GalleryAdd
                  size={72}
                  weight='Bold'
                  color={theme.colors.sky[600]}
                />
              }
              onClick={() => {
                inputRef.current?.click()
              }}
            />
          </div>
        )}
      </Album>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        hidden
        multiple={maxLength !== 1}
        onChange={handleFileChange}
      />
    </>
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
