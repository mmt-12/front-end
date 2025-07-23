import { useEffect, useState } from 'react'
import {
  Map,
  useMap,
  useMapsLibrary,
  type MapCameraChangedEvent,
} from '@vis.gl/react-google-maps'
import Button from '../../Button'
import InputField from '../../InputField'
import { fixedStyle } from '@/styles/absolute'

interface Props {
  onSelect: (_region: string) => void
}

export default function MapLocationSelector({ onSelect }: Props) {
  const map = useMap()
  const placesLib = useMapsLibrary('places')

  const [region, setRegion] = useState('서울')
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    if (!placesLib || !map) return

    // ...
  }, [placesLib, map])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div css={fixedStyle(0)}>
        <InputField onChange={(val: string) => setSearchKey(val)} />
      </div>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lat: 37.5012, lng: 127.0396 }}
        defaultZoom={18}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            'camera changed:',
            ev.detail.center,
            'zoom:',
            ev.detail.zoom,
          )
        }
        disableDefaultUI={true}
      />
      <div css={[fixedStyle(16), { bottom: '16px' }]}>
        <Button
          label={`${region}로 설정`}
          type='secondary'
          onClick={() => onSelect(region)}
        />
      </div>
    </div>
  )
}
