import Button from '@/components/common/Button'
import mainMascot from '../assets/mascot/main.png'
import { css } from '@emotion/react'
import { ROUTES } from '@/routes/ROUTES'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <div css={containerStyle}>
      <p>우리의 추억을 위한 공간</p>
      <p>Memento</p>
      <div>
        <img src={mainMascot} alt='memento mascot main' />
      </div>
      <div>
        <Button
          label='카카오 로그인'
          onClick={() => {
            navigate(ROUTES.MEMORY_LIST)
          }}
        />
        <button>
          <p>?</p>
          <span>관리자에게 문의하기</span>
        </button>
      </div>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  height: '100vh',
  padding: '0 20px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  color: '#333',

  '>p': {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
  },

  '>div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',

    '>img': {
      width: '200px',
      height: 'auto',
    },

    '>button': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
  },
})
