import { css } from '@emotion/react'

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
  ],
  html: {
    fontFamily: 'Pretendard, sans-serif',
  },
  body: {
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
