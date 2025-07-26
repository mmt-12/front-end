import { css } from '@emotion/react'
import { theme } from './theme'

export const globalStyle = css({
  '@font-face': [
    {
      fontFamily: 'Pretendard',
      src: "url('@/assets/fonts/PretendardVariable.woff2') format('woff2')",
    },
    {
      fontFamily: 'PFStardust',
      src: "url('@/assets/fonts/PFStardust.ttf') format('truetype')",
    },
    {
      fontFamily: 'PressStart2P',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url('https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2') format('woff2')",
    },
  ],

  html: {
    maxWidth: theme.maxWidth,
    margin: '0 auto',
    backgroundColor: 'black',
  },

  body: {
    fontFamily: 'Pretendard, sans-serif',
    padding: 0,
    margin: 0,
  },

  a: {
    textDecoration: 'none',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
  },
})
