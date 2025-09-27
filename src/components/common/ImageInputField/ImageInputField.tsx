import { useRef } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { CloseCircle, GalleryAdd } from '@solar-icons/react'

import { useModal } from '@/hooks/useModal'
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
  const { alert, confirm } = useModal()

  return (
    <>
      <Album>
        {images.map((image, index) => (
          <div key={index} css={imageWrapperStyle}>
            <Img
              src={URL.createObjectURL(image)}
              alt={`Album image ${index}`}
            />
            <CloseCircle
              css={deleteButtonStyle}
              weight='Bold'
              size={48}
              color={theme.colors.white}
              onClick={async () => {
                if (!(await confirm('이 이미지를 삭제할까요?'))) return
                const newImages = images.filter((_, i) => i !== index)
                onChange(newImages)
              }}
            />
          </div>
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
        multiple
        onChange={async e => {
          const files = Array.from(e.target.files || [])
          const length = images.length + files.length
          // const compressedFiles = await Promise.all(
          //   files.map(file => compressImage(file)),
          // )
          // const newFiles = compressedFiles.concat(images)
          const newFiles = files.concat(images)
          if (length > maxLength) {
            newFiles.splice(0, length - maxLength)
            alert(`최대 ${maxLength}장 씩만 업로드 합시다.`)
          }
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

const imageWrapperStyle = (theme: Theme) =>
  css({
    position: 'relative',
    width: '100vw',
    maxWidth: theme.maxWidth,
    height: `min(calc(${theme.maxWidth} - 200px), 100vw)`,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    overflow: 'hidden',
    scrollSnapAlign: 'center',
    backgroundColor: theme.colors.stone[150],
  })
