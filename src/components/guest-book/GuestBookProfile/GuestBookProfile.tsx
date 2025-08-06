import Badge from '@/components/common/Badge'
import WavyBox from '@/components/common/WavyBox'
import { css, type Theme } from '@emotion/react'
import defaultImageUrl from '@/assets/mascot/default-profile.png'
import { formatDate } from '@/utils/date'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/routes/ROUTES'
import { GalleryAdd, PenNewSquare, UsersGroupRounded } from '@solar-icons/react'
import { Profile } from '@/mocks/data/guestBook'
import { useUserStore } from '@/store/userStore'
import useHeader from '@/hooks/useHeader'

export default function GuestBookProfile() {
  const { birthDate } = useUserStore()
  const navigate = useNavigate()

  const profileData = Profile
  const {
    nickname,
    birthday,
    imagePath,
    introduction,
    achievement: { id: achievementId },
  } = profileData
  const isMyPage = birthDate === birthday

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

  const handleButtonClick = () => {
    navigate(ROUTES.ADD_PROFILE_IMAGE)
  }

  return (
    <div css={containerStyle} className='stardust'>
      <div css={imageWrapperStyle}>
        <WavyBox
          strokeColor='white'
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <img
            src={imagePath || defaultImageUrl}
            alt={nickname}
            onError={e => {
              e.currentTarget.src = defaultImageUrl
            }}
            css={imageStyle}
          />
        </WavyBox>
        {!isMyPage && (
          <button css={buttonStyle} onClick={handleButtonClick}>
            <GalleryAdd size={26} color='white' weight='Bold' />
          </button>
        )}
      </div>
      <div css={contentStyle}>
        <div css={headerStyle}>
          <p css={nameStyle}>{nickname}</p>
          {achievementId && <Badge id={achievementId} />}
        </div>
        <p css={birthdayStyle}>{formatDate(birthday)}</p>
        {introduction && <p css={introductionStyle}>{introduction}</p>}
      </div>
    </div>
  )
}

const containerStyle = css({
  padding: '0 4px',
  display: 'inline-flex',
  gap: '18px',
  whiteSpace: 'nowrap',
})

const contentStyle = css({
  padding: '4px 0',
  display: 'flex',
  flexDirection: 'column',
})

const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
})

const nameStyle = css({
  fontSize: '18px',
  fontWeight: 900,
  letterSpacing: '0.12em',
})

const imageWrapperStyle = css({
  position: 'relative',
})

const imageStyle = css({
  width: '115px',
  height: '115px',
  objectFit: 'cover',
  borderRadius: '8px',
})

const buttonStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: theme.stone[700],
    border: 'none',
    borderRadius: '14px',
    padding: '6px 6px 4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: theme.stone[500],
    },
  })

const birthdayStyle = (theme: Theme) =>
  css({
    paddingTop: '6px',
    fontSize: '12px',
    fontWeight: 700,
    color: theme.stone[700],
  })

const introductionStyle = (theme: Theme) =>
  css({
    paddingTop: '16px',
    fontWeight: 700,
    color: theme.stone[700],
    flexGrow: 1,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  })
