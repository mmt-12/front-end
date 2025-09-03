import { css, type Theme } from '@emotion/react'
import { Link } from 'react-router-dom'

import type { Post } from '@/api'
import Album from '@/components/common/Album'
import Img from '@/components/common/Img'
import Profile from '@/components/common/Profile'
import { ROUTES } from '@/routes/ROUTES'
import { formatDateTime } from '@/utils/date'

export default function PostContent({
  id,
  author,
  createdAt,
  pictures,
  content,
}: Post) {
  return (
    <div>
      <header css={headerStyle}>
        <Link to={ROUTES.GUEST_BOOK(author.id)} css={profileLinkStyle}>
          <Profile {...author} size='sm' introduction='' />
        </Link>
        <time>{formatDateTime(new Date(createdAt))}</time>
      </header>
      <Link to={ROUTES.POST_DETAIL(id)}>
        <Album>
          {pictures.map((image, index) => (
            <div key={index}>
              <Img src={image} alt={`Album image ${index}`} />
            </div>
          ))}
        </Album>
        <p css={contentStyle}>{content}</p>
      </Link>
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
      color: theme.stone[500],
      marginLeft: 'auto',
    },
  })

const contentStyle = css({
  padding: '4px 16px',
  fontSize: '16px',
})

const profileLinkStyle = css({
  display: 'flex',
  alignItems: 'center',
})
