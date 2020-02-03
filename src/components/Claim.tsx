import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { ReactComponent as UserPic } from '../assets/user-pic.svg';
import LoadingBlock from './LoadingBlock';
import RegularCopy from './RegularCopy';
import FlexRow from './FlexRow';
import InlineBold from './InlineBold';
import SmallCopy from './SmallCopy';
import { formatDueDate } from '../util/date-time';
import FlexCell from './FlexCell';
import MarginWrapper from './MarginWrapper';
import { colors } from '../styles/colors';

const ClaimWrapper = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.gray2};
`;

const UserAndTaskDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;

  > svg {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
  }
`;

const TaskDetails = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  margin-left: 10px;
`;

type Props = {
  name: string;
  taskTitle: string;
  taskDue: number;
  onConfirm: () => void;
  onDeny: () => void;
};

const Claim: React.FunctionComponent<Props> = function ({ name, taskTitle, taskDue, onConfirm, onDeny }) {
  return (
    <ClaimWrapper>
      <UserAndTaskDetailsWrapper>
        <UserPic />
        <TaskDetails>
          <RegularCopy>{name} claims they did</RegularCopy>
          <RegularCopy><InlineBold>{taskTitle}</InlineBold></RegularCopy>
          <SmallCopy>{formatDueDate(taskDue)}</SmallCopy>
        </TaskDetails>
      </UserAndTaskDetailsWrapper>
      <MarginWrapper marginLeft marginRight>
        <FlexRow>
          <FlexCell shouldInflate>
            <IonButton expand="block" color="danger" onClick={onDeny}>Deny</IonButton>
          </FlexCell>
          <FlexCell shouldInflate>
            <IonButton expand="block" color="primary" onClick={onConfirm}>Confirm</IonButton>
          </FlexCell>
        </FlexRow>
      </MarginWrapper>
    </ClaimWrapper>
  );
}

export default Claim;

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
  <UserAndTaskDetailsWrapper>
    <FlexRow alignItems="center">
      <ItemIconLoading />
      <ItemTextLoading />
    </FlexRow>
  </UserAndTaskDetailsWrapper>
);
