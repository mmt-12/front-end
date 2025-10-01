import { useCallback } from 'react'
import { css, type Theme } from '@emotion/react'
import { AdvancedMarker } from '@vis.gl/react-google-maps'

import pinSrc from '@/assets/images/icons/pin.svg'
import Img from '@/components/common/Img'
import type { IMemoryInfo } from '@/types/memory'

interface Props {
  memory: IMemoryInfo
  setMarkerRef: (
    _marker: google.maps.marker.AdvancedMarkerElement,
    _key: number,
  ) => void
  onClick: (_e: React.MouseEvent, _memory: IMemoryInfo) => void
  isSelected?: boolean
}

export default function MemoryMarker({
  memory,
  setMarkerRef,
  onClick,
  isSelected,
}: Props) {
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, memory.id),
    [setMarkerRef, memory.id],
  )
  return (
    <AdvancedMarker
      key={memory.id}
      position={{
        lat: memory.location.latitude,
        lng: memory.location.longitude,
      }}
      ref={ref}
    >
      {isSelected ? (
        <div>
          <Img src={pinSrc} alt='' width={64} />
        </div>
      ) : (
        <div css={markerImageWrapper} onClick={e => onClick(e, memory)}>
          <Img src={memory.pictures[0]} alt='' />
        </div>
      )}
    </AdvancedMarker>
  )
}

const markerImageWrapper = (theme: Theme) =>
  css({
    width: '48px',
    height: '48px',

    border: `1px solid ${theme.colors.white}`,
    borderRadius: '50%',
    boxShadow: theme.shadow,
    overflow: 'hidden',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  })
