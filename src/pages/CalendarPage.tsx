import useHeader from '@/hooks/useHeader'

export default function CalendarPage() {
  useHeader({
    routeName: '달력',
    leftItem: {
      icon: null,
<<<<<<< HEAD
      onClick: () => console.log('nothing happens'),
    },
    rightItem: {
      icon: Bell,
      onClick: () => console.log('Bell clicked'),
=======
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038
    },
  })

  return <div>calendar page</div>
}
