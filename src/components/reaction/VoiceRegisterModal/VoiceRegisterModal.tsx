import { useRef, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { Pen, Soundwave } from '@solar-icons/react'

import { useCreateVoice } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'

export default function VoiceRegisterModal() {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [audio, setAudio] = useState<File | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const { closeModal } = useModal()

  const { mutate } = useCreateVoice(1)

  const handleSubmit = () => {
    if (!audio) return alert('오디오 파일을 선택해주세요.')
    if (!name) return alert('이름을 입력해주세요.')
    if (!content) return alert('설명을 입력해주세요.')

    const formData = new FormData()
    formData.append(
      'data',
      new Blob([JSON.stringify({ name, content })], {
        type: 'application/json',
      }),
    )
    formData.append('voice', audio)

    mutate(formData, {
      onSuccess: () => {
        alert('음성이 등록되었습니다.')
        closeModal()
      },
    })
  }

  return (
    <BottomDrawer>
      <InputField
        label='이름'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <InputField
        label='설명'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {audio ? (
        <div
          css={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <audio src={URL.createObjectURL(audio)} ref={audioRef} controls />
          <Pen
            weight='Bold'
            size={24}
            color={theme.colors.stone[600]}
            onClick={() => {
              inputRef.current?.click()
            }}
          />
        </div>
      ) : (
        <div css={buttonWrapperStyle}>
          <Button
            size='lg'
            type='secondary'
            label=''
            icon={
              <Soundwave
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
        accept='audio/*'
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) {
            setAudio(file)
          }
        }}
      />
      <BottomButton type='primary' label='등록' onClick={handleSubmit} />
    </BottomDrawer>
  )
}
const buttonWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
  })
