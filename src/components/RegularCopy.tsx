import styled, { css } from 'styled-components/macro';
import { systemFontFamily } from '../styles/mixins';
import { colors } from '../styles/colors';

type ExtraProps = {
  centered?: boolean;
  grayLevel?: number;
};

export default styled.p<ExtraProps>`
  ${({centered}) => centered && css`
    text-align: center;
  `}
  margin-top: 10px;
  margin-bottom: 10px;
  ${systemFontFamily}
  ${({grayLevel}) => typeof grayLevel !== undefined ?
    css`
      color: ${(colors as any)[`gray${grayLevel}`]};
    ` : ''
  }
`;
