import useHeader from '@/hooks/useHeader'

export default function MapPage() {
  useHeader({
    routeName: '지도',
    leftItem: {
      icon: null,
    },
  })

  return <div>map page</div>
}
