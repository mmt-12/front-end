import { useCallback } from 'react'
import { css, useTheme, type Theme } from '@emotion/react'
import { DownloadSquare, GalleryCircle, UserCircle } from '@solar-icons/react'
import { Link } from 'react-router-dom'

import { useMemoryImages } from '@/api'
import rightArrow from '@/assets/images/icons/rightArrow.svg'
import Chip from '@/components/common/Chip'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'
import type { locationType } from '@/types/memory'
import { formatDateString } from '@/utils/date'
import { compressImages, downloadBlob } from '@/utils/image'

interface Props {
  id: number
  title: string
  location: locationType
  memberAmount: number
  pictureAmount?: number
  description?: string
  period: {
    startTime?: string
    endTime: string
  }
  saveEnabled?: boolean
  isLink?: boolean
}

export default function MemoryInfo(props: Props) {
  const theme = useTheme()

  const formattedStartTime = formatDateString(props.period.startTime || '')
  const formattedEndTime = formatDateString(props.period.endTime || '')

  const { communityId } = useUserStore()

  const { data: pictureData } = useMemoryImages(communityId, props.id)

  const handleSaveClick = useCallback(() => {
    if (!pictureData || pictureData.pictures.length === 0) {
      alert('저장할 사진이 없습니다.')
      return
    }
    try {
      compressImages(pictureData.pictures).then(blob => {
        downloadBlob(blob, `memory_${props.id}_images.zip`)
      })
    } catch (error) {
      console.error('Error during image compression or download:', error)
      alert('사진 저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }, [pictureData, props.id])

  const renderMeta = () => {
    return (
      <>
        <p className='location'>{props.location.name}</p>
        {formattedStartTime !== undefined && (
          <p className='date'>
            {formattedStartTime}
            {formattedEndTime != formattedStartTime && ` - ${formattedEndTime}`}
          </p>
        )}
      </>
    )
  }

  return (
    <div css={{ padding: '4px 8px' }}>
      <div css={titleRowStyle}>
        <h2>{props.title}</h2>
        <div css={countChipsStyle}>
          <Chip Icon={UserCircle} label={props.memberAmount} />
          {props.pictureAmount !== undefined && (
            <Chip Icon={GalleryCircle} label={props.pictureAmount} />
          )}
        </div>
      </div>
      <div css={metaRowStyle(theme, !!props.saveEnabled)}>
        {props.saveEnabled ? (
          <>
            <div>{renderMeta()}</div>
            <Chip
              Icon={DownloadSquare}
              label='사진 모두 저장'
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
    },
  })

const metaRowStyle = (theme: Theme, saveEnabled: boolean) =>
  css({
    padding: saveEnabled ? '8px 0' : '4px 0',

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
  padding: '6px 12px',
})
