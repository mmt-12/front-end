import Button from '@/components/common/Button'
import { theme } from '@/styles/theme'
import { css, type Theme } from '@emotion/react'
import { CloseCircle } from '@solar-icons/react'
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import React, { useEffect } from 'react'

interface Props {
  place: google.maps.places.Place | null
  setSelectedPlace?: (_place: google.maps.places.Place | null) => void
  closeModal: () => void
}

const PlacesMarker = ({ place, setSelectedPlace, closeModal }: Props) => {
  const map = useMap()

  // adjust the viewport of the map when the place is changed
  useEffect(() => {
    if (!map || !place) return
    if (place.viewport) map.fitBounds(place.viewport)
  }, [map, place])

  if (!place) return null
  return (
    <AdvancedMarker position={place.location}>
      <div css={markerStyle}>
        <div css={closeStyle} onClick={() => setSelectedPlace?.(null)}>
          <CloseCircle weight='Bold' size={36} color={theme.white} />
        </div>
        {place.photos?.[0]?.getURI?.() && (
          <img
            src={place.photos[0].getURI()}
            alt={place.displayName as string}
            css={imageStyle}
          />
        )}
        <div css={contentStyle}>
          <h3>{place.displayName}</h3>
          <p>{place.formattedAddress}</p>
          <div css={buttonWrapperStyle}>
            <Button
              type='primary'
              onClick={closeModal}
              label='여기로 설정하기'
              size='md'
            />
          </div>
        </div>
      </div>
    </AdvancedMarker>
  )
}
export default React.memo(PlacesMarker)

const markerStyle = css({
  position: 'absolute',
  width: 'calc(12vw + 220px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  zIndex: 10,
  transform: 'translate(-50%, -100%)',
})

const imageStyle = css({
  width: '100%',
  aspectRatio: '16/9',
  borderRadius: '4px 4px 0 0',
  objectFit: 'cover',
})

const contentStyle = (theme: Theme) =>
  css({
    width: 'calc(100% - 32px)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    h3: {
      width: '100%',
      margin: '0',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    p: {
      margin: '0',
      fontSize: '14px',
      color: theme.stone[500],
    },
  })

const buttonWrapperStyle = css({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  marginTop: '8px',
})

const closeStyle = css({
  position: 'absolute',
  top: '8px',
  right: '8px',
  zIndex: 1001,
})
