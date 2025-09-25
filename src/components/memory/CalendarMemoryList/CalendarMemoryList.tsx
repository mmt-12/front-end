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
        if (new Date(memory.period.endTime) < selectedDate) return false
        return (
          selectedDate.getMonth() ===
            new Date(memory.period.startTime).getMonth() &&
          selectedDate.getFullYear() ===
            new Date(memory.period.startTime).getFullYear()
        )
      })
      .sort((a, b) => a.period.startTime.localeCompare(b.period.startTime))

    const groups = new Map<string, IMemoryInfo[]>()
    filteredMemories.forEach(memory => {
      const date = formatDateString(memory.period.startTime)
      if (!groups.has(date)) {
        groups.set(date, [])
      }
      groups.get(date)?.push(memory)
    })
    return groups
  }, [memories, selectedDate])

  return (
    <div css={[containerStyle, flexGap(16)]}>
      {Array.from(groupedMemories.keys()).map(startTime => (
        <div key={startTime} css={flexGap(6)}>
          <p css={dateStyle}>{startTime}</p>
          <div css={flexGap(16)}>
            {groupedMemories.get(startTime)?.map(memory => (
              <div css={memoryItemStyle} key={memory.id}>
                <MemoryInfo
                  {...memory}
                  pictureAmount={undefined}
                  period={{
                    startTime: undefined,
                    endTime: memory.period.endTime,
                  }}
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

    backgroundColor: theme.colors.sky[50],
    overflowY: 'scroll',
  })

const memoryItemStyle = (theme: Theme) =>
  css({
    padding: '14px 16px',
    backgroundColor: theme.colors.bg,
    borderRadius: '16px',
    boxShadow: theme.shadow,
  })

const dateStyle = (theme: Theme) =>
  css({
    padding: '4px',
    color: theme.colors.sky[600],
    fontSize: '15px',
    fontWeight: 600,
  })
