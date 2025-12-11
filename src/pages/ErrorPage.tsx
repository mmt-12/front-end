import { css, useTheme, type Theme } from '@emotion/react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'

import errorImage from '@/assets/images/mascot/error.jpeg'
import Button from '@/components/common/Button'
import Img from '@/components/common/Img'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ROUTES } from '@/routes/ROUTES'

export default function ErrorPage() {
  const theme = useTheme()
  const error = useRouteError() as Error
  const navigate = useNavigate()

  useThemeColor(theme.colors.bg)

  let header = '문제가 발생했어요.'

  let messageEl = <p>알 수 없는 오류가 발생했습니다.</p>
  if (error.message === 'server-closed') {
    header = '서버가 닫혀있어요.'
    messageEl = (
      <>
        <span>
          정상 이용 시간은{' '}
          <b>
            <i>AM 09:00 ~ AM 00:00</i>
          </b>{' '}
          입니다.
        </span>
      </>
    )
  } else if (error.message) {
    messageEl = <p>error.message</p>
  }

  return (
    <div css={containerStyle}>
      <h2>{header}</h2>
      {messageEl}
      <p>
        문의사항은 <b>이중혁</b>에게 카톡 편하게 주세요!
      </p>
      <div css={imageWrapperStyle}>
        <Img src={errorImage} alt='Error mascot' />
      </div>
      <Button type='secondary' label='뒤로가기' onClick={() => navigate(-1)} />
      <Link to={ROUTES.MEMORY_LIST} css={{ width: '100%' }}>
        <Button label='처음으로 돌아가기' />
      </Link>
    </div>
  )
}

const containerStyle = (theme: Theme) =>
  css({
    width: '100%',
    height: '100dvh',

    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',

    backgroundColor: theme.colors.bg,
  })

const imageWrapperStyle = css({
  padding: '16px',
  marginBottom: '32px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    maxWidth: '75%',
    height: 'auto',
  },
})
