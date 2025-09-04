import { lazy, useState } from 'react'
import { css } from '@emotion/react'
import { PenNewSquare, UsersGroupRounded } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import { useAssociateProfile } from '@/api'
import BadgeList from '@/components/guest-book/BadgeList'
import Card from '@/components/guest-book/Card'
import GuestBookProfile from '@/components/guest-book/GuestBookProfile'
import MbtiTest from '@/components/guest-book/MbtiTest'
import useHeader from '@/hooks/useHeader'
import useStardust from '@/hooks/useStardust'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

const MbtiChart = lazy(() => import('@/components/guest-book/MbtiChart'))

export default function GuestBookPage() {
  useStardust()
  const [mode, setMode] = useState<'MBTI' | 'MEDALS' | 'GUEST BOOK' | null>(
    null,
  )
  const { birthDate } = useUserStore()
  const navigate = useNavigate()

  const userId = 1
  const { data: profile } = useAssociateProfile(1, userId)

  const isMyPage = birthDate === profile?.birthday

  useHeader({
    routeName: '방명록',
    leftItem: {
      icon: UsersGroupRounded,
      onClick: () => navigate(ROUTES.MEMBER_LIST),
    },
    rightItem: isMyPage
      ? {
          icon: PenNewSquare,
          onClick: () => navigate(ROUTES.EDIT_PROFILE),
        }
      : undefined,
  })

  if (!profile) return null

  return (
    <div css={containerStyle}>
      <Card title='PROFILE'>
        <GuestBookProfile
          achievementId={profile.achievement?.id}
          isMyProfile={isMyPage}
          {...profile}
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
          {mode === 'MBTI' && (
            <MbtiTest isMyPage={isMyPage} name={profile.nickname} />
          )}
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
