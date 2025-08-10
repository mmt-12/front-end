import ReactECharts from 'echarts-for-react'
import { MBTI } from '@/mocks/data/guestBook'
import { useTheme } from '@emotion/react'

const mbtiColors: Record<string, string> = {
  INFP: '#7A9EFF',
  INFJ: '#FF9F6A',
  INTP: '#A463C9',
  INTJ: '#3FA36D',
  ISFP: '#FF7FCF',
  ISFJ: '#B5D53E',
  ISTP: '#3ED3D3',
  ISTJ: '#4A90E2',
  ENFP: '#FFDD95',
  ENFJ: '#61C4B7',
  ENTP: '#FF6B35',
  ENTJ: '#B47ED8',
  ESFP: '#C074F8',
  ESFJ: '#FBBF4B',
  ESTP: '#E9DAC3',
  ESTJ: '#8F8F8F',
}

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
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'inside',
          formatter: (params: any) => {
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
            color: mbtiColors[label],
          },
        })),
      },
    ],
  }

  return (
    <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
  )
}
