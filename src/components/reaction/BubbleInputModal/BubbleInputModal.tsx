import { useRef } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { CloseCircle, Pause, Soundwave } from '@solar-icons/react'
import { useParams } from 'react-router-dom'

import { useCreateBubbleComment, useCreateGuestBookBubble } from '@/api'
import BottomButton from '@/components/common/BottomButton'
import Button from '@/components/common/Button'
import BottomDrawer from '@/components/modal/BottomDrawer'
import { useModal } from '@/hooks/useModal'
import useRecord from '@/hooks/useRecord'
import { useUserStore } from '@/store/userStore'

export default function BubbleInputModal() {
  const theme = useTheme()
  const { isRecording, audio, setAudio, stop, handleRecordClick } = useRecord()

  const audioRef = useRef<HTMLAudioElement>(null)

  const { alert, closeModal } = useModal()
  const { communityId } = useUserStore()
  const { memoryId, postId, associateId } = useParams()

  const { mutate: createBubbleComment } = useCreateBubbleComment(
    communityId,
    Number(memoryId),
    Number(postId),
  )
  const { mutate: createGuestBookBubble } = useCreateGuestBookBubble(
    communityId,
    Number(associateId),
  )

  const onSuccess = async () => {
    await closeModal()
    alert('등록되었습니다.')
  }

  const handleSubmit = () => {
    if (!audio) return alert('음성을 녹음해주세요.')

    const formData = new FormData()
    formData.append('voice', audio)

    if (postId) {
      createBubbleComment(formData, {
        onSuccess,
      })
    } else if (associateId) {
      createGuestBookBubble(formData, {
        onSuccess,
      })
    } else {
      alert('잘못된 접근입니다.')
    }
  }

  return (
    <BottomDrawer>
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
          <CloseCircle
            weight='Bold'
            size={24}
            color={theme.colors.stone[600]}
            onClick={() => {
              setAudio(null)
            }}
          />
        </div>
      ) : (
        <div css={buttonWrapperStyle}>
          {isRecording ? (
            <Button
              size='lg'
              type='secondary'
              label=''
              icon={
                <Pause
                  size={72}
                  weight='Bold'
                  color={theme.colors.stone[600]}
                />
              }
              onClick={() => stop()}
            />
          ) : (
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
              onClick={handleRecordClick}
            />
          )}
        </div>
      )}
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
