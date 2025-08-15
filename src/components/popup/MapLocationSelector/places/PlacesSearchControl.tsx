import { ControlPosition, MapControl } from '@vis.gl/react-google-maps'
import { PlacesSearchBar } from './PlacesSearchBar'
import { memo } from 'react'

type Props = {
  controlPosition: ControlPosition
  onPlaceSelect: (_place: google.maps.places.Place | null) => void
}

const PlacesSearchControl = ({ controlPosition, onPlaceSelect }: Props) => {
  return (
    <MapControl position={controlPosition}>
      <PlacesSearchBar onPlaceSelect={onPlaceSelect} />
    </MapControl>
  )
}

export default memo(PlacesSearchControl)
