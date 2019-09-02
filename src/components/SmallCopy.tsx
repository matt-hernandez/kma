import styled, { css } from 'styled-components/macro';
import { systemFontFamily } from '../styles/mixins';
import { colors } from '../styles/colors';

type ExtraProps = {
  centered?: boolean;
  grayLevel?: number;
};

export default styled.span<ExtraProps>`
  font-size: 13px;
  ${({centered}) => centered && css`
    text-align: center;
  `}
  ${systemFontFamily}
  ${({grayLevel}) => typeof grayLevel !== undefined &&
    css`
      color: ${(colors as any)[`gray${grayLevel}`]};
    `
  }
`;
