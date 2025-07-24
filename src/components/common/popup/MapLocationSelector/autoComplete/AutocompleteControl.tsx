import React from 'react'
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps'
import { AutocompleteCustom } from './AutocompleteCustom'

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition
  onPlaceSelect: (_place: google.maps.places.Place | null) => void
}

const AutocompleteControl = ({
  controlPosition,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  return (
    <MapControl position={controlPosition}>
      <AutocompleteCustom onPlaceSelect={onPlaceSelect} />
    </MapControl>
  )
}

export default React.memo(AutocompleteControl)
