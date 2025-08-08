import { css } from '@emotion/react'
import MemoryInfo from '../MemoryInfo'
import type { IMemoryInfo } from '@/types/memory'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/ROUTES'

interface Props extends IMemoryInfo {
  isGrid?: boolean
}

export default function MemoryListItem(props: Props) {
  return (
    <Link
      to={ROUTES.MEMORY_DETAIL(props.id)}
      css={containerStyle(props.isGrid)}
    >
      <MemoryInfo
        {...props}
        description={props.isGrid ? '' : props.description}
      />
      {props.isGrid ? (
        <div css={imagesGridStyle}>
          {props.images?.map((image, index) => (
            <img key={index} src={image} alt={`Memory image ${index + 1}`} />
          ))}
        </div>
      ) : (
        <div css={imagesListStyle}>
          {props.images?.slice(0, 3).map((image, index) => (
            <img key={index} src={image} alt={`Memory image ${index + 1}`} />
          ))}
        </div>
      )}
    </Link>
  )
}

const containerStyle = (isGrid: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: isGrid ? '8px 4px' : '16px',
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

const imagesListStyle = css({
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  borderRadius: '20px',
  overflow: 'hidden',
  img: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    overflow: 'hidden',
    objectPosition: 'center',
  },
})
