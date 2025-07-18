import Bears from '@/components/Bears'
import BearCounter from '@/components/BearCounter'
import { Box } from '@solar-icons/react'
import { css, useTheme } from '@emotion/react'
import Badge from '@/components/Badge'

export interface IHomePageProps {}

export function HomePage() {
  const theme = useTheme()
  return (
    <div>
      <h1>Hello world!</h1>

      <p>테마 컬러 사용</p>
      <h1 css={{ color: theme.sky[500] }}>main</h1>
      <hr />

      <p>아이콘 사용</p>
      <div css={divStyle}>
        <Box size={32} weight='Bold' color={theme.sky[600]} />
        <span>기억</span>
      </div>
      <hr />

      <p>배지 컴포넌트 사용</p>
      <Badge name='프로참석러' />

      <div>
        <p>전역 상태 관리</p>
        <Bears />
        <BearCounter />
      </div>
    </div>
  )
}

const divStyle = css({ display: 'flex', alignItems: 'center', gap: '8px' })
