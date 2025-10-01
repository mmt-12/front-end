import { css, useTheme, type Theme } from '@emotion/react'
import { MenuDots } from '@solar-icons/react'
import { Link, useParams } from 'react-router-dom'

import type { Post } from '@/api'
import Album from '@/components/common/Album'
import Img from '@/components/common/Img'
import Profile from '@/components/member/Profile'
import PostActionModal from '@/components/modal/PostActionModal'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { slideDown } from '@/styles/animation'
import { formatDateTimeRelative } from '@/utils/date'

interface Props extends Post {
  link?: boolean
}

export default function PostContent({
  id,
  author,
  createdAt,
  pictures,
  content,
  link = false,
}: Props) {
  const memoryId = useParams().memoryId
  const associateId = useUserStore(s => s.associateId)
  const theme = useTheme()
  const { openModal } = useModal()

  if (!memoryId) {
    throw new Error('memoryId is not defined in PostContent')
  }

  const postContent = (
    <>
      <Album>
        {pictures.map((image, index) => (
          <div key={index} css={imageWrapperStyle}>
            <Img src={image} alt={`Album image ${index}`} />
          </div>
        ))}
      </Album>
      <p css={contentStyle}>{content}</p>
    </>
  )

  const handlePostAction = () => {
    openModal(
      <PostActionModal memoryId={Number(memoryId)} postId={id} />,
      slideDown,
    )
  }

  return (
    <div>
      <header css={headerStyle}>
        <Link to={ROUTES.GUEST_BOOK(author.id)} css={profileLinkStyle}>
          <Profile {...author} size='sm' introduction='' />
        </Link>
        <time>{formatDateTimeRelative(new Date(createdAt))}</time>
        {author.id === associateId && (
          <MenuDots
            className='button'
            onClick={handlePostAction}
            weight='Bold'
            size={24}
            color={theme.colors.stone[700]}
            css={postActionStyle}
          />
        )}
      </header>
      {link ? (
        <Link to={ROUTES.POST_DETAIL(memoryId, id)}>{postContent}</Link>
      ) : (
        postContent
      )}
    </div>
  )
}

const headerStyle = (theme: Theme) =>
  css({
    padding: '8px 12px',

    display: 'flex',
    alignItems: 'center',
    gap: 8,
    img: {
      width: '40px',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    h2: {
      margin: 0,
      fontSize: '1.5rem',
    },
    time: {
      fontSize: 14,
      color: theme.colors.stone[500],
      marginRight: 'auto',
    },
  })

const contentStyle = css({
  padding: 16,
  fontSize: 16,
})

const profileLinkStyle = css({
  display: 'flex',
  alignItems: 'center',
})

const postActionStyle = css({
  aspectRatio: '1 / 1',
  padding: 6,
})

const imageWrapperStyle = (theme: Theme) =>
  css({
    position: 'relative',
    width: '100vw',
    maxWidth: theme.maxWidth,
    height: `min(calc(${theme.maxWidth} - 200px), 100vw)`,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    overflow: 'hidden',
    scrollSnapAlign: 'center',
    backgroundColor: theme.colors.stone[150],
  })
