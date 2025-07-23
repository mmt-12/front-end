import useHeader from '@/hooks/useHeader'

export default function MapPage() {
  useHeader({
    routeName: '지도',
    leftItem: {
<<<<<<< HEAD
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
    },
    rightItem: {
=======
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038
      icon: null,
    },
  })

  return <div>map page</div>
}
