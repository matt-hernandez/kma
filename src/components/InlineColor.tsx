import styled, { css } from 'styled-components/macro';

type ExtraProps = {
  color: string;
};

export default styled.span<ExtraProps>`
  ${({color}) => typeof color === 'string' &&
    css`
      color: ${color};
    `
  }
`;
