import styled, { css } from 'styled-components/macro';
import { systemFontFamily } from '../styles/mixins';
import { colors } from '../styles/colors';

type ExtraProps = {
  centered?: boolean;
  marginTop?: boolean;
  marginBottom?: boolean;
  grayLevel?: number;
};

export default styled.h1<ExtraProps>`
  ${({marginTop}) => marginTop
    ? css`
      margin-top: 16px;
    `
    : css`
      margin-top: 0;
    `
  }
  ${({marginBottom}) => marginBottom
    ? css`
      margin-bottom: 16px;
    `
    : css`
      margin-bottom: 0;
    `
  }
  ${({centered}) => centered && css`
    text-align: center;
  `}
  font-size: 30px;
  ${systemFontFamily}
  ${({grayLevel}) => typeof grayLevel !== undefined &&
    css`
      color: ${(colors as any)[`gray${grayLevel}`]};
    `
  }
`;
