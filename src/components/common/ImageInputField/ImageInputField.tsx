import { useRef } from 'react'
import { useTheme, type SerializedStyles } from '@emotion/react'
import { GalleryAdd } from '@solar-icons/react'

import Album from '../Album'
import Button from '../Button'

interface Props {
  images: File[]
  maxLength: number
  onChange: (_files: File[]) => void
  customImageCss?: SerializedStyles
}

export default function ImageInputField({
  images,
  onChange,
  maxLength,
  customImageCss,
}: Props) {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Album>
        {images.map((image, index) => (
          <div key={index} css={customImageCss}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Album image ${index}`}
            />
          </div>
        ))}
        <div className='action-wrapper'>
          <Button
            size='lg'
            type='secondary'
            label=''
            icon={<GalleryAdd size={72} weight='Bold' color={theme.sky[600]} />}
            onClick={() => {
              inputRef.current?.click()
            }}
          />
        </div>
      </Album>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        hidden
        multiple
        onChange={e => {
          const files = Array.from(e.target.files || []).slice(0, maxLength)
          onChange(files)
        }}
      />
    </>
  )
}
