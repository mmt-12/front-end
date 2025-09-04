import { useRef, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { Pen, Soundwave } from '@solar-icons/react'

import BottomButton from '@/components/common/BottomButton'
import BottomDrawer from '@/components/common/BottomDrawer'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'

export default function VoiceRegisterModal({ closing }: { closing?: boolean }) {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [audio, setAudio] = useState<File | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <BottomDrawer closing={closing}>
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
            color={theme.stone[600]}
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
            icon={<Soundwave size={72} weight='Bold' color={theme.sky[600]} />}
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
      <BottomButton
        type='primary'
        label='등록'
        onClick={() => {
          if (name && content && audio) {
            // Handle voice registration
          }
        }}
      />
    </BottomDrawer>
  )
}
const buttonWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bg,
  })
