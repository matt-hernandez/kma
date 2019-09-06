import styled, { css } from 'styled-components/macro';
import FlexCell from './FlexCell';

type ExtraProps = {
  centered?: boolean;
  centeredHorizontal?: boolean;
  centeredVertical?: boolean;
  alignRight?: boolean;
  alignBottom?: boolean;
  shouldInflate?: boolean;
};

export default styled.div<ExtraProps>`
  ${({shouldInflate}) => shouldInflate && css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `}
  display: flex;
  flex-direction: column;
  ${({centeredHorizontal, centered}) => (centeredHorizontal || centered) && css`
    align-items: center;
  `}
  ${({centeredVertical, centered}) => (centeredVertical || centered) && css`
    justify-content: center;
  `}
  ${({alignRight}) => alignRight && css`
    align-items: flex-end;
  `}
  ${({alignBottom}) => alignBottom && css`
    justify-content: flex-end;
  `}

  ${FlexCell} {
    width: 100%;
  }
`;
