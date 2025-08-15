import Button from '@/components/common/Button'
import { ROUTES } from '@/routes/ROUTES'
import { css, type Theme } from '@emotion/react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import errorImage from '@/assets/images/mascot/error.jpeg'

export function ErrorBoundary() {
  const error = useRouteError() as Error
  const navigate = useNavigate()
  return (
    <div css={containerStyle}>
      <h2>문제가 발생했어요.</h2>
      <p>{error.message}</p>
      <div css={imageWrapperStyle}>
        <img src={errorImage} alt='Error mascot' />
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
    height: '100vh',

    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',

    backgroundColor: theme.bg,
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
