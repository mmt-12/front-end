import useHeader from '@/hooks/useHeader'

export default function CalendarPage() {
  useHeader({
    routeName: '달력',
    leftItem: {
      icon: null,
    },
  })

  return <div>calendar page</div>
}
