import { useRef, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { GalleryAdd } from '@solar-icons/react'

import { useCreateEmoji } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import Button from '@/components/common/Button'
import Img from '@/components/common/Img'
import InputField from '@/components/common/InputField'
import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'

export default function EmojiRegisterModal() {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [emojiName, setEmojiName] = useState('')
  const [emojiImage, setEmojiImage] = useState<File | null>(null)

  const { closeModal, alert } = useModal()

  const { mutate } = useCreateEmoji(1)

  const handleSubmit = () => {
    if (!emojiImage) return alert('이모지 이미지를 선택해주세요.')
    if (!emojiName) return alert('이모지 이름을 입력해주세요.')

    const formData = new FormData()
    formData.append(
      'data',
      new Blob([JSON.stringify({ name: emojiName })], {
        type: 'application/json',
      }),
    )
    formData.append('emoji', emojiImage)

    mutate(formData, {
      onSuccess: () => {
        alert('이모지가 등록되었습니다.')
        closeModal()
      },
    })
  }

  return (
    <BottomDrawer>
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
      <BottomButton type='primary' label='등록' onClick={handleSubmit} />
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
    backgroundColor: theme.colors.bg,
  })
