import styled from 'styled-components/macro';

type ExtraProps = {
  top?: number
};

export default styled.div<ExtraProps>`
  position: absolute;
  top: ${({top}) => top ? `${top}px` : 0};
  right: 0;
  bottom: 0;
  left: 0;
  overflow: scroll;
`;
