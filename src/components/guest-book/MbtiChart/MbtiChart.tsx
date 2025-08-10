import ReactECharts from 'echarts-for-react'
import { MBTI } from '@/mocks/data/guestBook'
import { useTheme } from '@emotion/react'
import { MBTI_COLOR, type MbtiType } from '@/consts/MBTI'

export default function MbtiChart() {
  const theme = useTheme()

  const mbtiData = MBTI
  const labels = Object.keys(mbtiData)
  const values = Object.values(mbtiData)
  const total = values.reduce<number>((acc, v) => acc + v, 0)

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
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

  return (
    <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
  )
}
