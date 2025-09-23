import { css } from "@emotion/react";

export const reactionsStyle = (size: 'sm' | 'md') =>
  css({
    height: 64,
    padding: '4px 16px',

    display: 'flex',
    alignItems: 'center',
    gap: size === 'sm' ? 8 : 16,
    overflowX: 'auto',
  })