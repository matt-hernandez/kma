import styled, { css } from 'styled-components/macro';

type ExtraProps = {
  shouldInflate?: boolean;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number;
};

export default styled.div<ExtraProps>`
  ${({shouldInflate, flexGrow, flexShrink, flexBasis}) => shouldInflate
    ? css`
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 0;
    `
    : css`
      flex-grow: ${flexGrow};
      flex-shrink: ${flexShrink};
      flex-basis: ${flexBasis};
    `
  }
`;
