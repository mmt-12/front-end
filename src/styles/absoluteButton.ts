import { css, type Theme } from "@emotion/react";

export const absoluteButtonStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    backgroundColor: theme.colors.stone[700],
    border: 'none',
    borderRadius: '14px',
    padding: '6px 6px 4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
    ':active': {
      backgroundColor: theme.colors.stone[700],
    },
  })