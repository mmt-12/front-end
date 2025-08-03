import useHeader from '@/hooks/useHeader'
import { PenNewSquare, UsersGroupRounded } from '@solar-icons/react'
import { css } from '@emotion/react'
import Card from '@/components/guest-book/Card'
import { Profile } from '@/mocks/data/guestBook'
import GuestBookProfile from '@/components/guest-book/GuestBookProfile'
import { useUserStore } from '@/store/userStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/routes/ROUTES'

export default function GuestBookPage() {
  const { birthDate } = useUserStore()
  const navigate = useNavigate()

  const profileData = Profile
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
