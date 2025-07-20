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
  },
})
