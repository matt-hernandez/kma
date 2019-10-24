import React, { useState } from 'react';
import FlexRow from '../components/FlexRow';
import { IonLabel, IonCheckbox, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import H1 from '../components/H1';
import LargeCopy from '../components/LargeCopy';
import RegularCopy from '../components/RegularCopy';
import InlineColor from '../components/InlineColor';
import InlineBold from '../components/InlineBold';
import Spacer from '../components/Spacer';
import MarginWrapper from '../components/MarginWrapper';
import { Task } from '../apollo-client/types/user';
import { formatDueDate } from '../util/date-time';
import { colors } from '../styles/colors';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';
import { AcceptAnyReturnVoid } from '../util/interface-overrides';
import cookies from '../util/cookies';

interface ModalProps {
  hideModal: () => {};
  onConfirm?: AcceptAnyReturnVoid;
  onDismiss?: AcceptAnyReturnVoid;
  manualDismiss?: boolean;
}

export const TaskCommitConfirmationModal: React.FunctionComponent<{content: Task} & ModalProps> = ({
    content: {
      title,
      due,
      description,
    },
    hideModal,
    onConfirm = () => {},
    onDismiss = () => {},
    manualDismiss = false
  }) => {
    const [ skipConfirm, toggleSkipConfirm ] = useStateHelper(false, listenerTypes.TOGGLE);
  return (
    <>
      <H1 grayLevel={8}>Ready to commit to this?</H1>
      <Spacer height="6px" />
      <LargeCopy grayLevel={8} marginTop>{title}</LargeCopy>
      <RegularCopy grayLevel={7}><InlineBold>{formatDueDate(due)}</InlineBold></RegularCopy>
      {typeof description === 'string' && (
        <RegularCopy grayLevel={7}>
          {description}
        </RegularCopy>
      )}
      <Spacer height="20px" />
      <FlexRow>
        <IonCheckbox checked={skipConfirm} onChange={toggleSkipConfirm} />
        <IonLabel onClick={toggleSkipConfirm}>
          <InlineColor color={colors.gray8}>
            Don't ask again to confirm for this type of task
          </InlineColor>
        </IonLabel>
      </FlexRow>
      <Spacer height="6px" />
      <MarginWrapper marginTop marginBottom>
        <IonButton expand="block" color="primary" onClick={() => {
          onConfirm({ skipConfirm });
          if (!manualDismiss) {
            hideModal();
          }
        }}>Yes, commit!</IonButton>
      </MarginWrapper>
      <IonButton expand="block" color="medium" fill="outline" onClick={() => {
        onDismiss();
        hideModal();
      }}>Nevermind</IonButton>
    </>
  )
};

export const DevToolsModal: React.FunctionComponent<ModalProps> = () => {
  const [ userToBe, setUserToBe ] = useState('');
  return (
    <>
      <IonSelect placeholder="Change user" interface="popover" onIonChange={(e) => setUserToBe((e as any).target.value)}>
        <IonSelectOption value="Matt Hernandez">Matt Hernandez</IonSelectOption>
        <IonSelectOption value="Katie Goolsbee">Katie Goolsbee</IonSelectOption>
        <IonSelectOption value="Erin Armstrong">Erin Armstrong</IonSelectOption>
        <IonSelectOption value="Dave Goode">Dave Goode</IonSelectOption>
        <IonSelectOption value="Norbi Zylberberg">Norbi Zylberberg</IonSelectOption>
      </IonSelect>
      <IonButton expand="block" color="primary" onClick={() => {
        const cookieName = 'lkma__at';
        if (userToBe === 'Matt Hernandez') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0dCBIZXJuYW5kZXoiLCJlbWFpbCI6Im1hdHQuaXNhaWFoLmhlcm5hbmRlekBnbWFpbC5jb20ifQ.WdTMhn-FWocBOLZAOfygTYPPP1Sb0PO0MKkNKVIRMRk'
          );
        } else if (userToBe === 'Katie Goolsbee') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2F0aWUgR29vbHNiZWUiLCJlbWFpbCI6ImthdGllLmdvb2xzYmVlQGxpb25za3Jhdm1hZ2EuY29tIn0.u-4d8nKYTv9xn5O06TnoN2kw0w7JRRuvXqkl534FFmY'
          );
        } else if (userToBe === 'Erin Armstrong') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpbiBBcm1zdHJvbmciLCJlbWFpbCI6ImVyaW4uYXJtc3Ryb25nQGxpb25za3Jhdm1hZ2EuY29tIn0.rBMCrfXTXWJ1xOq-w_N_Mv_hIAj0B9E8RRdplJX40lY'
          );
        } else if (userToBe === 'Dave Goode') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGF2ZSBHb29kZSIsImVtYWlsIjoiZGF2ZS5nb29kZUBsaW9uc2tyYXZtYWdhLmNvbSJ9.VJN1iuhHIcATopd-3MUEnKFPB2mBHu9GKCcPOcOQQAs'
          );
        } else if (userToBe === 'Norbi Zylberberg') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9yYmkgWnlsYmVyYmVyZyIsImVtYWlsIjoibm9yYmkuenlsYmVyYmVyZ0BsaW9uc2tyYXZtYWdhLmNvbSJ9.1zcBpQ2MFFM-KTvHgS6Oj-fYP4F6I7UniFMfbDg8VAg'
          );
        }
        document.location.href = document.location.origin;
      }}>Change user</IonButton>
    </>
  );
};

export const GenericModal: React.FunctionComponent<any> = ({ modalContent }) => {
  return (
    <>
      {modalContent}
    </>
  );
};
