import { isPlatform } from '@ionic/react';
import { css } from 'styled-components/macro';

export const systemFontFamily = css`
  ${isPlatform('ios')
    ? css`
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif;
    `
    : css`
      font-family: "Roboto", "Helvetica Neue", sans-serif;
    `
  }
`;

export function hexToRgba(hex: string, a: number = 1): string {
  if (hex === 'transparent') {
    return `rgba(0, 0, 0, 0)`;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return `rgba(0, 0, 0, 1)`;
  }
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
