import { css, type Theme } from '@emotion/react'

import { flexGap } from '@/styles/common'
import type { IMemoryInfo } from '@/types/memory'
import MemoryInfo from '../MemoryInfo'

interface Props {
  memories: IMemoryInfo[]
}

export default function CalendarMemoryList({ memories }: Props) {
  return (
    <div css={[containerStyle, flexGap(16)]}>
      <div css={flexGap(16)}>
        {memories.map(memory => (
          <div css={memoryItemStyle} key={memory.id}>
            <MemoryInfo
              {...memory}
              pictureAmount={undefined}
              period={{
                startTime: memory.period.startTime,
                endTime: memory.period.endTime,
              }}
              isLink
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    padding: '16px',
    flexGrow: 1,

    backgroundColor: theme.colors.sky[50],
  })

const memoryItemStyle = (theme: Theme) =>
  css({
    padding: '14px 16px',
    backgroundColor: theme.colors.bg,
    borderRadius: '16px',
    boxShadow: theme.shadow,
  })
