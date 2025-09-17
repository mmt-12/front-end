import { useEffect, useState } from 'react'
import {
  AdvancedMarker,
  ControlPosition,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'

import BottomButton from '@/components/common/BottomButton'
import { DEFAULT_LOCATION } from '@/consts/MAP'
import { useModal } from '@/hooks/useModal'
import PlacesMarker from './places/PlacesMarker'
import AutocompleteControl from './places/PlacesSearchControl'

export default function MapLocationSelector() {
  const { closeModal } = useModal()
  const [address, setAddress] = useState('서울')

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null)
  const [selectedPlaceInfo, setSelectedPlaceInfo] =
    useState<google.maps.places.Place | null>(null)

  const [cameraLocation, setCameraLocation] =
    useState<google.maps.LatLng | null>(
      new google.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng),
    )

  const map = useMap()
  const geocodingLib = useMapsLibrary('geocoding')

  useEffect(() => {
    if (!map || !geocodingLib) return
    const geocoder = new geocodingLib.Geocoder()

    geocoder
      .geocode({
        location: cameraLocation,
      })
      .then(res => {
        if (res.results.length > 0) {
          setAddress(res.results[0].formatted_address)
        } else {
          console.error('Geocoding failed: ', res)
          setAddress('주소를 찾을 수 없습니다.')
        }
      })
  }, [address, setAddress, map, geocodingLib, cameraLocation])

  useEffect(() => {
    if (!selectedPlace) return setSelectedPlaceInfo(null)
    selectedPlace
      .fetchFields({
        fields: ['location', 'id', 'photos', 'displayName', 'formattedAddress'],
      })
      .then(v => {
        setSelectedPlaceInfo(v.place)
      })
  }, [selectedPlace])

  const handleCenterChange = () => {
    if (!map) return
    const location = new google.maps.LatLng(
      map.getCenter()?.lat() || DEFAULT_LOCATION.lat,
      map.getCenter()?.lng() || DEFAULT_LOCATION.lng,
    )
    setCameraLocation(location)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Map
        style={{ width: '100%', height: '100%' }}
        mapId={'49ae42fed52588c3'}
        defaultCenter={DEFAULT_LOCATION}
        defaultZoom={18}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onIdle={handleCenterChange}
        clickableIcons={false}
      >
        <AutocompleteControl
          controlPosition={ControlPosition.TOP_LEFT}
          onPlaceSelect={setSelectedPlace}
        />

        <PlacesMarker
          place={selectedPlaceInfo}
          setSelectedPlace={setSelectedPlace}
          closeModal={() => {
            const address =
              selectedPlaceInfo?.displayName ||
              selectedPlaceInfo?.formattedAddress ||
              ''
            closeModal({
              address: address,
              location: {
                latitude:
                  selectedPlaceInfo?.location?.lat() || DEFAULT_LOCATION.lat,
                longitude:
                  selectedPlaceInfo?.location?.lng() || DEFAULT_LOCATION.lng,
              },
              render: () => <span>{address}</span>,
            })
          }}
        />
        {!selectedPlace && (
          <AdvancedMarker
            position={
              cameraLocation ||
              new google.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng)
            }
          />
        )}
      </Map>
      {!selectedPlace && (
        <BottomButton
          label={`${address}`}
          type='secondary'
          onClick={() =>
            closeModal({
              address,
              location: {
                latitude: cameraLocation?.lat() || DEFAULT_LOCATION.lat,
                longitude: cameraLocation?.lng() || DEFAULT_LOCATION.lng,
              },
              render: () => <span>{address}</span>,
            })
          }
        />
      )}
    </div>
  )
}
