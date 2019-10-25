import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
  } from '@ionic/react';
import styled from 'styled-components/macro';
import { formatDueDate, formatCommitAndPartnerDate } from '../util/date-time';
import { ConnectionForAdmin, Outcome, TaskForAdmin } from '../apollo-client/types/admin';
import { User, ConnectionType } from '../apollo-client/types/user';
import { ReactComponent as UserPic } from '../assets/user-pic.svg';
import { colors } from '../styles/colors';

const ConnectionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
`;

type ConnectionPersonProps = {
  type?: ConnectionType | 'PENDING' | '';
};

const ConnectionPerson = styled.div<ConnectionPersonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  width: 85px;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }

  background-color: ${({type}) => type === 'BROKE_WITH'
    ? colors.danger
    : type === 'CONFIRMED'
    ? colors.success
    : type === 'REQUEST_TO'
    ? colors.active
    : type === 'REQUEST_FROM'
    ? colors.tertiary
    : type === 'PENDING'
    ? colors.warn
    : 'transparent'};
`;

const ConnectionPersonName = styled.div`
  padding-top: 12px;
  font-weight: bold;
  text-align: center;
`;

type ConnectionsProps = {
  user: User;
  connections: ConnectionForAdmin[];
  outcomes: Outcome[];
};

const Connections: React.FunctionComponent<ConnectionsProps> = ({ user, connections = [], outcomes = [] }) => {
  const ownUserOutcome = outcomes.find(({ userCid }) => userCid === user.cid);
  const ownUserBrokeTask = ownUserOutcome && ownUserOutcome.type === 'BROKEN';
  return (
    <ConnectionContainer>
      <ConnectionPerson type={ownUserBrokeTask ? 'BROKE_WITH' : ''}>
        <UserPic />
        <ConnectionPersonName>
          {user.name}
        </ConnectionPersonName>
      </ConnectionPerson>
      {connections.map(({ fromName, fromCid, toCid, toName, type }) => {
        const direction: 'INCOMING' | 'OUTGOING' = user.cid === toCid ? 'INCOMING' : 'OUTGOING';
        const cid = direction === 'OUTGOING' ? fromCid : toCid;
        const outcome = outcomes.find(({ userCid }) => userCid === cid);
        let connectionType: ConnectionType | '' = '';
        if ((outcome && outcome.type === 'BROKEN')) {
          connectionType = 'BROKE_WITH';
        } else if ((direction === 'OUTGOING' && type === 'BROKE_WITH') || type === 'CONFIRMED' || (outcome && outcome.type === 'FULFILLED')) {
          connectionType = 'CONFIRMED';
        } else if (direction === 'INCOMING') {
          connectionType = 'REQUEST_FROM';
        } else if (direction === 'OUTGOING') {
          connectionType = 'REQUEST_TO';
        }
        return (
          <ConnectionPerson type={connectionType}>
            <UserPic />
            <ConnectionPersonName>
              {user.cid === toCid ? fromName : toName}
            </ConnectionPersonName>
          </ConnectionPerson>
        )
      })}
    </ConnectionContainer>
  );
};

const Task: React.FunctionComponent<TaskForAdmin> = ({
  cid,
  templateCid,
  title,
  publishDate,
  due,
  partnerUpDeadline,
  description,
  committedUsers,
  connections,
  outcomes
}) => {
  const formattedDueDate = formatDueDate(due);
  const formattedCommitmentDeadline = formatCommitAndPartnerDate(partnerUpDeadline);
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            {formattedCommitmentDeadline}
          </IonCardSubtitle>
          <IonCardSubtitle>{formattedDueDate}</IonCardSubtitle>
        </IonCardHeader>
        {committedUsers.map(user => {
          const userConnections = connections.filter(({ fromCid, toCid }) => fromCid === user.cid || toCid === user.cid);
          return (
            <IonCardContent key={`${title} ${due} ${user.cid}`}>
              <Connections user={user} connections={userConnections} outcomes={outcomes} />
            </IonCardContent>
          );
        })}
        {typeof description === 'string' && (
          <IonCardContent>
            {description}
          </IonCardContent>
        )}
        <IonCardContent>
          <IonButton expand="block" color="primary" onClick={() => {}}>Edit task</IonButton>
          <IonButton expand="block" color="danger" onClick={() => {}}>Delete task</IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Task;
