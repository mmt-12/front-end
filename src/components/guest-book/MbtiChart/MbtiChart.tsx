import { lazy, useMemo, useRef } from 'react'
import { useTheme } from '@emotion/react'
import { PieChart } from 'echarts/charts'
import { LegendComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

import { useMbtiTest } from '@/api'
import NoContentFallback from '@/components/common/NoContentFallback'
import { MBTI_COLOR, type MbtiType } from '@/consts/MBTI'
import MbtiChartSkeleton from './MbtiChart.Skeleton'

const EChartsReactCore = lazy(() => import('echarts-for-react/lib/core'))

// 사용할 모듈 등록
echarts.use([PieChart, LegendComponent, SVGRenderer])

interface Props {
  communityId: number
  associateId: number
}

export default function MbtiChart({ communityId, associateId }: Props) {
  const theme = useTheme()
  const { data } = useMbtiTest(communityId, associateId)
  const chartRef = useRef(null)

  const hasResult = useMemo(() => {
    if (!data) return false
    return Object.values(data).some(value => value > 0)
  }, [data])

  const option = useMemo(() => {
    if (!data || !hasResult) return null
    const labels = Object.keys(data)
    const values = Object.values(data)
    const total = values.reduce<number>((acc, v) => acc + v, 0)

    return {
      legend: {
        show: false,
      },
      series: [
        {
          name: 'MBTI',
          type: 'pie',
          silent: true,
          radius: ['30%', '100%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => {
              if (params.value === 0) return ''
              const percentage = ((params.value / total) * 100).toFixed(1)
              return `{label|${params.name}}\n{percent|${percentage}%}`
            },
            rich: {
              label: {
                fontSize: 10,
                fontFamily: 'PressStart2P',
                fontWeight: 'bold',
                color: '#fff',
                align: 'center',
                textBorderColor: theme.colors.stone[700],
                textBorderWidth: 2,
              },
              percent: {
                fontSize: 6,
                fontFamily: 'PressStart2P',
                fontWeight: 'bold',
                color: '#fff',
                align: 'center',
                textBorderColor: theme.colors.stone[700],
                textBorderWidth: 1.5,
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: labels.map((label, idx) => ({
            name: label,
            value: values[idx],
            itemStyle: {
              color: MBTI_COLOR[label as MbtiType],
            },
          })),
        },
      ],
    }
  }, [data, hasResult, theme])

  if (!data) return <MbtiChartSkeleton />

  if (!hasResult) {
    return (
      <NoContentFallback size='block' message='MBTI 검사 결과가 없어요. 🥲' />
    )
  }

  if (!option) return <MbtiChartSkeleton />

  return (
    <EChartsReactCore
      echarts={echarts}
      option={option}
      ref={chartRef}
      opts={{ renderer: 'svg' }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
