import Emoji from '@/components/common/Emoji'
import Voice from '@/components/common/Voice'
import { css } from '@emotion/react'
import PostContent from '../PostContent/PostContent'
import { Link } from 'react-router-dom'

export interface Props {
  id: string
  images: string[]
  content: string
  author: {
    id: string
    name: string
    imageUrl: string
  }
  createdAt: Date
}

export default function Post(props: Props) {
  return (
    <Link to={`/post/${props.id}`} css={containerStyle}>
      <PostContent {...props} />
      <div css={reactionsStyle} className='no-scrollbar'>
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image2.png' isActive />
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image2.png' isActive />
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image1.png' />
        <Emoji url='/test_images/image2.png' isActive />
        <Emoji url='/test_images/image3.png' amount={5} isActive />
      </div>
      <div css={reactionsStyle} className='no-scrollbar'>
        <Voice url='/test_voices/voice1.mp3' content='하.하.하.하.하.' />
        <Voice url='/test_voices/voice2.mp3' content='뭐라는거야~' />
        <Voice url='/test_voices/voice3.mp3' content='인지용~?' amount={12} />
      </div>
    </Link>
  )
}

const containerStyle = css({
  padding: '12px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const reactionsStyle = css({
  padding: '4px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  overflowX: 'auto',
})
