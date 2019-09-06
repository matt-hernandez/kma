import styled, { css } from 'styled-components/macro';
import { colors } from '../styles/colors';

type ExtraProps = {
  borderWidth?: number;
  grayLevel?: number;
};

export default styled.div<ExtraProps>`
  width: 100%;
  ${({grayLevel, borderWidth}) => css`
      border-bottom: ${borderWidth || 1}px solid ${grayLevel ? (colors as any)[`gray${grayLevel}`] : colors.black};
    `
  }
`;
