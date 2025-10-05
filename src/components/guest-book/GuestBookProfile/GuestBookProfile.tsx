import { css, type Theme } from '@emotion/react'
import { GalleryAdd } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import defaultImageUrl from '@/assets/images/mascot/default-profile.png'
import Badge from '@/components/common/Badge'
import Img from '@/components/common/Img'
import WavyBox from '@/components/guest-book/WavyBox'
import { ROUTES } from '@/routes/ROUTES'
import { formatDateString } from '@/utils/date'

interface Props {
  id: number
  nickname: string
  achievementId: number
  imageUrl: string
  introduction: string
  birthday: string
  isMyProfile: boolean
}

export default function GuestBookProfile({
  id,
  nickname,
  achievementId,
  imageUrl,
  introduction,
  birthday,
  isMyProfile,
}: Props) {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(ROUTES.ADD_PROFILE_IMAGE(id))
  }

  return (
    <div css={containerStyle}>
      <div css={imageWrapperStyle}>
        <WavyBox
          strokeColor='white'
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <Img
            src={imageUrl || defaultImageUrl}
            alt={nickname}
            customCss={imageStyle}
          />
        </WavyBox>
        {!isMyProfile && (
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
        <p css={birthdayStyle}>{formatDateString(birthday)}</p>
        {introduction && <p css={introductionStyle}>{introduction}</p>}
      </div>
    </div>
  )
}

const containerStyle = css({
  width: '100%',
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

  [`@media (max-width: 390px)`]: {
    zoom: 0.9,
  },

  [`@media (max-width: 350px)`]: {
    flexDirection: 'column',
    alignItems: 'start',
    gap: 0,
  },
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

  [`@media (max-width: 390px)`]: {
    zoom: 0.9,
  },

  [`@media (max-width: 360px)`]: {
    zoom: 0.8,
  },
})

const buttonStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: theme.colors.stone[700],
    border: 'none',
    borderRadius: '14px',
    padding: '6px 6px 4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: theme.colors.stone[500],
    },
  })

const birthdayStyle = (theme: Theme) =>
  css({
    paddingTop: '6px',
    fontSize: '12px',
    fontWeight: 700,
    color: theme.colors.stone[700],
  })

const introductionStyle = (theme: Theme) =>
  css({
    paddingTop: '16px',
    fontWeight: 700,
    color: theme.colors.stone[700],
    flexGrow: 1,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  })
