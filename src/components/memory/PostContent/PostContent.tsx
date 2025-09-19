import { css, type Theme } from '@emotion/react'
import { Link, useParams } from 'react-router-dom'

import type { Post } from '@/api'
import Album from '@/components/common/Album'
import Img from '@/components/common/Img'
import Profile from '@/components/member/Profile'
import { ROUTES } from '@/routes/ROUTES'
import { formatDateTime } from '@/utils/date'

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

  return (
    <div>
      <header css={headerStyle}>
        <Link to={ROUTES.GUEST_BOOK(author.id)} css={profileLinkStyle}>
          <Profile {...author} size='sm' introduction='' />
        </Link>
        <time>{formatDateTime(new Date(createdAt))}</time>
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
    gap: '1rem',
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
      fontSize: '15px',
      color: theme.colors.stone[500],
      marginLeft: 'auto',
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

const imageWrapperStyle = (theme: Theme) =>
  css({
    position: 'relative',
    width: '100vw',
    maxWidth: theme.maxWidth,
    maxHeight: `min(calc(${theme.maxWidth} - 200px), 100vw)`,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    overflow: 'hidden',
    scrollSnapAlign: 'center',
    backgroundColor: theme.colors.stone[150],
  })
