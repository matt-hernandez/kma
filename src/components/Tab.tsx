import React from 'react';
import styled, { css } from 'styled-components/macro';
import FlexCell from './FlexCell';
import { colors } from '../styles/colors';

type TabNameProps = {
  isActive: boolean;
};

const TabName = styled.h3<TabNameProps>`
  ${({isActive}) => isActive
    && css`
      color: ${colors.active};
    `
  }
  font-size: 16px;
  text-align: center;
`;

const TabHighlight = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: ${colors.active};
`;

type Props = {
  name: string;
  isActive: boolean;
  onClick: (...args: any[]) => void;
};

const Tab: React.FunctionComponent<Props> = function({ name, isActive, onClick }) {
  return (
    <FlexCell onClick={onClick} shouldInflate={true} furtherStyles="position: relative; cursor: pointer;">
      <TabName isActive={isActive}>{name}</TabName>
      {isActive && <TabHighlight />}
    </FlexCell>
  )
}

export default Tab;
