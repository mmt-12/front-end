import Album from '@/components/common/Album/Album'
import Voice from '@/components/common/Voice'
import { formatDateTime } from '@/utils/date'
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
      <div css={reactionsStyle} className='no-scrollbar'>
        <Voice url='/test_voices/voice1.mp3' content='하.하.하.하.하.' />
        <Voice url='/test_voices/voice2.mp3' content='뭐라는거야~' />
        <Voice url='/test_voices/voice3.mp3' content='인지용~?' amount={12} />
      </div>
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
  padding: '4px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  overflowX: 'auto',
})
