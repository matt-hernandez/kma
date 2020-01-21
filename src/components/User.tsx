import React from 'react';
import styled from 'styled-components/macro';
import { IonItem, IonLabel, IonButton } from '@ionic/react';
import { ReactComponent as UserPic } from '../assets/user-pic.svg';
import LoadingBlock from './LoadingBlock';
import FlexRow from './FlexRow';

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-left: 10px;
`;

type Props = {
  name: string;
  onClick?: (...args: any[]) => void;
};

const User: React.FunctionComponent<Props> = function ({ name, onClick }) {
  return (
    <IonItem button={true} onClick={onClick}>
      <UserPic />
      <LabelWrapper>
        <IonLabel>{name}</IonLabel>
        <IonButton color="primary" onClick={onClick}>Details</IonButton>
      </LabelWrapper>
    </IonItem>
  );
}

export default User;

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
  height: 24px;
  margin-right: 20px;
`;

export const UserLoading = () => (
  <IonItem>
    <FlexRow alignItems="center">
      <ItemIconLoading />
      <ItemTextLoading />
    </FlexRow>
  </IonItem>
);
