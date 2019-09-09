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
import InlineItalic from '../components/InlineItalic';
import CustomLink from '../components/CustomLink';
import InlineColor from '../components/InlineColor';
import { formatDueDate, formatCommitAndPartnerDate } from '../util/format-due-date';
import { colors } from '../styles/colors';

type PropTypes = {
  title: string;
  due: number;
  partnerUpDeadline: number;
  description?: string;
  isCommitted: boolean;
  pendingPartners?: string[];
  confirmedPartners?: string[];
  onCommit?: (...args: any) => void;
  onFindPartner?: (...args: any) => void;
  onMarkAsDone?: () => void;
  onCancel?: (...args: any) => void;
  onBreak?: (...args: any) => void;
  onCancelRequest?: (...args: any) => void;
  debugNow?: number;
};

const Agreement: React.FunctionComponent<PropTypes> = ({
  title,
  due,
  partnerUpDeadline,
  description,
  isCommitted,
  pendingPartners = [],
  confirmedPartners = [],
  onCommit = () => {},
  onFindPartner = () => {},
  onMarkAsDone = () => {},
  onBreak = () => {},
  onCancel = () => {},
  onCancelRequest = () => {},
  debugNow
}) => {
  const isPastPartnerUpDeadline = partnerUpDeadline < (debugNow || Date.now());
  const shouldWarnPartnerUpDeadline = partnerUpDeadline - (debugNow || Date.now()) < (1000 * 60 * 60) && partnerUpDeadline - (debugNow || Date.now()) > 0;
  const isPastDue = (debugNow || Date.now()) > due;
  const formattedDueDate = formatDueDate(due);
  const formattedCommitmentDeadline = formatCommitAndPartnerDate(partnerUpDeadline);
  return (
    <>
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
        </IonCardHeader>
        { confirmedPartners.map(request => (
          <IonCardContent key={`${title} ${due} ${request}`}>
            <IonChip color="success" className="partner-request">
              <IonLabel>
                <InlineItalic>{request} is a partner!</InlineItalic>
              </IonLabel>
            </IonChip>
          </IonCardContent>
        )) }
        { !isPastPartnerUpDeadline && pendingPartners.map(request => (
          <IonCardContent key={`${title} ${due} ${request}`}>
            <IonChip color="tertiary" className="partner-request">
              <IonLabel>
                <InlineItalic>Request for {request} pending</InlineItalic>
              </IonLabel>
            </IonChip>
            <InlineItalic> - <CustomLink onClick={() => onCancelRequest(request)}>Cancel request</CustomLink></InlineItalic>
          </IonCardContent>
        )) }
        { (!isPastPartnerUpDeadline && isCommitted && pendingPartners.length === 0 && confirmedPartners.length === 0) && (
          <IonCardContent key={`${title} ${due} no-requests`}>
            <IonChip color="danger" className="partner-request">
              <IonLabel>
                <InlineItalic>No partners requested</InlineItalic>
              </IonLabel>
            </IonChip>
          </IonCardContent>
        )}
        {typeof description === 'string' && (
          <IonCardContent>
            {description}
          </IonCardContent>
        )}
        <IonCardContent>
          {!isCommitted && <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this agreement</IonButton>}
          {(isCommitted && !isPastPartnerUpDeadline && pendingPartners.length + confirmedPartners.length < 2) && <IonButton expand="block" color="primary" onClick={onFindPartner}>Find a partner</IonButton>}
          {(isCommitted && confirmedPartners.length > 0 && isPastDue) && <IonButton expand="block" color="primary" onClick={onMarkAsDone}>Mark as Done</IonButton>}
          {(isCommitted && confirmedPartners.length === 0) && <IonButton expand="block" color="medium" fill="outline" onClick={onCancel}>Cancel this agreement</IonButton>}
          {(isCommitted && confirmedPartners.length > 0) && <IonButton expand="block" color="danger" onClick={onBreak}>Break this agreement</IonButton>}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Agreement;
