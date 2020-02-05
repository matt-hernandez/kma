import React from 'react';
import styled from 'styled-components/macro';
import { IonItem, IonButton } from '@ionic/react';
import LoadingBlock from './LoadingBlock';
import FlexRow from './FlexRow';
import InlineBold from './InlineBold';
import InlineColor from './InlineColor';
import { formatDueDate } from '../util/date-time';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const TitleAndStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  padding-right: 12px;
`;

const Title = styled.span`
  font-size: 14px;
`;

type StatusProps = {
  status: string;
};

const Status = styled.span<StatusProps>`
  font-size: 14px;
  color: ${({ status }) => status === 'FULFILLED'
    ? `green`
    : `red`
  };
`;

type Props = {
  title: string;
  status: string;
  due: number;
  onChangeStatus: (...args: any[]) => void;
};

const UserHistoricalTask: React.FunctionComponent<Props> = function ({ title, due, status, onChangeStatus }) {
  return (
    <IonItem button={true}>
      <Wrapper>
        <TitleAndStatus>
          <Title>{title}</Title> - <InlineBold><InlineColor grayLevel={4}>{formatDueDate(due)}</InlineColor></InlineBold>
          <Status status={status}>
            <InlineBold>
              {status}
            </InlineBold>
          </Status>
        </TitleAndStatus>
        <IonButton onClick={onChangeStatus}>Change status</IonButton>
      </Wrapper>
    </IonItem>
  );
}

export default UserHistoricalTask;

const ItemTextLoading = styled(LoadingBlock)`
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  height: 14px;
`;

export const UserHistoricalTaskLoading = () => (
  <IonItem>
    <FlexRow alignItems="center">
      <ItemTextLoading />
    </FlexRow>
  </IonItem>
);
