import React from 'react';
import styled, { css } from 'styled-components/macro';
import FlexCell from './FlexCell';
import { colors } from '../styles/colors';

interface IsActive {
  isActive: boolean;
}

const TabContainer = styled(FlexCell)<IsActive>`
  position: relative;
  cursor: pointer;

  ${({isActive}) => isActive
    && css`
      box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
    `
  }
`;

const TabName = styled.h3<IsActive>`
  ${({isActive}) => isActive
    && css`
      color: ${colors.active};
    `
  }
  margin-bottom: 16px;
  font-size: 16px;
  text-align: center;
`;

const TabHighlight = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: ${colors.active};
`;

interface Props extends IsActive {
  name: string;
  onClick: (...args: any[]) => void;
};

const Tab: React.FunctionComponent<Props> = function({ name, isActive, onClick }) {
  return (
    <TabContainer isActive={isActive} onClick={onClick} shouldInflate={true}>
      <TabName isActive={isActive}>{name}</TabName>
      {isActive && <TabHighlight />}
    </TabContainer>
  )
}

export default Tab;
