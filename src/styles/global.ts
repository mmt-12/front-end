import { css } from '@emotion/react'

export const globalStyle = css({
  '@font-face': [
    {
      fontFamily: 'Pretendard Variable',
      fontWeight: '45 92',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      src: `url('./woff2/PretendardVariable.woff2') format('woff2-variations')`,
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
    fontFamily: 'Pretendard Variable, sans-serif',
  },
  body: {
    padding: 0,
    margin: 0,
  },

  a: {
    textDecoration: 'none',
    color: 'inherit',
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

  '.no-scrollbar': {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },

  '.stardust': {
    fontFamily: 'PFStardust, sans-serif',
  },
})
