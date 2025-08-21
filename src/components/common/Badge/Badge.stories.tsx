import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { BADGES } from '@/consts/BADGES'
import Badge from '.'

const meta = {
  title: 'components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    id: 1,
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const AllBadges: Story = {
  args: { id: 1 },
  render: () => {
    const badgeIds = Array.from({ length: 33 }, (_, i) => i + 1)

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {badgeIds.map(id => (
          <Badge key={id} id={id} />
        ))}
      </div>
    )
  },
  play: async ({ canvas }) => {
    for (let id = 1; id <= 33; id++) {
      // 해당 id의 Badge 가져오기
      const badge = canvas.getByTestId(`badge-${id}`)
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveStyle('font-family: PFStardust, sans-serif')

      //Badge의 텍스트 일치하는지 확인
      expect(badge).toHaveTextContent(BADGES[id].name)

      // Badge의 색 일치하는지 확인
      const wavyWrapper = badge.closest('.wavy-wrapper')
      expect(wavyWrapper).toBeInTheDocument()
      expect(wavyWrapper).toHaveStyle({
        zIndex: '1',
        color: BADGES[id].color,
      })
      if (!wavyWrapper) return

      // WavyBox의 SVG 스타일 일치하는지 확인
      const wavySvg = wavyWrapper.nextElementSibling
      expect(wavySvg).toBeInTheDocument()

      if (!wavySvg) return
      const wavyRect = wavySvg.querySelector('.wavy-rect')
      expect(wavyRect).toBeInTheDocument()
      expect(wavyRect).toHaveStyle({
        fill: BADGES[id].backgroundColor,
        stroke: BADGES[id].border,
      })
    }
  },
}
