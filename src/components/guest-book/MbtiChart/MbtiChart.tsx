import { lazy, useMemo, useRef } from 'react'
import { useTheme } from '@emotion/react'
import { PieChart } from 'echarts/charts'
import { LegendComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

import { useMbtiTest } from '@/api'
import { MBTI_COLOR, type MbtiType } from '@/consts/MBTI'
import MbtiChartSkeleton from './MbtiChart.Skeleton'

const EChartsReactCore = lazy(() => import('echarts-for-react/lib/core'))

// 사용할 모듈 등록
echarts.use([PieChart, LegendComponent, SVGRenderer])

export default function MbtiChart() {
  const theme = useTheme()
  const userId = 1
  const { data } = useMbtiTest(1, userId)
  const chartRef = useRef(null)

  const option = useMemo(() => {
    if (!data) return null
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
                textBorderColor: theme.stone[700],
                textBorderWidth: 2,
              },
              percent: {
                fontSize: 6,
                fontFamily: 'PressStart2P',
                fontWeight: 'bold',
                color: '#fff',
                align: 'center',
                textBorderColor: theme.stone[700],
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
  }, [data, theme])

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
