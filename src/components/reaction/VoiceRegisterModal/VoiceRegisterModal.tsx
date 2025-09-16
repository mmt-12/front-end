import { useRef, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { CloseCircle, File, Pause, Soundwave } from '@solar-icons/react'

import { useCreateVoice } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'
import useRecord from '@/hooks/useRecord'

export default function VoiceRegisterModal() {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const { isRecording, audio, setAudio, stop, handleRecordClick } = useRecord()

  const audioRef = useRef<HTMLAudioElement>(null)
  const { alert, closeModal, confirm } = useModal()

  const { mutate } = useCreateVoice(1)

  const handleSubmit = () => {
    if (!audio) return alert('오디오 파일을 선택해주세요.')
    if (!name) return alert('이름을 입력해주세요.')

    const formData = new FormData()
    formData.append(
      'data',
      new Blob([JSON.stringify({ name })], {
        type: 'application/json',
      }),
    )
    formData.append('voice', audio)

    mutate(formData, {
      onSuccess: async () => {
        await alert('음성이 등록되었습니다.')
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
      <div css={buttonWrapperStyle}>
        {isRecording ? (
          <Button
            type='secondary'
            label='녹음 중...'
            icon={
              <Pause size={56} weight='Linear' color={theme.colors.sky[500]} />
            }
            customCss={{ borderRadius: 16 }}
            onClick={stop}
          />
        ) : audio ? (
          <div
            css={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <audio
              src={URL.createObjectURL(audio)}
              ref={audioRef}
              controls
              style={{ width: '100%' }}
            />
            <CloseCircle
              weight='Bold'
              size={32}
              color={theme.colors.stone[600]}
              onClick={() => {
                setAudio(null)
              }}
            />
          </div>
        ) : (
          <>
            <Button
              type='secondary'
              label='파일 불러오기'
              icon={
                <File size={56} weight='Linear' color={theme.colors.sky[500]} />
              }
              customCss={{ borderRadius: 16 }}
              onClick={() => {
                inputRef.current?.click()
              }}
            />
            <Button
              type='secondary'
              label='녹음하기'
              icon={
                <Soundwave
                  size={56}
                  weight='Bold'
                  color={theme.colors.sky[500]}
                />
              }
              customCss={{ borderRadius: 16 }}
              onClick={handleRecordClick}
            />
          </>
        )}
      </div>
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
    margin: '24px 18px 12px 18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: theme.colors.bg,
  })
