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
import styled, { css } from 'styled-components/macro';
import InlineItalic from '../components/InlineItalic';
import CustomLink from '../components/CustomLink';
import Timer from '../components/Timer';
import { colors } from '../styles/colors';

type TimerContainerProps = {
  shouldWarn: boolean;
};

const TimerContainer = styled.div<TimerContainerProps>`
  position: absolute;
  top: 12px;
  right: 20px;
  font-size: 14px;
  ${({shouldWarn}) => shouldWarn
    ? css`color: ${colors.warn};`
    : css`color: ${colors.gray6};`
  }
`;

type PropTypes = {
  title: string;
  due: string;
  description?: string;
  expiration: number;
  isCommitted: boolean;
  pendingPartners?: string[];
  confirmedPartners?: string[];
  onCommit?: (...args: any) => void;
  onExpire: (...args: any) => void;
  onFindPartner?: (...args: any) => void;
  onBreak?: (...args: any) => void;
  onCancelRequest?: (...args: any) => void;
};

const Agreement: React.FunctionComponent<PropTypes> = ({
  title,
  due,
  description,
  expiration,
  isCommitted,
  pendingPartners = [],
  confirmedPartners = [],
  onCommit,
  onExpire,
  onBreak = () => {},
  onFindPartner = () => {},
  onCancelRequest = () => {}
}) => {
  const isPastExpiration = expiration < Date.now();
  const shouldWarnExpiration = expiration - Date.now() < (1000 * 60 * 60);
  return (
    <>
      <IonCard>
        {!isPastExpiration && (
          <TimerContainer shouldWarn={shouldWarnExpiration}>
            {isCommitted
              ? 'Time left to cancel:'
              : 'Expires in'
            } <Timer deadline={expiration} onZero={onExpire} />
          </TimerContainer>
        )}
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>{due}</IonCardSubtitle>
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
        { !isPastExpiration && pendingPartners.map(request => (
          <IonCardContent key={`${title} ${due} ${request}`}>
            <IonChip color="tertiary" className="partner-request">
              <IonLabel>
                <InlineItalic>Request for {request} pending</InlineItalic>
              </IonLabel>
            </IonChip>
            <InlineItalic> - <CustomLink onClick={() => onCancelRequest(request)}>Cancel request</CustomLink></InlineItalic>
          </IonCardContent>
        )) }
        { (!isPastExpiration && isCommitted && pendingPartners.length === 0) && (
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
          {(isCommitted && pendingPartners.length + confirmedPartners.length < 2) && <IonButton expand="block" color="primary" onClick={onFindPartner}>Find a partner</IonButton>}
          {(isCommitted && confirmedPartners.length > 0) && <IonButton expand="block" color="danger" onClick={onBreak}>Break agreement</IonButton>}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Agreement;
