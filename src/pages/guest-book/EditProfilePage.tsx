import { useMemo, useState } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import {
  MedalRibbonStar,
  PenNewSquare,
  RoundAltArrowRight,
} from '@solar-icons/react'

import defaultImageUrl from '@/assets/images/mascot/default-profile.png'
import Badge from '@/components/common/Badge'
import BottomButton from '@/components/common/BottomButton'
import DateInputField from '@/components/common/DateInputField'
import InputField from '@/components/common/InputField'
import WavyBox from '@/components/guest-book/WavyBox'
import ArraySelector from '@/components/popup/ArraySelector'
import InputPopup from '@/components/popup/InputPopup'
import { BADGES } from '@/consts/BADGES'
import useHeader from '@/hooks/useHeader'
import { PROFILE } from '@/mocks/data/guestBook'
import { MEMBERS } from '@/mocks/data/members'
import { flexGap } from '@/styles/common'
import type { IArrayInput, IArrayItem } from '@/types'

const profileData = PROFILE

export default function EditProfilePage() {
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })
  const theme = useTheme()

  const member = MEMBERS[0]

  const [name, setName] = useState(member.name)
  const [introduction, setIntroduction] = useState(member.introduction || '')
  const [badgeId, setBadgeId] = useState(member.badgeId)

  const badgeItems = useMemo(
    () =>
      Object.entries(BADGES).map(([id, badge]) => ({
        id: Number(id),
        label: badge.name,
        render: () => <Badge key={id} id={Number(id)} />,
      })),
    [],
  )

  const filteredBadgeItems = useMemo<IArrayItem[]>(
    () => badgeItems.filter(item => item.id === badgeId),
    [badgeId, badgeItems],
  )

  const arrayInput: IArrayInput = {
    items: filteredBadgeItems,
    render: () => <Badge id={badgeId || 0} key={badgeId || 0} />,
  }

  const handleImageClick = () => {
    console.log('Image clicked')
  }

  return (
    <div css={[flexGap(8), { padding: '16px 0' }]}>
      <div
        css={{
          position: 'relative',
          display: 'inline-flex',
          width: 'fit-content',
          margin: 'auto',
        }}
        onClick={handleImageClick}
      >
        <WavyBox
          strokeColor={theme.stone[600]}
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <img
            src={profileData.imagePath || defaultImageUrl}
            alt={profileData.nickname}
            onError={e => {
              e.currentTarget.src = defaultImageUrl
            }}
            css={imageStyle}
          />
        </WavyBox>
        <div css={buttonStyle}>
          <PenNewSquare size={32} color='white' weight='Bold' />
        </div>
      </div>
      <InputField
        label='이름'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <InputPopup
        label='칭호'
        icon={RoundAltArrowRight}
        value={arrayInput}
        onChange={({ items }: IArrayInput) => setBadgeId(items[0].id)}
        content={
          <ArraySelector
            initialItems={filteredBadgeItems}
            items={badgeItems}
            searchBarIcon={MedalRibbonStar}
            renderPreview
          />
        }
      />
      <DateInputField disabled label='생년월일' onChange={console.log} />
      <InputField
        label='한줄소개'
        type='textarea'
        value={introduction}
        onChange={e => setIntroduction(e.target.value)}
      />
      <BottomButton label='수정하기' />
    </div>
  )
}

const imageStyle = css({
  width: '140px',
  height: '140px',
  objectFit: 'cover',
  borderRadius: '8px',
})
const buttonStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    background: theme.stone[700],
    border: 'none',
    borderRadius: '14px',
    padding: '6px 6px 4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
  })
