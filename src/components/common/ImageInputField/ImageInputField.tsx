import { useRef } from 'react'
import { css, useTheme } from '@emotion/react'
import { CloseCircle, GalleryAdd } from '@solar-icons/react'

import Album from '../Album'
import Button from '../Button'
import Img from '../Img'

interface Props {
  images: File[]
  maxLength: number
  onChange: (_files: File[]) => void
}

export default function ImageInputField({
  images,
  onChange,
  maxLength,
}: Props) {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Album>
        {images.map((image, index) => (
          <div key={index} css={{ position: 'relative' }}>
            <Img
              src={URL.createObjectURL(image)}
              alt={`Album image ${index}`}
            />
            <CloseCircle
              css={deleteButtonStyle}
              weight='Bold'
              size={48}
              color={theme.white}
              onClick={() => {
                if (!confirm('이 이미지를 삭제할까요?')) return
                const newImages = images.filter((_, i) => i !== index)
                onChange(newImages)
              }}
            />
          </div>
        ))}
        {images.length < maxLength && (
          <div className='action-wrapper'>
            <Button
              size='lg'
              type='secondary'
              label=''
              icon={
                <GalleryAdd size={72} weight='Bold' color={theme.sky[600]} />
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
        multiple
        onChange={e => {
          const files = Array.from(e.target.files || [])
          const length = images.length + files.length
          if (length > maxLength) {
            files.splice(0, length - maxLength)
            alert(`최대 ${maxLength}장 씩만 업로드 합시다.`)
          }
          const newFiles = files.concat(images)
          onChange(newFiles)
        }}
      />
    </>
  )
}

const deleteButtonStyle = css({
  position: 'absolute',
  top: 8,
  right: 8,
  cursor: 'pointer',
  zIndex: 12,
  filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))',
})
