import { css } from '@emotion/react'
import Card from '@/components/guest-book/Card'
import GuestBookProfile from '@/components/guest-book/GuestBookProfile'

export default function GuestBookPage() {
  return (
    <div css={containerStyle}>
      <Card title='PROFILE'>
        <GuestBookProfile />
      </Card>
      <div css={rowStyle}>
        <Card title='MBTI'>
          <p>MBTI content</p>
        </Card>
        <Card title='MEDALS'>
          <p>medals content</p>
        </Card>
      </div>
      <Card title='GUEST BOOK'>
        <p>guest book content</p>
      </Card>
    </div>
  )
}

const containerStyle = css({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const rowStyle = css({
  display: 'flex',
  gap: '10px',
})
