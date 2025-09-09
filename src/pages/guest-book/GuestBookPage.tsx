import { lazy, useState } from 'react'
import { css } from '@emotion/react'
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
import { flipIn, flipOut } from '@/styles/animation'
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
  const { birthDate, communityId, associateId: myId } = useUserStore()

  const associateId = Number(id)
  const { data: profile } = useAssociateProfile(communityId, associateId)
  const { data: guestBookList, isLoading } = useGuestBookList(
    communityId,
    associateId,
    { size: 4 },
  )

  const isMyPage = birthDate === profile?.birthday && myId === associateId

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
                        height={32}
                        radius={8}
                      />
                    ))}
                </>
              ) : (
                <>
                  {guestBookList?.pages[0].guestBooks.map(comment => (
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

const flipContainerStyle = css({
  perspective: '1000px',
})

const flipCardStyle = (isClosing: boolean) =>
  css({
    position: 'relative',
    transformStyle: 'preserve-3d',
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
