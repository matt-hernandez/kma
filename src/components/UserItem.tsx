import React from 'react';
import styled from 'styled-components/macro';
import { IonItem, IonLabel } from '@ionic/react';
import { ReactComponent as UserPic } from '../assets/user-pic.svg';
import LoadingBlock from './LoadingBlock';
import FlexRow from './FlexRow';

const LabelWrapper = styled.div`
  margin-left: 10px;
`;

type Props = {
  name: string;
  onClick?: (...args: any[]) => void;
};

const UserItem: React.FunctionComponent<Props> = function ({ name, onClick }) {
  return (
    <IonItem button={true} onClick={onClick}>
      <UserPic />
      <LabelWrapper>
        <IonLabel>{name}</IonLabel>
      </LabelWrapper>
    </IonItem>
  );
}

export default UserItem;

const ItemIconLoading = styled(LoadingBlock)`
  flex-basis: 24px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 14px;
  margin-right: 14px;
  margin-bottom: 14px;
`;

const ItemTextLoading = styled(LoadingBlock)`
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  height: 14px;
  margin-right: 20px;
`;

export const UserItemLoading = () => (
  <IonItem>
    <FlexRow alignItems="center">
      <ItemIconLoading />
      <ItemTextLoading />
    </FlexRow>
  </IonItem>
);
