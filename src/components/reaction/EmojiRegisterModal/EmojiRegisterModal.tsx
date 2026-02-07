import { useState } from 'react'
import { css } from '@emotion/react'

import { useCreateEmoji } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import ImageInputField from '@/components/common/ImageInputField'
import InputField from '@/components/common/InputField'
import Loader from '@/components/common/Loader'
import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'

export default function EmojiRegisterModal() {
  const [emojiName, setEmojiName] = useState('')
  const [images, setImages] = useState<(File | string)[]>([])

  const { closeModal, alert } = useModal()

  const { mutate, isPending } = useCreateEmoji(1)

  const handleSubmit = () => {
    const emojiImage = images[0]
    if (!emojiImage) return alert('이모지 이미지를 선택해주세요.')
    if (!emojiName) return alert('이모지 이름을 입력해주세요.')

    const formData = new FormData()
    formData.append(
      'data',
      new Blob([JSON.stringify({ name: emojiName })], {
        type: 'application/json',
      }),
    )
    // The image is guaranteed to be a File in this context
    formData.append('emoji', emojiImage as File)

    mutate(formData, {
      onSuccess: async () => {
        await closeModal()
        alert('이모지가 등록되었습니다.')
      },
    })
  }

  return (
    <>
      {isPending && <Loader size='full' />}
      <BottomDrawer>
        <InputField
          label='이름'
          value={emojiName}
          onChange={e => setEmojiName(e.target.value)}
        />
        <div css={imageInputWrapperStyle}>
          <ImageInputField
            images={images}
            onChange={setImages}
            maxLength={1}
            mode='crop'
          />
        </div>
        <BottomButton type='primary' label='등록' onClick={handleSubmit} />
      </BottomDrawer>
    </>
  )
}

const imageInputWrapperStyle = css({
  width: 'calc(100% - 32px)',
  overflow: 'hidden',
  margin: '16px auto',
  button: {
    margin: '16px 0',
  },
  img: {
    borderRadius: '20px',
  },
})
