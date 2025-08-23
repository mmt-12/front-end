import { useState } from 'react'

import CalendarPicker from '@/components/common/CalendarPicker'
import CalendarMemoryList from '@/components/memory/CalendarMemoryList'
import useHeader from '@/hooks/useHeader'
import { MEMORIES } from '@/mocks/data/memories'
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

  const memories = MEMORIES
  const dateMemoryMap = new Map<number, IMemoryInfo[]>()
  memories.forEach(memory => {
    const startDate = new Date(memory.startDate)
    const endDate = new Date(memory.endDate)
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const key = date.setHours(0, 0, 0, 0)
      if (!dateMemoryMap.has(key)) {
        dateMemoryMap.set(key, [])
      }
      dateMemoryMap.get(key)?.push(memory)
    }
  })

  const getDayCellType = (date: Date) => {
    const key = date.setHours(0, 0, 0, 0)

    if (dateMemoryMap.has(key)) return 'dot'
    return 'default'
  }

  const handleDayClick = (date: Date) => {
    console.log(date)
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
      <CalendarMemoryList memories={memories} selectedDate={selectedDate} />
    </>
  )
}
