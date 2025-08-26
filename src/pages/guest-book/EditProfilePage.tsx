import { useMemo, useState } from 'react'
import { MedalRibbonStar, RoundAltArrowRight } from '@solar-icons/react'

import Badge from '@/components/common/Badge'
import InputField from '@/components/common/InputField'
import ArraySelector from '@/components/popup/ArraySelector'
import InputPopup from '@/components/popup/InputPopup'
import { BADGES } from '@/consts/BADGES'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import { MEMBERS } from '@/mocks/data/members'
import type { IArrayInput } from '@/types'

export default function EditProfilePage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })

  const member = MEMBERS[0]

  const [name, setName] = useState(member.name)
  const [introduction, setIntroduction] = useState(member.introduction || '')
  const [badgeId, setBadgeId] = useState(member.badgeId)
  const { openModal, closeModal } = useModal()

  const badgeItems = useMemo(
    () =>
      Object.entries(BADGES).map(([id, badge]) => ({
        id: Number(id),
        label: badge.name,
        render: () => <Badge key={id} id={Number(id)} />,
      })),
    [],
  )

  const filteredBadgeItems = badgeItems.filter(item => item.id === badgeId)

  return (
    <>
      <InputField
        label='이름'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <InputPopup
        label='칭호'
        icon={RoundAltArrowRight}
        value={
          filteredBadgeItems.length > 0
            ? {
                items: filteredBadgeItems,
                render: () => <Badge id={badgeId || 0} key={badgeId || 0} />,
              }
            : undefined
        }
        onChange={({ items }: IArrayInput) => setBadgeId(items[0].id)}
        content={
          <ArraySelector
            initialItems={badgeItems.filter(item => item.id === badgeId)}
            items={badgeItems}
            searchBarIcon={MedalRibbonStar}
            renderPreview
          />
        }
      />
      <InputField
        label='한줄소개'
        type='textarea'
        value={introduction}
        onChange={e => setIntroduction(e.target.value)}
      />
    </>
  )
}
