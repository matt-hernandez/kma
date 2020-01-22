import React from 'react';
import { IonButton } from '@ionic/react';
import ModalContainer, { ModalProps } from '../ModalContainer';
import H1 from '../H1';
import RegularCopy from '../RegularCopy';
import InlineBold from '../InlineBold';
import Spacer from '../Spacer';
import MarginWrapper from '../MarginWrapper';

export const ConfirmMakeUserActiveModal: React.FunctionComponent<ModalProps> = ({
    onConfirm,
    onDismiss,
    isOpen
  }) => {
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      <H1 grayLevel={8}>What will this do?</H1>
      <RegularCopy grayLevel={7}>
        Making a user "inactive" restores their access to the "Main app". If they were an "Admin",
        it also restores their access to the "Admin app".
      </RegularCopy>
      <RegularCopy grayLevel={7}><InlineBold>Are you sure you want to make this user active?</InlineBold></RegularCopy>
      <Spacer height="20px" />
      <MarginWrapper marginTop marginBottom>
        <IonButton expand="block" color="primary" onClick={onConfirm}>Yes</IonButton>
      </MarginWrapper>
      <IonButton expand="block" color="medium" fill="outline" onClick={onDismiss}>Cancel</IonButton>
    </ModalContainer>
  );
};
