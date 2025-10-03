import { useMemo, useState } from 'react'

import { useMemoryList } from '@/api'
import CalendarPicker from '@/components/common/CalendarPicker'
import CalendarMemoryList from '@/components/memory/CalendarMemoryList'
import useHeader from '@/hooks/useHeader'
import type { IMemoryInfo } from '@/types/memory'

export default function CalendarPage() {
  useHeader({
    routeName: '달력',
    leftItem: {
      icon: null,
    },
  })

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date>()

  const { data } = useMemoryList(1, { size: 1000 })

  const dateMemoryMap = useMemo(() => {
    const memories = data?.pages.flatMap(page => page.memories) || []
    const map = new Map<number, IMemoryInfo[]>()
    memories.forEach(memory => {
      const startDate = new Date(memory.period.startTime)
      const endDate = new Date(memory.period.endTime)
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const key = date.setHours(0, 0, 0, 0)
        if (!map.has(key)) {
          map.set(key, [])
        }
        map.get(key)?.push(memory)
      }
    })
    return map
  }, [data])

  const memoryList = useMemo(() => {
    return dateMemoryMap.get(selectedDate?.setHours(0, 0, 0, 0) || 0) || []
  }, [dateMemoryMap, selectedDate])

  const getDayCellType = (date: Date) => {
    const key = date.setHours(0, 0, 0, 0)

    if (dateMemoryMap.has(key)) return 'dot'
    return 'default'
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <CalendarPicker
        viewMonth={viewMonth}
        viewYear={viewYear}
        setViewMonth={setViewMonth}
        setViewYear={setViewYear}
        onClick={handleDayClick}
        getDayCellType={getDayCellType}
        getIsSelected={date => selectedDate?.getTime() === date.getTime()}
      />
      <CalendarMemoryList memories={memoryList} />
    </>
  )
}
