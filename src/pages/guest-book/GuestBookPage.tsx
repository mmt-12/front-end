import { useState } from 'react'
import { css } from '@emotion/react'
import { PenNewSquare, UsersGroupRounded } from '@solar-icons/react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAssociateProfile, useGuestBookList } from '@/api'
import NoContentFallback from '@/components/common/NoContentFallback'
import BadgeList from '@/components/guest-book/BadgeList'
import Card from '@/components/guest-book/Card'
import Comment from '@/components/guest-book/Comment'
import GuestBookBoard from '@/components/guest-book/GuestBookBoard'
import GuestBookBoardSkeleton from '@/components/guest-book/GuestBookBoard/GuestBookBoard.Skeleton'
import GuestBookProfile, {
  GuestBookProfileSkeleton,
} from '@/components/guest-book/GuestBookProfile'
import MbtiChart from '@/components/guest-book/MbtiChart'
import MbtiTest from '@/components/guest-book/MbtiTest'
import WavyButton from '@/components/guest-book/WavyButton'
import useHeader from '@/hooks/useHeader'
import useStardust from '@/hooks/useStardust'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { flipIn, flipOut } from '@/styles/animation'
import { flexGap } from '@/styles/common'

export default function GuestBookPage() {
  useStardust()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'MBTI' | 'MEDALS' | 'GUEST BOOK' | null>(
    null,
  )
  const [isClosing, setIsClosing] = useState(false)
  const { associateId: associateIdParam } = useParams()
  const { communityId, associateId: myId } = useUserStore()

  const associateId =
    associateIdParam === 'me' ? myId : Number(associateIdParam)
  const { data: profile } = useAssociateProfile(communityId, associateId)
  const { data: guestBookList, isLoading: guestBookListLoading } =
    useGuestBookList(
      communityId,
      associateId,
      { size: 4 },
      { enabled: mode === null },
    )

  const comments = guestBookList?.pages.flatMap(page => page.guestBooks) || []

  const isMyPage = myId === associateId

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
            id={associateId}
          />
        ) : (
          <GuestBookProfileSkeleton />
        )}
      </Card>
      {mode === null ? (
        <>
          <div css={rowStyle}>
            <Card
              title='MBTI'
              onClick={() => setMode('MBTI')}
              customCss={{ minHeight: 240 }}
            >
              <MbtiChart communityId={communityId} associateId={associateId} />
            </Card>
            <Card title='MEDALS' onClick={() => setMode('MEDALS')}>
              <BadgeList communityId={communityId} associateId={associateId} />
            </Card>
          </div>
          <Card title='GUEST BOOK'>
            {guestBookListLoading ? (
              <GuestBookBoardSkeleton />
            ) : (
              <div css={[flexGap(12), commentListStyle]}>
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                  ))
                ) : (
                  <NoContentFallback
                    size='block'
                    message='아무도 방명록을 남기지 않았어요. 🥲'
                  />
                )}
              </div>
            )}
            <WavyButton
              label='더보기'
              onClick={() => setMode('GUEST BOOK')}
              customCss={{ marginTop: '12px' }}
            />
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
