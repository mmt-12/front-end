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

  ':root': {
    padding: 0,
    margin: 0,
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
<<<<<<< HEAD
=======
    backgroundColor: 'black',
>>>>>>> 01815eacaf2e912a3f7c9edcafba6f54e3e24038
  },
})
