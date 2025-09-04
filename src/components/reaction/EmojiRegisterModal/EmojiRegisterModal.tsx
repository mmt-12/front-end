import { useRef, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { GalleryAdd } from '@solar-icons/react'

import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import Button from '@/components/common/Button'
import Img from '@/components/common/Img'
import InputField from '@/components/common/InputField'

export default function EmojiRegisterModal({ closing }: { closing?: boolean }) {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [emojiName, setEmojiName] = useState('')
  const [emojiImage, setEmojiImage] = useState<File | null>(null)

  return (
    <BottomDrawer closing={closing}>
      <InputField
        label='이름'
        value={emojiName}
        onChange={e => setEmojiName(e.target.value)}
      />
      {emojiImage ? (
        <div
          css={imageWrapperStyle}
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          <Img src={URL.createObjectURL(emojiImage)} alt={emojiName} />
        </div>
      ) : (
        <div css={buttonWrapperStyle}>
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
      )}
      <input
        ref={inputRef}
        hidden
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) setEmojiImage(file)
        }}
      />
      <BottomButton
        type='primary'
        label='등록'
        onClick={() => {
          if (emojiName && emojiImage) {
            // Handle emoji registration
          }
        }}
      />
    </BottomDrawer>
  )
}

const imageWrapperStyle = css({
  margin: '16px',

  overflow: 'hidden',
  aspectRatio: '1 / 1',
  borderRadius: '20px',
  img: {
    width: '100%',
    height: '100%',
    display: 'flex',
    objectFit: 'cover',
  },
})

const buttonWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bg,
  })
