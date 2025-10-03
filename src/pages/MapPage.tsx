import { useCallback, useEffect, useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import {
  Cluster,
  MarkerClusterer,
  type Marker,
} from '@googlemaps/markerclusterer'
import { Map, useMap } from '@vis.gl/react-google-maps'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'

import { useAchieve, useMemoryList } from '@/api'
import Img from '@/components/common/Img'
import MemoryInfo from '@/components/memory/MemoryInfo'
import ClusteredMarker from '@/components/memoryMap/ClusteredMarker/ClusteredMarker'
import MemoryMarker from '@/components/memoryMap/MemoryMarker/MemoryMarker'
import useHeader from '@/hooks/useHeader'
import { ROUTES } from '@/routes/ROUTES'
import { withSafeAreaBottom } from '@/styles/common'
import type { IMemoryInfo } from '@/types/memory'
import { getDistanceBetween } from '@/utils/map'

// 우리나라 중심
const DEFAULT_LOCATION = {
  lat: 35.66876997005372,
  lng: 127.85464134447048,
}

const DEFAULT_ZOOM = 7.2

export default function MapPage() {
  useHeader({
    routeName: '지도',
    leftItem: {
      icon: null,
    },
  })

  const { mutate: achieve } = useAchieve()
  const { data } = useMemoryList(1, { size: 100 })
  const memories = data?.pages.flatMap(page => page.memories) || []
  const [selectedMemory, setSelectedMemory] = useState<IMemoryInfo>()
  const [markers, setMarkers] = useState<{ [key: number]: Marker }>({})
  const [center, setCenter] = useState<google.maps.LatLng>()
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM)

  const map = useMap()
  const clusterer = useMemo(() => {
    if (!map) return null

    return new MarkerClusterer({
      map,
      renderer: {
        render: cluster => {
          const markers = cluster.markers
          const count = markers.length
          const position = cluster.position
          return new google.maps.marker.AdvancedMarkerElement({
            position,
            content: (() => {
              const container = document.createElement('div')
              const root = createRoot(container)
              root.render(<ClusteredMarker count={count} />)
              return container
            })(),
          })
        },
      },
      onClusterClick: (_, cluster: Cluster, map) => {
        const position = cluster.position
        if (!position || !center) return

        map.panTo(position)
        let distance = getDistanceBetween(center, position)
        const zoom = map.getZoom() || 6
        distance *= (zoom * zoom) / 2

        // 중심으로부터 먼 클러스터를 클릭했을 때 한번에 이동하는 현상 방지
        setTimeout(() => {
          if (cluster.bounds && map) {
            map.fitBounds(cluster.bounds, 64)
          }
        }, distance / 30000)
      },
    })
  }, [map, center])

  // 마커를 state에 등록하기 위한 함수
  const setMarkerRef = useCallback((marker: Marker | null, key: number) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key])) return markers

      if (marker) {
        return { ...markers, [key]: marker }
      } else {
        const newMarkers = { ...markers }
        delete newMarkers[key]
        return newMarkers
      }
    })
  }, [])

  useEffect(() => {
    if (zoom < 18 || center === undefined) return
    const d = getDistanceBetween(
      new google.maps.LatLng(37.50120983415434, 127.03956782331157),
      center,
    )
    if (d < 50) {
      achieve('HOME')
    }
  }, [center, zoom, achieve])

  useEffect(() => {
    if (!clusterer) return

    clusterer.clearMarkers()
    clusterer.addMarkers(Object.values(markers))
  }, [clusterer, markers])

  const handleMarkerClick = (e: React.MouseEvent, memory: IMemoryInfo) => {
    e.stopPropagation()
    setSelectedMemory(memory)
    if (!map) return
    map.panTo({
      lat: memory.location.latitude,
      lng: memory.location.longitude,
    })
  }

  const handleIdleEvent = () => {
    if (!map) return
    const center = map.getCenter()
    const zoom = map.getZoom()
    if (center) {
      setCenter(center)
    }
    if (zoom) {
      setZoom(zoom)
    }
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
        mapId={'49ae42fed52588c3'}
        clickableIcons={false}
        defaultCenter={DEFAULT_LOCATION}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        disableDoubleClickZoom
        onClick={() => setSelectedMemory(undefined)}
        onIdle={handleIdleEvent}
        minZoom={5.5}
      >
        {memories.map(memory => (
          <MemoryMarker
            key={memory.id}
            memory={memory}
            setMarkerRef={setMarkerRef}
            onClick={handleMarkerClick}
            isSelected={selectedMemory?.id === memory.id}
          />
        ))}
      </Map>
      {selectedMemory && (
        <Link
          css={memoryDetailStyle}
          to={ROUTES.MEMORY_DETAIL(selectedMemory.id)}
          className='lg'
        >
          <MemoryInfo {...selectedMemory} description={undefined} />
          <div css={imagesListStyle}>
            {selectedMemory.pictures.slice(0, 3).map((image, index) => (
              <Img
                key={index}
                src={image}
                alt={`Memory image ${index + 1}`}
                customCss={imageStyle}
              />
            ))}
          </div>
        </Link>
      )}
    </div>
  )
}

const memoryDetailStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    bottom: withSafeAreaBottom(64),
    width: 'calc(100% - 32px)',
    maxWidth: `calc(${theme.maxWidth} - 64px)`,
    padding: '16px',
    margin: '16px',

    boxSizing: 'border-box',
    backgroundColor: theme.colors.white,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '24px',
    overflow: 'hidden',
  })

const imagesListStyle = css({
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  borderRadius: '20px',
  overflow: 'hidden',
})

const imageStyle = css({
  width: '100%',
  height: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  overflow: 'hidden',
  objectPosition: 'center',
})
