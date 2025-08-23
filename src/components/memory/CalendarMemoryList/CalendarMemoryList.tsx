import { useMemo } from 'react'
import { css, type Theme } from '@emotion/react'

import { flexGap } from '@/styles/common'
import type { IMemoryInfo } from '@/types/memory'
import { formatDateString } from '@/utils/date'
import MemoryInfo from '../MemoryInfo'

interface Props {
  memories: IMemoryInfo[]
  selectedDate?: Date
}

export default function CalendarMemoryList({ memories, selectedDate }: Props) {
  const groupedMemories = useMemo(() => {
    const filteredMemories = memories
      .filter(memory => {
        if (!selectedDate) return false
        if (new Date(memory.endDate) < selectedDate) return false
        return (
          selectedDate.getMonth() === new Date(memory.startDate).getMonth() &&
          selectedDate.getFullYear() ===
            new Date(memory.startDate).getFullYear()
        )
      })
      .sort((a, b) => a.startDate.localeCompare(b.startDate))

    const groups = new Map<string, IMemoryInfo[]>()
    filteredMemories.forEach(memory => {
      const date = formatDateString(memory.startDate)
      if (!groups.has(date)) {
        groups.set(date, [])
      }
      groups.get(date)?.push(memory)
    })
    return groups
  }, [memories, selectedDate])

  console.log(groupedMemories)

  return (
    <div css={[containerStyle, flexGap(16)]}>
      {Array.from(groupedMemories.keys()).map(startDate => (
        <div key={startDate} css={flexGap(6)}>
          <p css={dateStyle}>{startDate}</p>
          <div css={flexGap(16)}>
            {groupedMemories.get(startDate)?.map(memory => (
              <div css={memoryItemStyle} key={memory.id}>
                <MemoryInfo
                  {...memory}
                  imageCount={undefined}
                  startDate={undefined}
                  isLink
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    padding: '16px',
    flexGrow: 1,

    backgroundColor: theme.sky[50],
  })

const memoryItemStyle = (theme: Theme) =>
  css({
    padding: '14px 16px',
    backgroundColor: theme.bg,
    borderRadius: '16px',
    boxShadow: theme.shadow,
  })

const dateStyle = (theme: Theme) =>
  css({
    padding: '4px',
    color: theme.sky[600],
    fontSize: '15px',
    fontWeight: 600,
  })
