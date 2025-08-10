import { css } from '@emotion/react'
import Card from '@/components/guest-book/Card'
import GuestBookProfile from '@/components/guest-book/GuestBookProfile'
import { useState } from 'react'
import BadgeList from '@/components/guest-book/BadgeList'
import MbtiChart from '@/components/guest-book/MbtiChart'
import { PROFILE } from '@/mocks/data/guestBook'
import { useUserStore } from '@/store/userStore'
import { useNavigate } from 'react-router-dom'
import useHeader from '@/hooks/useHeader'
import { PenNewSquare, UsersGroupRounded } from '@solar-icons/react'
import { ROUTES } from '@/routes/ROUTES'

export default function GuestBookPage() {
  const [mode, setMode] = useState<'MBTI' | 'MEDALS' | 'GUEST BOOK' | null>(
    null,
  )
  const { birthDate } = useUserStore()
  const navigate = useNavigate()

  const profileData = PROFILE
  const isMyPage = birthDate === profileData.birthday

  useHeader({
    routeName: '방명록',
    leftItem: {
      icon: UsersGroupRounded,
      onClick: () => console.log('Group clicked'),
    },
    rightItem: isMyPage
      ? {
          icon: PenNewSquare,
          onClick: () => navigate(ROUTES.EDIT_PROFILE),
        }
      : undefined,
  })

  return (
    <div css={containerStyle}>
      <Card title='PROFILE'>
        <GuestBookProfile
          achievementId={profileData.achievement.id}
          isMyProfile={isMyPage}
          {...profileData}
        />
      </Card>
      {mode === null ? (
        <>
          <div css={rowStyle}>
            <Card title='MBTI'>
              <div
                onClick={() => setMode('MBTI')}
                style={{ width: '100%', height: '140px' }}
              >
                <MbtiChart />
              </div>
            </Card>
            <Card title='MEDALS'>
              <div onClick={() => setMode('MEDALS')}>
                <BadgeList />
              </div>
            </Card>
          </div>
          <Card title='GUEST BOOK'>
            <p onClick={() => setMode('GUEST BOOK')}>guest book content</p>
          </Card>
        </>
      ) : (
        <Card title={mode} onButtonClick={() => setMode(null)}>
          {mode === 'MEDALS' && <BadgeList isExpanded />}
        </Card>
      )}
    </div>
  )
}

const containerStyle = css({
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
