import React from 'react';
import { IonBadge } from '@ionic/react';
import styled, { css } from 'styled-components/macro';
import FlexCell from './FlexCell';
import { colors } from '../styles/colors';

interface IsActive {
  isActive: boolean;
}

const TabContainer = styled(FlexCell)<IsActive>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: relative;
  margin-bottom: 16px;
  font-size: 16px;
  text-align: center;
`;

const TabBadgeContainer = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(calc(100% + 5px), calc(-50% + 1px));

  ion-badge {
    display: block;
  }
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
  showBadge?: boolean;
  badgeNumber?: number;
  onClick: (...args: any[]) => void;
};

const Tab: React.FunctionComponent<Props> = function({ name, isActive, onClick, showBadge, badgeNumber = 0 }) {
  return (
    <TabContainer isActive={isActive} onClick={onClick} shouldInflate={true}>
      <TabName isActive={isActive}>
        {name}
        {(showBadge && badgeNumber > 0) && (
          <TabBadgeContainer>
            <IonBadge color="medium">{badgeNumber}</IonBadge>
          </TabBadgeContainer>
        )}
      </TabName>
      {isActive && <TabHighlight />}
    </TabContainer>
  )
}

export default Tab;
