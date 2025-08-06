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
    {
      fontFamily: 'PressStart2P',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url('https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2') format('woff2')",
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

  p: {
    margin: 0,
    padding: 0,
  },

  h1: {
    margin: 0,
    padding: 0,
  },

  h2: {
    margin: 0,
    padding: 0,
  },

  li: {
    listStyle: 'none',
  },

  ol: {
    padding: 0,
    margin: 0,
  },
  div: {
    boxSizing: 'border-box',
  },
})
