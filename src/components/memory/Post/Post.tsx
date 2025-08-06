import Album from '@/components/common/Album/Album'
import { css } from '@emotion/react'

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
      <header css={headerStyle}>
        <img src={author.imageUrl} alt={author.name} />
        <p>{author.name}</p>
        <time dateTime={createdAt.toISOString()}>
          {createdAt.toLocaleString()}
        </time>
      </header>
      <Album images={images} />
      <p>{content}</p>
    </div>
  )
}

const containerStyle = css({
  padding: '12px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const headerStyle = css({
  padding: '0px 12px',

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
    fontSize: '14px',
    marginLeft: 'auto',
  },
})
