import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import ImageGrid from '@/components/common/ImageGrid'
import Img from '@/components/common/Img'
import { ROUTES } from '@/routes/ROUTES'
import type { IMemoryInfo } from '@/types/memory'
import MemoryInfo from '../MemoryInfo'

interface Props extends IMemoryInfo {
  isGrid?: boolean
}

export default function MemoryListItem(props: Props) {
  return (
    <Link
      to={ROUTES.MEMORY_DETAIL(props.id)}
      css={containerStyle}
      state={{ memory: props as IMemoryInfo }}
      className='still'
    >
      <MemoryInfo
        {...props}
        description={props.isGrid ? '' : props.description}
      />
      {props.isGrid ? (
        <ImageGrid images={props.pictures} />
      ) : (
        <div css={imagesListStyle}>
          {props.pictures.slice(0, 3).map((image, index) => (
            <Img key={index} src={image} alt={`Memory image ${index + 1}`} />
          ))}
        </div>
      )}
    </Link>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px',
  gap: '4px',
})

const imagesListStyle = css({
  height: 'fit-content',
  margin: '0px 8px',

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
