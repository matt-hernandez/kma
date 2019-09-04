import React from 'react';
import styled from 'styled-components/macro';
import { IonItem, IonLabel } from '@ionic/react';
import { ReactComponent as UserPic } from '../assets/user-pic.svg';

const LabelWrapper = styled.div`
  margin-left: 10px;
`;

type Props = {
  name: string;
};

const UserItem: React.FunctionComponent<Props> = function ({ name }) {
  return (
    <IonItem>
      <UserPic />
      <LabelWrapper>
        <IonLabel>{name}</IonLabel>
      </LabelWrapper>
    </IonItem>
  );
}

export default UserItem;
