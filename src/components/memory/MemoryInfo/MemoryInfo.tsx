import { useCallback } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import {
  DownloadSquare,
  GalleryCircle,
  Settings,
  UserCircle,
} from '@solar-icons/react'
import { Link } from 'react-router-dom'

import rightArrow from '@/assets/images/icons/rightArrow.svg'
import Button from '@/components/common/Button'
import Chip from '@/components/common/Chip'
import MemorySettingModal from '@/components/modal/MemorySettingModal'
import { useModal } from '@/hooks/useModal'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import type { IMember } from '@/types'
import type { LocationType } from '@/types/memory'
import { formatDateString } from '@/utils/date'
import { compressImages, downloadBlob } from '@/utils/image'

interface Props {
  id: number
  title: string
  location: LocationType
  memberAmount: number
  pictureAmount?: number
  description?: string
  period: {
    startTime?: string
    endTime: string
  }
  showDetail?: boolean
  isLink?: boolean
  pictures?: string[]
  author?: IMember
}

export default function MemoryInfo(props: Props) {
  const theme = useTheme()
  const { alert, confirm, openModal } = useModal()

  const isAuthor = useUserStore(state => state.associateId) === props.author?.id

  const formattedStartTime = formatDateString(props.period.startTime || '')
  const formattedEndTime = formatDateString(props.period.endTime || '')

  const handleSaveClick = useCallback(async () => {
    if (!props.pictures?.length) {
      alert('저장할 사진이 없습니다.')
      return
    }
    if (!(await confirm(`'${props.title}'의 모든 사진을 저장하시겠습니까?`))) {
      return
    }
    try {
      compressImages(props.pictures).then(blob => {
        downloadBlob(blob, `memory_${props.id}_images.zip`)
      })
    } catch (error) {
      console.error('Error during image compression or download:', error)
      alert('사진 저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }, [props.pictures, props.id, alert, confirm, props.title])

  const renderMeta = () => {
    return (
      <>
        <p
          className='location'
          css={{
            maxWidth: '240px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {props.location.name ||
            props.location.address.split(' ').splice(0, 3).join(' ')}
        </p>
        {formattedStartTime !== undefined && (
          <p className='date'>
            {formattedStartTime}
            {formattedEndTime != formattedStartTime && ` - ${formattedEndTime}`}
          </p>
        )}
      </>
    )
  }

  const handleSettingsClick = () => {
    openModal(<MemorySettingModal memoryId={props.id} title={props.title} />)
  }

  return (
    <div css={{ padding: '4px 8px' }}>
      <div css={titleRowStyle}>
        <h2>
          {props.title}
          {isAuthor && props.showDetail && (
            <Settings
              className='button'
              weight='Bold'
              size={21}
              color={theme.colors.stone[600]}
              css={{ padding: 6 }}
              onClick={handleSettingsClick}
            />
          )}
        </h2>
        <div css={countChipsStyle}>
          <Chip Icon={UserCircle} label={props.memberAmount} />
          {props.pictureAmount !== undefined && (
            <Chip Icon={GalleryCircle} label={props.pictureAmount} />
          )}
        </div>
      </div>
      <div css={metaRowStyle(theme, !!props.showDetail)}>
        {props.showDetail ? (
          <>
            <div>{renderMeta()}</div>
            <Button
              icon={<DownloadSquare size={20} weight='Bold' />}
              size='sm'
              label='사진 저장'
              type='secondary'
              onClick={handleSaveClick}
              customCss={chipCustomStyle}
            />
          </>
        ) : (
          <>{renderMeta()}</>
        )}
      </div>
      {props.description &&
        (props.isLink ? (
          <Link
            to={props.id ? ROUTES.MEMORY_DETAIL(props.id) : ROUTES.MEMORY_LIST}
          >
            <div css={linkStyle}>
              <p css={descriptionStyle}>{props.description}</p>
              <img src={rightArrow} alt='' width={14} />
            </div>
          </Link>
        ) : (
          <p css={descriptionStyle}>{props.description}</p>
        ))}
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
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
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

const descriptionStyle = (theme: Theme) => ({
  padding: '8px 0',
  color: theme.colors.stone[800],
  fontSize: '14px',
})

const linkStyle = (theme: Theme) =>
  css({
    margin: '12px 0px 4px 0px',
    padding: '6px 14px',

    display: 'flex',
    justifyContent: 'space-between',

    backgroundColor: theme.colors.sky[100],
    borderRadius: '12px',
    borderTopLeftRadius: '0px',
  })

const chipCustomStyle = css({
  flexDirection: 'row',
  gap: '4px',
  fontWeight: '500',
  fontSize: '14px',
  borderWidth: '1px',
  padding: '4px 8px',
})
