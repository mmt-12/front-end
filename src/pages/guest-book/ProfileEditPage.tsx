import { useEffect, useMemo, useState } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import {
  MedalRibbonStar,
  PenNewSquare,
  RoundAltArrowRight,
} from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'

import { useAssociateProfile, useUpdateAssociate } from '@/api'
import defaultImageUrl from '@/assets/images/mascot/default-profile.png'
import Badge from '@/components/common/Badge'
import BottomButton from '@/components/common/BottomButton'
import DateInputField from '@/components/common/DateInputField'
import Img from '@/components/common/Img'
import InputField from '@/components/common/InputField'
import Loader from '@/components/common/Loader'
import WavyBox from '@/components/guest-book/WavyBox'
import ArraySelector from '@/components/popup/ArraySelector'
import InputPopup from '@/components/popup/InputPopup'
import Popup from '@/components/popup/Popup'
import ProfileImageSelector from '@/components/popup/ProfileImageSelector'
import { BADGES } from '@/consts/BADGES'
import useHeader from '@/hooks/useHeader'
import { useModal } from '@/hooks/useModal'
import useStardust from '@/hooks/useStardust'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import { flexGap } from '@/styles/common'
import type { IArrayInput, IArrayItem } from '@/types'

export default function EditProfilePage() {
  useStardust()
  useHeader({
    routeName: '프로필',
    rightItem: {
      icon: null,
    },
  })
  const navigate = useNavigate()

  const { associateId } = useUserStore()
  const { data: profile, isLoading } = useAssociateProfile(1, associateId)

  const theme = useTheme()
  const { alert, openModal, closeModal } = useModal()

  const [imagePath, setImagePath] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [introduction, setIntroduction] = useState<string>('')
  const [badgeId, setBadgeId] = useState<number>()

  useEffect(() => {
    if (!profile) return
    setName(profile.nickname ?? '')
    setIntroduction(profile.introduction ?? '')
    setBadgeId(profile.achievement?.id)
    setImagePath(profile.imageUrl ?? '')
  }, [profile])

  const { mutate: updateProfile } = useUpdateAssociate(1)

  const handleSubmit = () => {
    updateProfile(
      {
        nickname: name,
        achievement: badgeId,
        profileImageUrl: imagePath,
        introduction,
      },
      {
        onSuccess: async () => {
          navigate(ROUTES.GUEST_BOOK(associateId))
          alert('프로필이 수정되었습니다.')
        },
      },
    )
  }

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
    render: () =>
      filteredBadgeItems.map(item => <Badge id={item.id} key={item.id} />),
  }

  const handleImageClick = async () => {
    await openModal(
      <Popup title={'프로필'} onClose={() => closeModal()}>
        <ProfileImageSelector
          associateId={associateId}
          onSelect={(value: string) => {
            setImagePath(value)
            closeModal(value)
          }}
          value={imagePath}
        />
      </Popup>,
    )
  }

  if (isLoading) return <Loader />

  return (
    <div css={[flexGap(8), { padding: '24px 0' }]}>
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
          strokeColor={theme.colors.stone[600]}
          strokeWidth={3}
          borderRadius={8}
          childrenOnTop={false}
        >
          <Img
            src={imagePath || profile?.imageUrl || defaultImageUrl}
            alt={profile?.nickname || ''}
            onError={e => {
              e.currentTarget.src = defaultImageUrl
            }}
            customCss={imageStyle}
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
        onChange={(value: IArrayInput) => {
          if (!value) return
          setBadgeId(value.items[0]?.id)
        }}
        content={
          <ArraySelector
            initialItems={filteredBadgeItems}
            items={badgeItems}
            searchBarIcon={MedalRibbonStar}
            renderPreview
          />
        }
      />
      <DateInputField
        disabled
        label='생년월일'
        onChange={() => {}}
        value={new Date(profile?.birthday || '')}
      />
      <InputField
        label='한줄소개'
        type='textarea'
        value={introduction}
        onChange={e => setIntroduction(e.target.value)}
      />
      <BottomButton label='수정하기' onClick={handleSubmit} />
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
    background: theme.colors.stone[700],
    border: 'none',
    borderRadius: '14px',
    padding: '6px 6px 4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
  })
