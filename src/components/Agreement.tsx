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
import { User } from '../util/state';

type PropTypes = {
  title: string;
  due: number;
  partnerUpDeadline: number;
  description?: string;
  isCommitted: boolean;
  partnerRequestsToMe?: User[];
  pendingPartners?: User[];
  confirmedPartners?: User[];
  onCommit?: (...args: any) => void;
  onFindPartner?: (...args: any) => void;
  onMarkAsDone?: () => void;
  onCancel?: (...args: any) => void;
  onBreak?: (...args: any) => void;
  onCancelRequest?: (...args: any) => void;
  onConfirmRequest?: (...args: any) => void;
  onDenyRequest?: (...args: any) => void;
  debugNow?: number;
};

const Agreement: React.FunctionComponent<PropTypes> = ({
  title,
  due,
  partnerUpDeadline,
  description,
  isCommitted,
  partnerRequestsToMe = [],
  pendingPartners = [],
  confirmedPartners = [],
  onCommit = () => {},
  onFindPartner = () => {},
  onMarkAsDone = () => {},
  onBreak = () => {},
  onCancel = () => {},
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
        {isCommitted && confirmedPartners.map(partner => (
          <IonCardContent key={`${title} ${due} ${partner.name}`}>
            <IonChip color="success" className="partner-request">
              <IonLabel>
                <InlineItalic>{partner.name} is a partner!</InlineItalic>
              </IonLabel>
            </IonChip>
          </IonCardContent>
        ))}
        {(!isPastPartnerUpDeadline && isCommitted) && pendingPartners.map(partner => (
          <IonCardContent key={`${title} ${due} ${partner.name}`}>
            <IonChip color="tertiary" className="partner-request">
              <IonLabel>
                <InlineItalic>Request for {partner.name} pending</InlineItalic>
              </IonLabel>
            </IonChip>
            <InlineItalic> - <CustomLink onClick={() => onCancelRequest(partner.id)}>Cancel request</CustomLink></InlineItalic>
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
        {(!isPastPartnerUpDeadline && partnerRequestsToMe.length > 0) && partnerRequestsToMe.map(partner => (
          <IonCardContent key={`${title} ${due} ${partner.name}`}>
            <IonChip color="primary" className="partner-request">
              <IonLabel>
                <InlineItalic>{`${partner.name}`} requested you!</InlineItalic>
              </IonLabel>
            </IonChip>
            <InlineItalic> - <CustomLink onClick={() => onConfirmRequest(partner.id)}>Confirm request</CustomLink></InlineItalic>
            <InlineItalic> or <CustomLink onClick={() => onDenyRequest(partner.id)}>deny request</CustomLink></InlineItalic>
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
          {(isCommitted && confirmedPartners.length === 0) && <IonButton expand="block" color="medium" fill="outline" onClick={onCancel}>Cancel agreement</IonButton>}
          {(isCommitted && confirmedPartners.length > 0) && <IonButton expand="block" color="danger" onClick={onBreak}>Break agreement</IonButton>}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Agreement;
