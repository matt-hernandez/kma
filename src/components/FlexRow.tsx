import styled, { css } from 'styled-components/macro';

type Props = {
  alignItems?: string;
};

export default styled.div<Props>`
  display: flex;
  flex-wrap: nowrap;
  ${({ alignItems }) => alignItems && css`align-items: ${alignItems};`}
  width: 100%;
`;
