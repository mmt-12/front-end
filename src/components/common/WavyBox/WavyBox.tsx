import { css, type SerializedStyles } from '@emotion/react'

interface Props {
  strokeColor: string
  strokeWidth: number
  backgroundColor?: string
  borderRadius?: number
  customCss?: SerializedStyles
  children: React.ReactNode
}

export default function WavyBox({
  strokeColor,
  strokeWidth,
  backgroundColor = 'none',
  borderRadius = 0,
  children,
  customCss,
}: Props) {
  return (
    <div css={containerStyle}>
      <svg width='0' height='0'>
        <filter id='wavy-border'>
          <feTurbulence
            type='turbulence'
            baseFrequency='0.15'
            numOctaves='2'
            seed='1'
            stitchTiles='stitch'
          />
          <feDisplacementMap
            in='SourceGraphic'
            in2='turbulence'
            scale={strokeWidth}
          />
        </filter>
      </svg>
      <div css={[{ zIndex: 1 }, customCss]}>{children}</div>
      <svg css={borderOverlayStyle} overflow='visible'>
        <rect
          x='0'
          y='0'
          width='100%'
          height='100%'
          fill={backgroundColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          rx={borderRadius}
          ry={borderRadius}
        />
      </svg>
    </div>
  )
}

const containerStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
})

const borderOverlayStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  filter: 'url(#wavy-border)',
})
