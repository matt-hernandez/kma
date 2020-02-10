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
import Tooltip from './Tooltip';
import { ReactComponent as Question } from '../assets/question.svg';
import { formatDueDate, formatCommitAndPartnerDate, getPartnerUpDeadlineEpochFromDue } from '../util/date-time';
import { colors } from '../styles/colors';
import { Connection, PartnerUpDeadline, OutcomeType } from '../apollo-client/types/user';

type PropTypes = {
  title: string;
  due: number;
  partnerUpDeadline: PartnerUpDeadline;
  pointValue: number;
  outcomeType: OutcomeType | null;
  description?: string;
  isCommitted: boolean;
  showTooltips?: boolean;
  partnerRequestsToMe?: Connection[];
  pendingPartners?: Connection[];
  confirmedPartners?: Connection[];
  onCommit?: (...args: any) => void;
  onFindPartner?: (...args: any) => void;
  onMarkAsDone?: () => void;
  onBreak?: (...args: any) => void;
  onCancelRequest?: (connection: Connection) => void;
  onConfirmRequest?: (connection: Connection) => void;
  onDenyRequest?: (connection: Connection) => void;
  debugNow?: number;
};

const Task: React.FunctionComponent<PropTypes> = ({
  title,
  due,
  partnerUpDeadline,
  description,
  isCommitted,
  pointValue,
  outcomeType,
  showTooltips = false,
  partnerRequestsToMe = [],
  pendingPartners = [],
  confirmedPartners = [],
  onCommit = () => {},
  onFindPartner = () => {},
  onMarkAsDone = () => {},
  onBreak = () => {},
  onCancelRequest = () => {},
  onConfirmRequest = () => {},
  onDenyRequest = () => {}
}) => {
  const partnerUpDeadlineEpoch = getPartnerUpDeadlineEpochFromDue(due, partnerUpDeadline);
  const isPastPartnerUpDeadline = partnerUpDeadlineEpoch < Date.now();
  const shouldWarnPartnerUpDeadline = partnerUpDeadlineEpoch - Date.now() < (1000 * 60 * 60) && partnerUpDeadlineEpoch - Date.now() > 0;
  const isPastDue = Date.now() > due;
  const formattedDueDate = formatDueDate(due);
  const formattedCommitmentDeadline = formatCommitAndPartnerDate(due, partnerUpDeadline);
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
          {!shouldWarnPartnerUpDeadline && formattedCommitmentDeadline} {showTooltips && <Tooltip text={['The deadline to commit to this task and find partners.', 'After this deadline passes, you will not be able to commit to this task. If you have already committed, you will not be able to find or replace partners after this deadline.']}><Question /></Tooltip>}
        </IonCardSubtitle>
        <IonCardSubtitle>
          {formattedDueDate} {showTooltips && <Tooltip text={['The date and time when this task should be done. After this time, you\'ll be able to mark this task as "Done".', 'You have up to 2 days after the due date to mark a task as "Done". After that, the task will be "Broken" automatically.']}><Question /></Tooltip>}
        </IonCardSubtitle>
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
          <InlineItalic> - <CustomLink onClick={() => onCancelRequest(connection)}>Cancel request</CustomLink></InlineItalic>
        </IonCardContent>
      ))}
      {(!isPastPartnerUpDeadline && isCommitted && pendingPartners.length === 0 && confirmedPartners.length === 0 && partnerRequestsToMe.length === 0) && (
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
          <InlineItalic> - <CustomLink onClick={() => onConfirmRequest(connection)}>Confirm request</CustomLink></InlineItalic>
          <InlineItalic> or <CustomLink onClick={() => onDenyRequest(connection)}>deny request</CustomLink></InlineItalic>
        </IonCardContent>
      ))}
      {typeof description === 'string' && (
        <IonCardContent>
          {description}
        </IonCardContent>
      )}
      <IonCardContent>
        {(!isCommitted && partnerRequestsToMe.length === 0) && <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this task</IonButton>}
        {(!isCommitted && partnerRequestsToMe.length > 0) && <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this, separately</IonButton>}
        {(isCommitted && !isPastPartnerUpDeadline && pendingPartners.length + confirmedPartners.length < 2) && <IonButton expand="block" color="primary" onClick={onFindPartner}>Find a partner</IonButton>}
        {(isCommitted && isPastDue) && <IonButton expand="block" color="primary" disabled={outcomeType !== null && outcomeType === 'PENDING'} onClick={onMarkAsDone}>{outcomeType !== null && outcomeType === 'PENDING' ? 'Awaiting confirmation from gym' : 'Mark as Done'}</IonButton>}
        {(isCommitted && outcomeType === null) && <IonButton expand="block" color="danger" onClick={onBreak}>Break commitment</IonButton>}
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
      <IonCardContent />
    </IonCard>
  );
};

export default Task;
