import { css } from "@emotion/react";

export const reactionsStyle = (size: 'sm' | 'md') =>
  css({
    minHeight: 64,
    padding: '4px 16px',

    display: 'flex',
    alignItems: 'center',
    gap: size === 'sm' ? 8 : 12,
    overflowX: 'auto',
  })