import styled, { css } from 'styled-components/macro';
import { colors } from '../styles/colors';

type ExtraProps = {
  color?: string;
  grayLevel?: number;
};

export default styled.span<ExtraProps>`
  ${({ color, grayLevel }) => typeof color === 'string'
    ? css`
      color: ${color};
    `
    : typeof grayLevel === 'number'
    ? css`
      color: ${(colors as any)[`gray${grayLevel}`]};
    `
    : ''
  }
`;
