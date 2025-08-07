import Album from '@/components/common/Album'
import Profile from '@/components/common/Profile'
import { formatDateTime } from '@/utils/date'
import { css, type Theme } from '@emotion/react'
import { Link } from 'react-router-dom'

export interface Props {
  author: {
    id: string | number
    name: string
    imageUrl: string
  }
  createdAt: Date
  images: string[]
  content: string
}

export default function PostContent({
  author,
  createdAt,
  images,
  content,
}: Props) {
  return (
    <div>
      <header css={headerStyle}>
        <Link to={`/guest-book/${author.id}`}>
          <Profile name={author.name} imageUrl={author.imageUrl} size='sm' />
        </Link>
        <time>{formatDateTime(createdAt)}</time>
      </header>
      <Album images={images} />
      <p css={contentStyle}>{content}</p>
    </div>
  )
}

const headerStyle = (theme: Theme) =>
  css({
    padding: '6px 12px',

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
