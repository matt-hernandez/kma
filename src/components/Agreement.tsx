import React, { useRef } from 'react';
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
import { useStateHelper, listenerTypes } from '../util/use-state-helper';
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
  description: string;
  expiration: number;
  isCommitted: boolean;
  pendingRequests?: string[];
  acceptedRequests?: string[];
  onCommit: (...args: any) => void;
  onCancelRequest?: (...args: any) => void;
};

const Agreement: React.FunctionComponent<PropTypes> = ({
  title,
  due,
  description,
  expiration,
  isCommitted,
  pendingRequests = [],
  acceptedRequests = [],
  onCommit,
  onCancelRequest = () => {}
}) => {
  const [ isDescriptionOpen, toggleDescription ] = useStateHelper(false, listenerTypes.TOGGLE);
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
            } <Timer deadline={expiration} onZero={() => {}} />
          </TimerContainer>
        )}
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>{due}</IonCardSubtitle>
        </IonCardHeader>
        { acceptedRequests.map(request => (
          <IonCardContent key={`${title} ${due} ${request}`}>
            <IonChip color="success" className="partner-request">
              <IonLabel>
                <InlineItalic>{request} is a partner!</InlineItalic>
              </IonLabel>
            </IonChip>
          </IonCardContent>
        )) }
        { !isPastExpiration && pendingRequests.map(request => (
          <IonCardContent key={`${title} ${due} ${request}`}>
            <IonChip color="tertiary" className="partner-request">
              <IonLabel>
                <InlineItalic>Request for {request} pending</InlineItalic>
              </IonLabel>
            </IonChip>
            <InlineItalic> - <CustomLink onClick={() => onCancelRequest(request)}>Cancel request</CustomLink></InlineItalic>
          </IonCardContent>
        )) }
        { (!isPastExpiration && isCommitted && pendingRequests.length === 0) && (
          <IonCardContent key={`${title} ${due} no-requests`}>
            <IonChip color="danger" className="partner-request">
              <IonLabel>
                <InlineItalic>No partners requested</InlineItalic>
              </IonLabel>
            </IonChip>
          </IonCardContent>
        )}
        <IonCardContent>
          {description}
        </IonCardContent>
        <IonCardContent>
          {!isCommitted && <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this agreement</IonButton>}
          {(isCommitted && pendingRequests.length + acceptedRequests.length < 2) && <IonButton expand="block" color="primary" onClick={onCommit}>Find a partner</IonButton>}
          {(isCommitted && !isPastExpiration) && <IonButton expand="block" color="medium" fill="outline" onClick={onCommit}>Cancel agreement</IonButton>}
          {(isCommitted && acceptedRequests.length > 0 && isPastExpiration) && <IonButton expand="block" color="danger" onClick={onCommit}>Break agreement</IonButton>}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Agreement;
