import Album from '@/components/common/Album/Album'
import { formatDate, formatDateTime } from '@/utils/date'
import { css, type Theme } from '@emotion/react'

export interface Props {
  images: string[]
  content: string
  author: {
    name: string
    imageUrl: string
  }
  createdAt: Date
}

export default function Post({ images, content, author, createdAt }: Props) {
  return (
    <div css={containerStyle}>
      <div>
        <header css={headerStyle}>
          <img src={author.imageUrl} alt={author.name} />
          <p>{author.name}</p>
          <time>{formatDateTime(createdAt)}</time>
        </header>
        <Album images={images} />
        <p css={contentStyle}>{content}</p>
      </div>
      <div css={reactionsStyle}></div>
    </div>
  )
}

const containerStyle = css({
  padding: '12px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

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

const reactionsStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})
