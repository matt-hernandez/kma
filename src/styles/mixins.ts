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
