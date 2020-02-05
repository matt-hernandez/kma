import React from 'react';
import styled from 'styled-components/macro';
import { IonItem, IonButton } from '@ionic/react';
import LoadingBlock from './LoadingBlock';
import FlexRow from './FlexRow';
import InlineBold from './InlineBold';
import InlineColor from './InlineColor';
import { formatDueDate } from '../util/date-time';
import Spacer from './Spacer';
import SmallCopy from './SmallCopy';

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
  font-size: 16px;
`;

type StatusProps = {
  status: string;
};

const Status = styled.span<StatusProps>`
  padding-left: 12px;
  font-size: 14px;
  color: ${({ status }) => status === 'FULFILLED'
    ? `green`
    : `black`
  };
`;

type Props = {
  title: string;
  status: string;
  due: number;
  shouldShowChangeStatus?: boolean;
  onChangeStatus?: (...args: any[]) => void;
};

const UserHistoricalTask: React.FunctionComponent<Props> = function ({ title, due, status, shouldShowChangeStatus = false, onChangeStatus }) {
  return (
    <IonItem button={true}>
      <Wrapper>
        <TitleAndStatus>
          <div>
            <Title>{title}</Title>
            <Spacer height="4px"/>
            <div>
              <SmallCopy>
                <InlineBold><InlineColor grayLevel={8}>{formatDueDate(due)}</InlineColor></InlineBold>
              </SmallCopy>
            </div>
          </div>
          <Status status={status}>
            <InlineBold>
              {status.indexOf('BROKEN') > -1 ? 'Better luck next time' : status}
            </InlineBold>
          </Status>
        </TitleAndStatus>
        {shouldShowChangeStatus && <IonButton onClick={onChangeStatus}>Change status</IonButton>}
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
