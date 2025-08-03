import Badge from '@/components/common/Badge'
import WavyBox from '@/components/common/WavyBox'
import { css, type Theme } from '@emotion/react'
import defaultImageUrl from '@/assets/mascot/default-profile.png'
import { formatDate } from '@/utils/date'

interface Props {
  nickname: string
  achievementId: number
  imagePath: string
  introduction: string
  birthday: string
}

export default function GuestBookProfile({
  nickname,
  achievementId,
  imagePath,
  introduction,
  birthday,
}: Props) {
  return (
    <div css={containerStyle}>
      <WavyBox
        strokeColor='white'
        strokeWidth={8}
        borderRadius={8}
        childrenOnTop={false}
      >
        <img
          src={imagePath ? imagePath : defaultImageUrl}
          alt={nickname}
          onError={e => {
            e.currentTarget.src = defaultImageUrl
          }}
          css={imageStyle}
        />
      </WavyBox>
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
  gap: '16px',
  fontFamily: 'PFStardust',
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
  gap: '12px',
})

const nameStyle = css({
  fontSize: '18px',
  fontWeight: 900,
  letterSpacing: '0.12em',
})

const imageStyle = css({
  width: '115px',
  height: '115px',
  objectFit: 'cover',
  borderRadius: '8px',
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
