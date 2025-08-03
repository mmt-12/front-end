import { css } from '@emotion/react'
import MemoryInfo from '../MemoryInfo'
import type { IMemoryInfo } from '@/types/memory'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/ROUTES'

export default function MemoryListItem(props: IMemoryInfo) {
  return (
    <Link to={ROUTES.MEMORY_DETAIL(props.id)} css={containerStyle}>
      <MemoryInfo {...props} />
      <div css={imagesGridStyle}>
        {props.images?.map((image, index) => (
          <img key={index} src={image} alt={`Memory image ${index + 1}`} />
        ))}
      </div>
    </Link>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px',
  gap: '4px',
})

const imagesGridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '4px',
  img: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    overflow: 'hidden',
    objectPosition: 'center',
  },
})
