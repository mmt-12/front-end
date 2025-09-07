import { lazy, useState } from 'react'
import { css, keyframes } from '@emotion/react'
import { PenNewSquare, UsersGroupRounded } from '@solar-icons/react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAssociateProfile, useGuestBookList } from '@/api'
import { Skeleton } from '@/components/common/Skeleton'
import BadgeList from '@/components/guest-book/BadgeList'
import Card from '@/components/guest-book/Card'
import Comment from '@/components/guest-book/Comment'
import GuestBookBoard from '@/components/guest-book/GuestBookBoard'
import GuestBookProfile, {
  GuestBookProfileSkeleton,
} from '@/components/guest-book/GuestBookProfile'
import MbtiTest from '@/components/guest-book/MbtiTest'
import WavyButton from '@/components/guest-book/WavyButton'
import useHeader from '@/hooks/useHeader'
import useStardust from '@/hooks/useStardust'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { flexGap } from '@/styles/common'

const MbtiChart = lazy(() => import('@/components/guest-book/MbtiChart'))

export default function GuestBookPage() {
  useStardust()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'MBTI' | 'MEDALS' | 'GUEST BOOK' | null>(
    null,
  )
  const [isClosing, setIsClosing] = useState(false)
  const { id } = useParams()
  const { birthDate, communityId } = useUserStore()

  const associateId = Number(id)
  const { data: profile } = useAssociateProfile(communityId, associateId)
  const { data: guestBookList, isLoading } = useGuestBookList(
    communityId,
    associateId,
  )

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

  return (
    <div css={containerStyle}>
      <Card title='PROFILE'>
        {profile ? (
          <GuestBookProfile
            achievementId={profile.achievement?.id}
            isMyProfile={isMyPage}
            {...profile}
          />
        ) : (
          <GuestBookProfileSkeleton />
        )}
      </Card>
      {mode === null ? (
        <>
          <div css={rowStyle}>
            <Card title='MBTI'>
              <div
                onClick={() => setMode('MBTI')}
                style={{ width: '100%', height: '140px' }}
              >
                <MbtiChart
                  communityId={communityId}
                  associateId={associateId}
                />
              </div>
            </Card>
            <Card title='MEDALS'>
              <div onClick={() => setMode('MEDALS')}>
                <BadgeList
                  communityId={communityId}
                  associateId={associateId}
                />
              </div>
            </Card>
          </div>
          <Card title='GUEST BOOK'>
            <div css={[flexGap(12), commentListStyle]}>
              {isLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        width='100%'
                        height={37}
                        radius={4}
                      />
                    ))}
                  <Skeleton width={65} height={32} radius={2} />
                </>
              ) : (
                <>
                  {guestBookList?.pages[0].guestBooks
                    .slice(0, 4)
                    .map(comment => (
                      <Comment key={comment.id} {...comment} />
                    ))}
                  <WavyButton
                    label='더보기'
                    onClick={() => setMode('GUEST BOOK')}
                  />
                </>
              )}
            </div>
          </Card>
        </>
      ) : (
        <div css={flipContainerStyle}>
          <div css={flipCardStyle(isClosing)}>
            <div css={[flipFaceStyle, flipBackStyle]}>
              <Card
                title={mode}
                onButtonClick={() => {
                  setIsClosing(true)
                  setTimeout(() => {
                    setMode(null)
                    setIsClosing(false)
                  }, 160)
                }}
              >
                {mode === 'MEDALS' && (
                  <BadgeList
                    communityId={communityId}
                    associateId={associateId}
                    isExpanded
                  />
                )}
                {mode === 'MBTI' && profile && (
                  <MbtiTest
                    isMyPage={isMyPage}
                    name={profile.nickname}
                    communityId={communityId}
                    associateId={associateId}
                  />
                )}
                {mode === 'GUEST BOOK' && profile && (
                  <GuestBookBoard
                    communityId={communityId}
                    associateId={associateId}
                  />
                )}
              </Card>
            </div>
          </div>
        </div>
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

const flipIn = keyframes({
  from: { transform: 'perspective(1000px) rotateY(90deg)', opacity: 0 },
  to: { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
})

const flipOut = keyframes({
  from: { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
  to: { transform: 'perspective(1000px) rotateY(90deg)', opacity: 0 },
})

const flipContainerStyle = css({
  perspective: '1000px',
})

const flipCardStyle = (isClosing: boolean) =>
  css({
    position: 'relative',
    transformStyle: 'preserve-3d',
    // isClosing에 따라 animation-name을 바꿔 "재시작"을 유도
    animation: `${isClosing ? flipOut : flipIn} 260ms cubic-bezier(0.22, 1, 0.36, 1) both`,
    willChange: 'transform, opacity',
  })

const flipFaceStyle = css({
  backfaceVisibility: 'hidden',
})

const flipBackStyle = css({
  transform: 'rotateY(0deg)',
})

const commentListStyle = css({
  width: '100%',
  alignItems: 'center',
})
