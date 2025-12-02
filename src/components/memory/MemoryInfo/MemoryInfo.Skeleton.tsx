import { css, useTheme, type Theme } from '@emotion/react'

import { Skeleton, SkeletonText } from '@/components/common/Skeleton'

interface Props {
  description?: boolean
  showDetail?: boolean
}

export default function MemoryInfoSkeleton({
  description = false,
  showDetail = false,
}: Props) {
  const theme = useTheme()

  const renderMeta = () => {
    return (
      <>
        <SkeletonText width={140} lines={1} />
        <div css={{ height: 4 }}></div>
        <SkeletonText width={200} lines={1} />
      </>
    )
  }

  return (
    <div>
      <div css={titleRowStyle}>
        <Skeleton width={120} height={24} radius={12} />
        <div css={countChipsStyle}>
          <Skeleton width={46} height={24} radius={24} />
          <Skeleton width={46} height={24} radius={24} />
        </div>
      </div>
      <div css={metaRowStyle(theme, !!showDetail)}>
        {showDetail ? (
          <>
            <div>{renderMeta()}</div>
            <Skeleton width={92} height={28} radius={24} />
          </>
        ) : (
          <>{renderMeta()}</>
        )}
      </div>
      {description && (
        <div css={{ padding: '8px 0' }}>
          <SkeletonText width={'96%'} lines={1} />
        </div>
      )}
    </div>
  )
}
const titleRowStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 0',

    h2: {
      fontSize: '20px',
      color: theme.colors.sky[600],
    },
  })

const metaRowStyle = (theme: Theme, showDetail: boolean) =>
  css({
    padding: showDetail ? '8px 0' : '4px 0',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    fontWeight: '400',

    'p.location': {
      color: theme.colors.stone[800],
      fontSize: '14px',
    },
    'p.date': {
      color: theme.colors.stone[700],
      fontSize: '14px',
    },
  })

const countChipsStyle = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})
