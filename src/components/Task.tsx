import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel
  } from '@ionic/react';
import styled from 'styled-components/macro';
import InlineItalic from './InlineItalic';
import CustomLink from './CustomLink';
import InlineColor from './InlineColor';
import LoadingBlock from './LoadingBlock';
import { formatDueDate, formatCommitAndPartnerDate } from '../util/date-time';
import { colors } from '../styles/colors';
import { Connection } from '../apollo-client/types/user';

type PropTypes = {
  title: string;
  due: number;
  partnerUpDeadline: number;
  pointValue: number;
  description?: string;
  isCommitted: boolean;
  partnerRequestsToMe?: Connection[];
  pendingPartners?: Connection[];
  confirmedPartners?: Connection[];
  onCommit?: (...args: any) => void;
  onFindPartner?: (...args: any) => void;
  onMarkAsDone?: () => void;
  onBreak?: (...args: any) => void;
  onCancelRequest?: (...args: any) => void;
  onConfirmRequest?: (...args: any) => void;
  onDenyRequest?: (...args: any) => void;
  debugNow?: number;
};

const Task: React.FunctionComponent<PropTypes> = ({
  title,
  due,
  partnerUpDeadline,
  description,
  isCommitted,
  pointValue,
  partnerRequestsToMe = [],
  pendingPartners = [],
  confirmedPartners = [],
  onCommit = () => {},
  onFindPartner = () => {},
  onMarkAsDone = () => {},
  onBreak = () => {},
  onCancelRequest = () => {},
  onConfirmRequest = () => {},
  onDenyRequest = () => {},
  debugNow
}) => {
  const isPastPartnerUpDeadline = partnerUpDeadline < (debugNow || Date.now());
  const shouldWarnPartnerUpDeadline = partnerUpDeadline - (debugNow || Date.now()) < (1000 * 60 * 60) && partnerUpDeadline - (debugNow || Date.now()) > 0;
  const isPastDue = (debugNow || Date.now()) > due;
  const formattedDueDate = formatDueDate(due);
  const formattedCommitmentDeadline = formatCommitAndPartnerDate(partnerUpDeadline);
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>
          {shouldWarnPartnerUpDeadline && (
            <InlineColor color={colors.warn}>
              {formattedCommitmentDeadline}
            </InlineColor>
          )}
          {!shouldWarnPartnerUpDeadline && formattedCommitmentDeadline}
        </IonCardSubtitle>
        <IonCardSubtitle>{formattedDueDate}</IonCardSubtitle>
        <IonCardSubtitle>Points: {pointValue}</IonCardSubtitle>
      </IonCardHeader>
      {isCommitted && confirmedPartners.map(connection => (
        <IonCardContent key={`${title} ${due} ${connection.connectedUserName}`}>
          <IonChip color="success" className="partner-request">
            <IonLabel>
              <InlineItalic>{connection.connectedUserName} is a partner!</InlineItalic>
            </IonLabel>
          </IonChip>
        </IonCardContent>
      ))}
      {(!isPastPartnerUpDeadline && isCommitted) && pendingPartners.map(connection => (
        <IonCardContent key={`${title} ${due} ${connection.connectedUserName}`}>
          <IonChip color="tertiary" className="partner-request">
            <IonLabel>
              <InlineItalic>Request for {connection.connectedUserName} pending</InlineItalic>
            </IonLabel>
          </IonChip>
          <InlineItalic> - <CustomLink onClick={() => onCancelRequest(connection.cid)}>Cancel request</CustomLink></InlineItalic>
        </IonCardContent>
      ))}
      {(!isPastPartnerUpDeadline && isCommitted && pendingPartners.length === 0 && confirmedPartners.length === 0) && (
        <IonCardContent key={`${title} ${due} no-requests`}>
          <IonChip color="danger" className="partner-request">
            <IonLabel>
              <InlineItalic>No partners requested</InlineItalic>
            </IonLabel>
          </IonChip>
        </IonCardContent>
      )}
      {(!isPastPartnerUpDeadline && partnerRequestsToMe.length > 0) && partnerRequestsToMe.map(connection => (
        <IonCardContent key={`${title} ${due} ${connection.connectedUserName}`}>
          <IonChip color="primary" className="partner-request">
            <IonLabel>
              <InlineItalic>{`${connection.connectedUserName}`} requested you!</InlineItalic>
            </IonLabel>
          </IonChip>
          <InlineItalic> - <CustomLink onClick={() => onConfirmRequest(connection.cid)}>Confirm request</CustomLink></InlineItalic>
          <InlineItalic> or <CustomLink onClick={() => onDenyRequest(connection.cid)}>deny request</CustomLink></InlineItalic>
        </IonCardContent>
      ))}
      {typeof description === 'string' && (
        <IonCardContent>
          {description}
        </IonCardContent>
      )}
      <IonCardContent>
        {(!isCommitted && partnerRequestsToMe.length === 0) && <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this</IonButton>}
        {(!isCommitted && partnerRequestsToMe.length > 0) && <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this, separately</IonButton>}
        {(isCommitted && !isPastPartnerUpDeadline && pendingPartners.length + confirmedPartners.length < 2) && <IonButton expand="block" color="primary" onClick={onFindPartner}>Find a partner</IonButton>}
        {(isCommitted && confirmedPartners.length > 0 && isPastDue) && <IonButton expand="block" color="primary" onClick={onMarkAsDone}>Mark as Done</IonButton>}
        {isCommitted && <IonButton expand="block" color="danger" onClick={onBreak}>Break task</IonButton>}
      </IonCardContent>
    </IonCard>
  );
};

const TaskTitleLoading = styled(LoadingBlock)`
  width: 100%;
  height: 24px;
`;

const TaskSubtitleLoading = styled(LoadingBlock)`
  width: 100%;
  height: 18px;
`;

const TaskDescriptionLoading = styled(LoadingBlock)`
  width: 100%;
  height: 14px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TaskLoading: React.FunctionComponent = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <TaskTitleLoading />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonCardSubtitle>
          <TaskSubtitleLoading />
        </IonCardSubtitle>
        <TaskDescriptionLoading />
        <TaskDescriptionLoading />
        <TaskDescriptionLoading />
      </IonCardContent>
      <IonCardContent>

      </IonCardContent>
    </IonCard>
  );
};

export default Task;
