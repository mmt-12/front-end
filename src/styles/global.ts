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

  body: {
    fontFamily: 'Pretendard, sans-serif',
    padding: 0,
    margin: 0,
  },

  a: {
    textDecoration: 'none',
  },

  ':root': {
    padding: 0,
    margin: 0,
    backgroundColor: 'black',
  },
})
