import { Children, useState } from 'react'
import { css, type Theme } from '@emotion/react'

import Sentinel from '../Sentinel'

export interface Props {
  children: React.ReactNode
}

export default function Album({ children }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div key={children?.toString()} css={contianerStyle}>
      <div css={albumContainerStyle} className='no-scrollbar'>
        {Children.map(children, (child, index) => (
          <>
            {child}
            <Sentinel
              horizontal
              onVisible={() => {
                setCurrentIndex(index)
              }}
            />
          </>
        ))}
      </div>
      <div css={dotContainerStyle}>
        {Children.map(children, (_, index) => (
          <div
            css={dotStyle}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  )
}

const contianerStyle = (theme: Theme) =>
  css({
    width: '100%',
    maxWidth: theme.maxWidth,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })

const albumContainerStyle = (theme: Theme) =>
  css({
    width: '100%',
    maxWidth: theme.maxWidth,

    display: 'flex',
    gap: '4px',

    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
    'div.action-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.bg,
    },
    img: {
      width: '100%',
      objectFit: 'cover',
    },
  })

const dotContainerStyle = css({
  padding: '12px 0px',
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
})

const dotStyle = (theme: Theme) =>
  css({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: theme.colors.stone[300],
    transition: 'background-color 0.3s ease',

    '&.active': {
      backgroundColor: theme.colors.stone[900],
    },
  })
