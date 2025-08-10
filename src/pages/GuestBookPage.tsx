import { css } from '@emotion/react'
import Card from '@/components/guest-book/Card'
import GuestBookProfile from '@/components/guest-book/GuestBookProfile'
import { useState } from 'react'

export default function GuestBookPage() {
  const [mode, setMode] = useState<'MBTI' | 'MEDALS' | 'GUEST BOOK' | null>(
    null,
  )

  return (
    <div css={containerStyle}>
      <Card title='PROFILE'>
        <GuestBookProfile />
      </Card>
      {mode === null ? (
        <>
          <div css={rowStyle}>
            <Card title='MBTI'>
              <p onClick={() => setMode('MBTI')}>MBTI content</p>
            </Card>
            <Card title='MEDALS'>
              <p onClick={() => setMode('MEDALS')}>medals content</p>
            </Card>
          </div>
          <Card title='GUEST BOOK'>
            <p onClick={() => setMode('GUEST BOOK')}>guest book content</p>
          </Card>
        </>
      ) : (
        <Card title={mode} onButtonClick={() => setMode(null)}>
          <p>확장된 컨텐츠입니다</p>
        </Card>
      )}
    </div>
  )
}

const containerStyle = css({
  height: 'calc(100% - 56px)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignSelf: 'stretch',
})

const rowStyle = css({
  display: 'flex',
  gap: '10px',
})
